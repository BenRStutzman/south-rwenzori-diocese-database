import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../apiHelpers';
import { Congregation } from '.';

const REQUEST_CONGREGATIONS = 'CONGREGATION.REQUEST_CONGREGATIONS';
const RECEIVE_CONGREGATIONS = 'CONGREGATION.RECEIVE_CONGREGATIONS';
const SET_DELETING_ID = 'CONGREGATION.SET_DELETING_ID';

const requestCongregationsAction = (showLoading: boolean = true) => ({
    type: REQUEST_CONGREGATIONS,
    value: showLoading,
});

const receiveCongregationsAction = (congregations: Congregation[]) => ({
    type: RECEIVE_CONGREGATIONS,
    value: congregations,
});

const setDeletingIdAction = (congregationId?: number) => ({
    type: SET_DELETING_ID,
    value: congregationId,
});

const loadCongregations = (showLoading: boolean = true): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestCongregationsAction(showLoading));

    get<Congregation[]>('api/congregation/all')
        .then(congregations => {
            dispatch(receiveCongregationsAction(congregations));
        });
};

const deleteCongregation = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDeletingIdAction(id));

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
        }).finally(() => {
            dispatch(setDeletingIdAction(undefined));
        });
};

export const actionCreators = {
    loadCongregations,
    deleteCongregation,
};

export interface State {
    congregationsLoading: boolean;
    congregations: Congregation[];
    deletingId?: number;
}

const initialState: State = {
    congregations: [],
    congregationsLoading: true,
    deletingId: undefined,
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_CONGREGATIONS:
            return {
                ...state,
                congregationsLoading: action.value,
            };
        case RECEIVE_CONGREGATIONS:
            return {
                ...state,
                congregations: action.value,
                congregationsLoading: false,
            };
        case SET_DELETING_ID:
            return {
                ...state,
                deletingId: action.value,
            };
        default:
            return state;
    }
};