import { Reducer } from "redux";
import { Action, AppThunkAction } from "..";
import { post } from "../../helpers/apiHelpers";
import { History } from 'history';
import { User } from "../user";

export interface UserData {
    user: User;
    token: String;
}

interface Credentials {
    username?: string,
    password?: string,
};

const SET_USERNAME = 'LOGIN.SET_USERNAME';
const SET_PASSWORD = 'LOGIN.SET_PASSWORD';
const SET_IS_LOADING = 'LOGIN.SET_IS_LOADING';
const LOGIN = 'LOGIN.LOGIN';
const LOGOUT = 'LOGIN.LOGOUT';

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

const loginAction = (user: User) => ({
    type: LOGIN,
    value: user,
});

const logoutAction = () => ({
    type: LOGOUT,
});

const setUsername = (username: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setUsernameAction(username));
};

const setPassword = (password: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setPasswordAction(password));
};

const login = (userData: UserData): AppThunkAction<Action> => (dispatch) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    dispatch(loginAction(userData.user));
};

const authenticate = (credentials: Credentials, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction(true));

    post<Credentials>('/api/user/login', credentials)
        .then(response => {
            if (response.ok) {
                return response.json() as Promise<UserData>;
            } else {
                throw response.text();
            }
        }).then(userData => {
            dispatch(login(userData));
            history.push('/');
        }).catch(errorPromise => {
            errorPromise.then((errorMessage: string) => {
                alert(errorMessage);
            });
        }).finally(() => {
            dispatch(setIsLoadingAction(false));
        });
};

const logout = (): AppThunkAction<Action> => (dispatch) => {
    localStorage.removeItem('userData');
    dispatch(logoutAction());
};

export const actionCreators = {
    setUsername,
    setPassword,
    authenticate,
    logout,
};

export interface State {
    isLoading: boolean;
    credentials: Credentials;
    isLoggedIn: boolean,
    user?: User;
};

const userJson = localStorage.getItem('userData');
const user = userJson ? (JSON.parse(userJson) as UserData)?.user : undefined;

const initialState: State = {
    isLoading: false,
    credentials: {},
    isLoggedIn: Boolean(user),
    user,
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
                isLoading: action.value,
            };
        case LOGIN:
            return {
                ...state,
                user: action.value,
                isLoggedIn: true,
            };
        case LOGOUT:
            return {
                ...state,
                user: undefined,
                isLoggedIn: false,
                credentials: {},
            };
        default:
            return state;
    }
}