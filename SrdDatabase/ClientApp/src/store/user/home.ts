import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { PagedParameters, pagedResultsDefaults } from '../../models/shared';
import { UserParameters, UserResults } from '../../models/user';

const REQUEST_RESULTS = 'USER.REQUEST_RESULTS';
const RECEIVE_RESULTS = 'USER.RECEIVE_RESULTS';
const SET_PARAMETERS = 'USER.SET_PARAMETERS';
const SET_SEARCH_NAME = 'USER.SET_SEARCH_NAME';
const SET_SEARCH_USERNAME = 'USER.SET_SEARCH_USERNAME';
const SET_SEARCH_USER_TYPE_ID = 'USER.SET_SEARCH_USER_TYPE_ID';

const requestResultsAction = (showLoading: boolean = true) => ({
    type: REQUEST_RESULTS,
    value: showLoading,
});

const receiveResultsAction = (results: UserResults) => ({
    type: RECEIVE_RESULTS,
    value: results,
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

const setParametersAction = (parameters: UserParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const resetParameters = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParametersAction({}));
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
    parameters: UserParameters = {},
    pageNumber: number = 0,
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestResultsAction(showLoading));

    post<UserParameters & PagedParameters>('api/user/search', { ...parameters, pageNumber })
        .then(response => response.json() as Promise<UserResults>)
        .then(results => {
            dispatch(receiveResultsAction(results));
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
    results: UserResults;
    parameters: UserParameters;
};

const initialState: State = {
    results: { ...pagedResultsDefaults, users: [] },
    resultsLoading: true,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_PARAMETERS:
            return {
                ...state,
                parameters: action.value,
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
        case REQUEST_RESULTS:
            return {
                ...state,
                resultsLoading: action.value,
            };
        case RECEIVE_RESULTS:
            return {
                ...state,
                results: action.value,
                resultsLoading: false,
            };
        default:
            return state;
    }
};