import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../apiHelpers';
import { Archdeaconry } from './archdeaconry';

export interface State {
    isLoading: boolean;
    archdeaconries: Archdeaconry[];
}

const initialState: State = { archdeaconries: [], isLoading: true };

export const REQUEST_ARCHDEACONRIES = 'REQUEST_ARCHDEACONRIES';
export const RECEIVE_ARCHDEACONRIES = 'RECEIVE_ARCHDEACONRIES';

export const requestArchdeaconriesAction = () => ({
    type: REQUEST_ARCHDEACONRIES,
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
                isLoading: action.value,
            };
        case RECEIVE_ARCHDEACONRIES:
            return {
                ...state,
                archdeaconries: action.value,
                isLoading: false,
            };
        default:
            return state;
    }
};

const loadArchdeaconries = (): AppThunkAction<Action> => (dispatch) => {
    get<Archdeaconry[]>('api/archdeaconry/all')
        .then(archdeaconries => {
            dispatch(receiveArchdeaconriesAction(archdeaconries));
        });

    dispatch(requestArchdeaconriesAction());
};

const deleteArchdeaconry = (id: number): AppThunkAction<Action> => (dispatch) => {
    post<{ id: number }>('api/archdeaconry/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(loadArchdeaconries());
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
