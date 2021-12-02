import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { User } from '.';

export interface SearchParameters {
    name?: string;
    username?: string;
    userTypeId?: number;
}

const REQUEST_USERS = 'USER.REQUEST_USERS';
const RECEIVE_USERS = 'USER.RECEIVE_USERS';
const RESET_PARAMETERS = 'USER.RESET_PARAMETERS';
const SET_SEARCH_NAME = 'USER.SET_SEARCH_NAME';
const SET_SEARCH_USERNAME = 'USER.SET_SEARCH_USERNAME';
const SET_SEARCH_USER_TYPE_ID = 'USER.SET_SEARCH_USER_TYPE_ID';

const requestUsersAction = (showLoading: boolean = true) => ({
    type: REQUEST_USERS,
    value: showLoading,
});

const receiveUsersAction = (users: User[]) => ({
    type: RECEIVE_USERS,
    value: users,
});

const setSearchNameAction = (name: string) => ({
    type: SET_SEARCH_NAME,
    value: name,
});

const setSearchUsernameAction = (username: string) => ({
    type: SET_SEARCH_USERNAME,
    value: username,
});

const setSearchUserTypeIdAction = (userTypeId: number) => ({
    type: SET_SEARCH_USER_TYPE_ID,
    value: userTypeId,
});

const resetParametersAction = () => ({
    type: RESET_PARAMETERS,
});

const resetParameters = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetParametersAction());
};

const setSearchName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchNameAction(name));
};

const setSearchUsername = (username: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchUsernameAction(username));
};

const setSearchUserTypeId = (userTypeId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchUserTypeIdAction(userTypeId));
};

const searchUsers = (
    parameters: SearchParameters = {},
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestUsersAction(showLoading));

    post<SearchParameters>('api/user/search', parameters)
        .then(response => response.json() as Promise<User[]>)
        .then(users => {
            dispatch(receiveUsersAction(users));
        });
};

export const actionCreators = {
    searchUsers,
    resetParameters,
    setSearchName,
    setSearchUsername,
    setSearchUserTypeId,
};

export interface State {
    resultsLoading: boolean;
    results: User[];
    parameters: SearchParameters;
};

const initialState: State = {
    results: [],
    resultsLoading: true,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case RESET_PARAMETERS:
            return {
                ...state,
                parameters: initialState.parameters,
            };
        case SET_SEARCH_NAME:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    name: action.value,
                }
            };
        case SET_SEARCH_USERNAME:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    username: action.value,
                }
            };
        case SET_SEARCH_USER_TYPE_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    userTypeId: action.value,
                }
            };
        case REQUEST_USERS:
            return {
                ...state,
                resultsLoading: action.value,
            };
        case RECEIVE_USERS:
            return {
                ...state,
                results: action.value,
                resultsLoading: false,
            };
        default:
            return state;
    }
};