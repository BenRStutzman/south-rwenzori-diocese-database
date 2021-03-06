import { Reducer } from 'redux';
import { AppThunkAction, Action } from '../..';
import { post } from '../../../helpers/apiHelpers';
import { MemberParameters } from '../../../models/sacco/member';
import { MemberResults } from '../../../models/sacco/member';
import { pagedResultsDefaults } from '../../../models/shared';

const SET_RESULTS_LOADING = 'SACCO_MEMBER.SET_RESULTS_LOADING';
const SET_RESULTS = 'SACCO_MEMBER.SET_RESULTS';
const SET_SEARCH_NAME = 'SACCO_MEMBER.SET_SEARCH_NAME';
const SET_SEARCH_ACCOUNT_NUMBER = 'SACCO_MEMBER.SET_SEARCH_ACCOUNT_NUMBER';
const SET_SEARCH_IS_CHURCH = 'SACCO_MEMBER.SET_SEARCH_IS_CHURCH';
const SET_PARAMETERS = 'SACCO_MEMBER.SET_PARAMETERS';

const setResultsLoadingAction = () => ({
    type: SET_RESULTS_LOADING,
});

const setResultsAction = (results: MemberResults) => ({
    type: SET_RESULTS,
    value: results,
});

const setSearchNameAction = (name?: string) => ({
    type: SET_SEARCH_NAME,
    value: name,
});

const setSearchAccountNumberAction = (accountNumber: number) => ({
    type: SET_SEARCH_ACCOUNT_NUMBER,
    value: accountNumber,
});

const setSearchIsChurchAction = (isChurch?: boolean) => ({
    type: SET_SEARCH_IS_CHURCH,
    value: isChurch,
});

const setParametersAction = (parameters: MemberParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const setParameters = (parameters: MemberParameters): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParametersAction(parameters));
};

const prefillParameters = (search: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const parameters = {};

    dispatch(setParameters(parameters));

    if (search) {
        dispatch(searchMembers(parameters));
    }
};

const searchMembers = (
    parameters: MemberParameters = {},
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    if (showLoading) {
        dispatch(setResultsLoadingAction());
    }

    dispatch(setParametersAction(parameters));

    post<MemberParameters>('api/sacco/member/search', parameters)
        .then(response => response.json() as Promise<MemberResults>)
        .then(results => {
            dispatch(setResultsAction(results));
        });
};

const setSearchName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchNameAction(name.length ? name : undefined));
};

const setSearchAccountNumber = (accountNumber: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchAccountNumberAction(accountNumber));
};

const setSearchIsChurch = (isChurch?: boolean): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchIsChurchAction(isChurch));
};

export const actionCreators = {
    searchMembers,
    setSearchName,
    setSearchAccountNumber,
    setSearchIsChurch,
    prefillParameters,
};

export interface State {
    results: MemberResults
    resultsLoading: boolean;
    parameters: MemberParameters;
}

const initialState: State = {
    results: { ...pagedResultsDefaults, members: [] },
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
        case SET_RESULTS_LOADING:
            return {
                ...state,
                resultsLoading: true,
            };
        case SET_RESULTS:
            return {
                ...state,
                results: action.value,
                resultsLoading: false,
            };
        case SET_SEARCH_NAME:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    name: action.value,
                }
            };
        case SET_SEARCH_ACCOUNT_NUMBER:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    accountNumber: action.value,
                }
            };
        case SET_SEARCH_IS_CHURCH:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    isChurch: action.value,
                }
            };
        default:
            return state;
    }
};