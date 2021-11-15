import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { User } from '.';

const REQUEST_USERS = 'USER.REQUEST_USERS';
const RECEIVE_USERS = 'USER.RECEIVE_USERS';
const SET_DELETING_ID = 'USER.SET_DELETING_ID';

const requestUsersAction = (showLoading: boolean = true) => ({
    type: REQUEST_USERS,
    value: showLoading,
});

const receiveUsersAction = (users: User[]) => ({
    type: RECEIVE_USERS,
    value: users,
});

const setDeletingIdAction = (userId?: number) => ({
    type: SET_DELETING_ID,
    value: userId,
});

const loadUsers = (showLoading: boolean = true): AppThunkAction<Action> => (dispatch) => {
    get<User[]>('api/user/all')
        .then(users => {
            dispatch(receiveUsersAction(users));
        });

    dispatch(requestUsersAction(showLoading));
};

const deleteUser = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDeletingIdAction(id));

    post<{ id: number }>('api/user/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(loadUsers(false));
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
    loadUsers,
    deleteUser,
};

export interface State {
    usersLoading: boolean;
    users: User[];
    deletingId?: number;
}

const initialState: State = {
    users: [],
    usersLoading: true,
    deletingId: undefined,
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_USERS:
            return {
                ...state,
                usersLoading: action.value,
            };
        case RECEIVE_USERS:
            return {
                ...state,
                users: action.value,
                usersLoading: false,
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