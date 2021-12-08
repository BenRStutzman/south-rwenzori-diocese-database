import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { User } from '../../models/user';
import { History } from 'history';

const REQUEST_USER = 'USER.REQUEST_USER';
const RECEIVE_USER = 'USER.RECEIVE_USER';
const SET_USER_TYPE_ID = 'USER.SET_USER_TYPE_ID';
const SET_NAME = 'USER.SET_NAME';
const SET_USERNAME = 'USER.SET_USERNAME';
const SET_PASSWORD = 'USER.SET_PASSWORD';
const SET_IS_SAVING = 'USER.SET_IS_SAVING';
const SET_ERRORS = 'USER.SET_ERRORS';

const requestUserAction = () => ({
    type: REQUEST_USER,
});

const receiveUserAction = (user: User) => ({
    type: RECEIVE_USER,
    value: user,
});

const setUserTypeIdAction = (userTypeId: number) => ({
    type: SET_USER_TYPE_ID,
    value: userTypeId,
});

const setNameAction = (name: string) => ({
    type: SET_NAME,
    value: name,
});

const setUsernameAction = (username: string) => ({
    type: SET_USERNAME,
    value: username,
});

const setPasswordAction = (password: string) => ({
    type: SET_PASSWORD,
    value: password,
});

const setIsSavingAction = (isSaving: boolean) => ({
    type: SET_IS_SAVING,
    value: isSaving,
});

const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
});

const resetUser = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(receiveUserAction(initialState.user));
};

const loadUser = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestUserAction());

    get<User>(`api/user/${id}`)
        .then(user => {
            dispatch(receiveUserAction(user));
        });
};

const saveUser = (user: User, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const action = user.id ? 'edit' : 'add';

    post<User>(`api/user/${action}`, user)
        .then(response => {
            if (response.ok) {
                history.push('/user');
            } else {
                throw response.json();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorResponse: ErrorResponse) => {
                dispatch(setErrorsAction(errorResponse.errors));
            });
        }).finally(() => {
            dispatch(setIsSavingAction(false));
        });
};

const setUserTypeId = (userTypeId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setUserTypeIdAction(userTypeId));
};

const setName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setNameAction(name));
};

const setUsername = (username: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setUsernameAction(username));
};

const setPassword = (password: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setPasswordAction(password));
};

export const actionCreators = {
    loadUser,
    resetUser,
    saveUser,
    setUserTypeId,
    setName,
    setUsername,
    setPassword,
};

export interface State {
    userLoading: boolean;
    user: User;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    user: {},
    userLoading: true,
    hasBeenChanged: false,
    isSaving: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_USER:
            return {
                ...state,
                userLoading: true,
            };
        case RECEIVE_USER:
            return {
                ...state,
                user: action.value,
                errors: {},
                userLoading: false,
                hasBeenChanged: false,
            };
        case SET_USER_TYPE_ID:
            return {
                ...state,
                user: {
                    ...state.user,
                    userTypeId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_NAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_USERNAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    username: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_PASSWORD:
            return {
                ...state,
                user: {
                    ...state.user,
                    password: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_IS_SAVING:
            return {
                ...state,
                isSaving: action.value,
            }
        case SET_ERRORS:
            return {
                ...state,
                errors: action.value,
            };
        default:
            return state;
    }
};