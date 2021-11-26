import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { Archdeaconry } from '.';
import { History } from 'history';
import { Parish } from '../parish';

export interface ArchdeaconryDetails {
    archdeaconry: Archdeaconry;
    parishes: Parish[];
}

const REQUEST_DETAILS = 'ARCHDEACONRY.REQUEST_ARCHDEACONRY_DETAILS';
const RECEIVE_DETAILS = 'ARCHDEACONRY.RECEIVE_ARCHDEACONRY_DETAILS';
const SET_IS_LOADING = 'ARCHDEACONRY.SET_IS_LOADING';

const requestArchdeaconryDetailsAction = () => ({
    type: REQUEST_ARCHDEACONRY_DETAILS,
});

const receiveArchdeaconryDetailsAction = (archdeaconryDetails: ArchdeaconryDetails) => ({
    type: RECEIVE_ARCHDEACONRY_DETAILS,
    value: archdeaconryDetails,
});

export interface State {
    detailsLoading: boolean;
    details: Archdeaconry;
}

const initialState: State = {
    detailsLoading: true,
    details: {},
};

const loadArchdeaconry = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestArchdeaconryAction());

    get<Archdeaconry>(`api/archdeaconry/${id}`)
        .then(archdeaconry => {
            dispatch(receiveArchdeaconryAction(archdeaconry));
        });
}

const deleteArchdeaconry = (id: number, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    post<{ id: number }>('api/archdeaconry/delete', { id })
        .then(response => {
            if (response.ok) {
                history.push('/archdeaconry');
            } else {
                throw response.text();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorMessage: string) => {
                alert(errorMessage);
            });
        }).finally(() => {
            dispatch(setIsSavingAction(false));
        });
};

export const actionCreators = {
    resetArchdeaconry,
    loadArchdeaconry,
    setName,
    saveArchdeaconry,
    deleteArchdeaconry,
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_ARCHDEACONRY_DETAILS:
            return {
                ...state,
                archdeaconryLoading: true,
            };
        case RECEIVE_ARCHDEACONRY_DETAILS:
            return {
                ...state,
                archdeaconryLoading: false,
                archdeaconry: action.value,
                hasBeenChanged: false,
                errors: {},
            };
        case SET_IS_LOADING:
            return {
                ...state,
                archdeaconryLoading: action.value,
            };
        default:
            return state;
    }
};
