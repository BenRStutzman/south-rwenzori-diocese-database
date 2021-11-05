import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../apiHelpers';
import { Parish } from '.';

const REQUEST_PARISHES = 'PARISH.REQUEST_PARISHES';
const RECEIVE_PARISHES = 'PARISH.RECEIVE_PARISHES';
const SET_DELETING_ID = 'PARISH.SET_DELETING_ID';

const requestParishesAction = (showLoading: boolean = true) => ({
    type: REQUEST_PARISHES,
    value: showLoading,
});

const receiveParishesAction = (parishes: Parish[]) => ({
    type: RECEIVE_PARISHES,
    value: parishes,
});

const setDeletingIdAction = (parishId?: number) => ({
    type: SET_DELETING_ID,
    value: parishId,
});

export const loadParishes = (showLoading: boolean = true): AppThunkAction<Action> => (dispatch) => {
    get<Parish[]>('api/parish/all')
        .then(parishes => {
            dispatch(receiveParishesAction(parishes));
        });

    dispatch(requestParishesAction(showLoading));
};

const deleteParish = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDeletingIdAction(id));

    post<{ id: number }>('api/parish/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(loadParishes(false));
            } else {
                throw response.text();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorMessage: string) => {
                dispatch(setDeletingIdAction(undefined));
                alert(errorMessage);
            });
        });
};

export const actionCreators = {
    loadParishes,
    deleteParish,
};

export interface State {
    parishesLoading: boolean;
    parishes: Parish[];
    deletingId?: number;
}

const initialState: State = {
    parishes: [],
    parishesLoading: true,
    deletingId: undefined,
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_PARISHES:
            return {
                ...state,
                parishesLoading: action.value,
            };
        case RECEIVE_PARISHES:
            return {
                ...state,
                parishes: action.value,
                parishesLoading: false,
                deletingId: undefined,
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
