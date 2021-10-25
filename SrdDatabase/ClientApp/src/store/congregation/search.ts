import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../apiHelpers';
import { Congregation } from '.';

export interface State {
    isLoading: boolean;
    congregations: Congregation[];
}

const initialState: State = { congregations: [], isLoading: true };

export const REQUEST_CONGREGATIONS = 'REQUEST_CONGREGATIONS';
export const RECEIVE_CONGREGATIONS = 'RECEIVE_CONGREGATIONS';

export const requestCongregationsAction = (showLoading: boolean = true) => ({
    type: REQUEST_CONGREGATIONS,
    value: showLoading,
});

export const receiveCongregationsAction = (congregations: Congregation[]) => ({
    type: RECEIVE_CONGREGATIONS,
    value: congregations,
});

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_CONGREGATIONS:
            return {
                ...state,
                isLoading: action.value,
            };
        case RECEIVE_CONGREGATIONS:
            return {
                ...state,
                congregations: action.value,
                isLoading: false,
            };
        default:
            return state;
    }
};

export const loadCongregations = (showLoading: boolean = true): AppThunkAction<Action> => (dispatch) => {
    get<Congregation[]>('api/congregation/all')
        .then(congregations => {
            dispatch(receiveCongregationsAction(congregations));
        });

    dispatch(requestCongregationsAction(showLoading));
};

const deleteCongregation = (id: number): AppThunkAction<Action> => (dispatch) => {
    post<{ id: number }>('api/congregation/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(loadCongregations(false));
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
    loadCongregations,
    deleteCongregation,
};
