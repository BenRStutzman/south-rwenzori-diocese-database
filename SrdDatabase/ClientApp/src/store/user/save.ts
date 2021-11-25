import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { User, UserType } from './shared';
import { History } from 'history';

const REQUEST_USER = 'USER.REQUEST_USER';
const RECEIVE_USER = 'USER.RECEIVE_USER';
const REQUEST_USER_TYPES = 'USER.REQUEST_USER_TYPES';
const RECEIVE_USER_TYPES = 'USER.RECEIVE_USER_TYPES';
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

const requestUserTypesAction = () => ({
    type: REQUEST_USER_TYPES,
});

const receiveUserTypesAction = (userTypes: UserType[]) => ({
    type: RECEIVE_USER_TYPES,
    value: userTypes,
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

const loadUserTypes = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestUserTypesAction());

    get<UserType[]>('api/user/types')
        .then(userTypes => {
            dispatch(receiveUserTypesAction(userTypes));
        });
};

const saveUser = (user: User, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    post<User>('api/user/save', user)
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

const deleteUser = (id: number, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    post<{ id: number }>('api/user/delete', { id })
        .then(response => {
            if (response.ok) {
                history.push('/user');
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
    loadUserTypes,
    resetUser,
    saveUser,
    deleteUser,
    setUserTypeId,
    setName,
    setUsername,
    setPassword,
};

export interface State {
    userLoading: boolean;
    userTypesLoading: boolean;
    userTypes: UserType[];
    user: User;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    user: {},
    userTypes: [],
    userLoading: true,
    userTypesLoading: true,
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
        case REQUEST_USER_TYPES:
            return {
                ...state,
                userTypesLoading: true,
            };
        case RECEIVE_USER_TYPES:
            return {
                ...state,
                userTypes: action.value,
                userTypesLoading: false,
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