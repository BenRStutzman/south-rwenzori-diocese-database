import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { Archdeaconry } from '.';
import { History } from 'history';
import { Parish } from '../parish';
import { Congregation } from '../congregation';

export interface ArchdeaconryDetails {
    archdeaconry?: Archdeaconry;
    parishes?: Parish[];
    congregations?: Congregation[];
    events?: Event[];
}

const REQUEST_DETAILS = 'ARCHDEACONRY.REQUEST_ARCHDEACONRY_DETAILS';
const RECEIVE_DETAILS = 'ARCHDEACONRY.RECEIVE_ARCHDEACONRY_DETAILS';
const SET_DETAILS_LOADING = 'ARCHDEACONRY.SET_DETAILS_LOADING';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: ArchdeaconryDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

const setDetailsLoadingAction = (isLoading: boolean) => ({
    type: SET_DETAILS_LOADING,
    value: isLoading,
});

export interface State {
    detailsLoading: boolean;
    details: ArchdeaconryDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {},
};

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<ArchdeaconryDetails>(`api/archdeaconry/details/${id}`)
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
}

const deleteArchdeaconry = (id: number, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDetailsLoadingAction(true));

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
            dispatch(setDetailsLoadingAction(false));
        });
};

export const actionCreators = {
    loadDetails,
    deleteArchdeaconry,
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_DETAILS:
            return {
                ...state,
                detailsLoading: true,
            };
        case RECEIVE_DETAILS:
            return {
                ...state,
                detailsLoading: false,
                details: action.value,
            };
        case SET_DETAILS_LOADING:
            return {
                ...state,
                detailsLoading: action.value,
            };
        default:
            return state;
    }
};
