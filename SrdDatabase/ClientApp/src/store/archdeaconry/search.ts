import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../apiHelpers';
import { Archdeaconry } from '.';

export interface State {
    archdeaconries: Archdeaconry[];
    archdeaconriesLoading: boolean;
}

const initialState: State = {
    archdeaconries: [],
    archdeaconriesLoading: true
};

export const REQUEST_ARCHDEACONRIES = 'REQUEST_ARCHDEACONRIES';
export const RECEIVE_ARCHDEACONRIES = 'RECEIVE_ARCHDEACONRIES';

export const requestArchdeaconriesAction = (showLoading: boolean = true) => ({
    type: REQUEST_ARCHDEACONRIES,
    value: showLoading,
});

export const receiveArchdeaconriesAction = (archdeaconries: Archdeaconry[]) => ({
    type: RECEIVE_ARCHDEACONRIES,
    value: archdeaconries,
});

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_ARCHDEACONRIES:
            return {
                ...state,
                archdeaconriesLoading: action.value,
            };
        case RECEIVE_ARCHDEACONRIES:
            return {
                ...state,
                archdeaconries: action.value,
                archdeaconriesLoading: false,
            };
        default:
            return state;
    }
};

export const loadArchdeaconries = (showLoading: boolean = true): AppThunkAction<Action> => (dispatch) => {
    get<Archdeaconry[]>('api/archdeaconry/all')
        .then(archdeaconries => {
            dispatch(receiveArchdeaconriesAction(archdeaconries));
        });

    dispatch(requestArchdeaconriesAction(showLoading));
};

const deleteArchdeaconry = (id: number): AppThunkAction<Action> => (dispatch) => {
    post<{ id: number }>('api/archdeaconry/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(loadArchdeaconries(false));
            } else {
                throw response.text();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorMessage: string) => {
                alert(errorMessage);
            });
        });
};

export const actionCreators = {
    loadArchdeaconries,
    deleteArchdeaconry,
};
