import { Reducer } from "redux";
import { Action, AppThunkAction } from '..';
import { post } from "../../helpers/apiHelpers";
import { History, Location } from 'history';
import { UserData } from '../user/';
import { actionCreators as sharedActionCreators } from '../shared';

interface Credentials {
    username?: string,
    password?: string,
};

const SET_USERNAME = 'LOGIN.SET_USERNAME';
const SET_PASSWORD = 'LOGIN.SET_PASSWORD';
const SET_IS_LOADING = 'LOGIN.SET_IS_LOADING';
const RESET_CREDENTIALS = 'LOGIN.RESET_CREDENTIALS';

const setUsernameAction = (username: string) => ({
    type: SET_USERNAME,
    value: username,
});

const setPasswordAction = (password: string) => ({
    type: SET_PASSWORD,
    value: password,
});

const setIsLoadingAction = (isLoading: boolean) => ({
    type: SET_IS_LOADING,
    value: isLoading,
});

const resetCredentialsAction = () => ({
    type: RESET_CREDENTIALS,
});

const resetCredentials = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetCredentialsAction());
};

const setUsername = (username: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setUsernameAction(username));
};

const setPassword = (password: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setPasswordAction(password));
};

const authenticate = (credentials: Credentials, history: History, location: Location): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction(true));

    post<Credentials>('/api/user/login', credentials)
        .then(response => {
            if (response.ok) {
                return response.json() as Promise<UserData>;
            } else {
                throw response.text();
            }
        }).then(userData => {
            dispatch(sharedActionCreators.login(userData));
            const { from } = location.state || { from: { pathname: "/" } };
            history.push(from);
        }).catch(errorPromise => {
            errorPromise.then((errorMessage: string) => {
                alert(errorMessage);
            });
        }).finally(() => {
            dispatch(setIsLoadingAction(false));
        });
};

export const actionCreators = {
    resetCredentials,
    setUsername,
    setPassword,
    authenticate,
};

export interface State {
    isAuthenticating: boolean;
    credentials: Credentials;
};

const initialState: State = {
    isAuthenticating: false,
    credentials: {},
}

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    username: action.value,
                }
            };
        case SET_PASSWORD:
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    password: action.value,
                }
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isAuthenticating: action.value,
            };
        case RESET_CREDENTIALS:
            return {
                ...state,
                credentials: {},
            };
        default:
            return state;
    }
}