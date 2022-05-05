import { Reducer } from 'redux';
import { AppThunkAction, Action } from '../..';
import { get, post } from '../../../helpers/apiHelpers';
import { formattedDateAllowUndefined } from '../../../helpers/miscellaneous';
import { Congregation } from '../../../models/congregation';
import { LoanParameters, LoanParametersToSend, LoanResults } from '../../../models/sacco/loan';
import { pagedResultsDefaults } from '../../../models/shared';

const SET_PARAMETERS = 'SACCO_LOAN.SET_PARAMETERS';
const SET_SEARCH_START_DATE = 'SACCO_LOAN.SET_SEARCH_START_DATE';
const SET_SEARCH_END_DATE = 'SACCO_LOAN.SET_SEARCH_END_DATE';
const SET_SEARCH_MEMBER_ID = 'SACCO_LOAN.SET_SEARCH_MEMBER_ID';
const SET_SEARCH_LOAN_TYPE_ID = 'SACCO_LOAN.SET_SEARCH_LOAN_TYPE_ID';
const SET_RESULTS_LOADING = 'SACCO_LOAN.SET_RESULTS_LOADING';
const SET_RESULTS = 'SACCO_LOAN.SET_RESULTS';

const setResultsLoadingAction = () => ({
    type: SET_RESULTS_LOADING,
});

const setResultsAction = (results: LoanResults) => ({
    type: SET_RESULTS,
    value: results,
});

const setSearchStartDateAction = (startDate?: Date) => ({
    type: SET_SEARCH_START_DATE,
    value: startDate,
});

const setSearchEndDateAction = (endDate?: Date) => ({
    type: SET_SEARCH_END_DATE,
    value: endDate,
});

const setSearchMemberIdAction = (memberId: number) => ({
    type: SET_SEARCH_MEMBER_ID,
    value: memberId,
});

const setSearchLoanTypeIdAction = (loanTypeId: number) => ({
    type: SET_SEARCH_LOAN_TYPE_ID,
    value: loanTypeId,
});

const setParametersAction = (parameters: LoanParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const prefillParameters = (memberId?: number, search: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const backupUrl = '/sacco/loan';

    const setParametersAndSearch = (parameters: LoanParameters) => {
        dispatch(setParametersAction(parameters));

        if (search) {
            dispatch(searchLoans(parameters));
        }
    };

    if (memberId) {
        get<Congregation>(`api/sacco/member/${memberId}`, backupUrl)
            .then(() => {
                setParametersAndSearch({
                    memberId,
                });
            });
    } else {
        setParametersAndSearch({});
    }
};

const setSearchStartDate = (startDate?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchStartDateAction(startDate));
};

const setSearchEndDate = (endDate?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchEndDateAction(endDate));
};

const setSearchMemberId = (memberId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchMemberIdAction(memberId));
};

const setSearchLoanTypeId = (loanTypeId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchLoanTypeIdAction(loanTypeId));
};

const searchLoans = (
    parameters: LoanParameters = {},
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    if (showLoading) {
        dispatch(setResultsLoadingAction());
    }

    dispatch(setParametersAction(parameters));

    const parametersToSend = {
        ...parameters,
        startDate: formattedDateAllowUndefined(parameters.startDate),
        endDate: formattedDateAllowUndefined(parameters.endDate),
    }

    post<LoanParametersToSend>('api/sacco/loan/search', parametersToSend)
        .then(response => response.json() as Promise<LoanResults>)
        .then(results => {
            dispatch(setResultsAction(results));
        });
};

export const actionCreators = {
    searchLoans,
    setSearchLoanTypeId,
    setSearchMemberId,
    setSearchStartDate,
    setSearchEndDate,
    prefillParameters,
};

export interface State {
    resultsLoading: boolean;
    results: LoanResults;
    parameters: LoanParameters,
}

const initialState: State = {
    results: { ...pagedResultsDefaults, loans: [] },
    resultsLoading: true,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_SEARCH_LOAN_TYPE_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    loanTypeId: action.value,
                }
            };
        case SET_SEARCH_MEMBER_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    memberId: action.value,
                }
            };
        case SET_SEARCH_START_DATE:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    startDate: action.value,
                }
            };
        case SET_SEARCH_END_DATE:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    endDate: action.value,
                }
            };
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
        default:
            return state;
    }
};