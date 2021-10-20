import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../apiHelpers';
import { Parish } from '.';

export interface State {
    isLoading: boolean;
    parishes: Parish[];
}

const initialState: State = { parishes: [], isLoading: true };

export const REQUEST_PARISHES = 'REQUEST_PARISHES';
export const RECEIVE_PARISHES = 'RECEIVE_PARISHES';

export const requestParishesAction = () => ({
    type: REQUEST_PARISHES,
});

export const receiveParishesAction = (parishes: Parish[]) => ({
    type: RECEIVE_PARISHES,
    value: parishes,
});

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_PARISHES:
            return {
                ...state,
                isLoading: action.value,
            };
        case RECEIVE_PARISHES:
            return {
                ...state,
                parishes: action.value,
                isLoading: false,
            };
        default:
            return state;
    }
};

const loadParishes = (): AppThunkAction<Action> => (dispatch) => {
    get<Parish[]>('api/parish/all')
        .then(parishes => {
            dispatch(receiveParishesAction(parishes));
        });

    dispatch(requestParishesAction());
};

const deleteParish = (id: number): AppThunkAction<Action> => (dispatch) => {
    post<{ id: number }>('api/parish/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(loadParishes());
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
    loadParishes,
    deleteParish,
};
