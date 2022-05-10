import { Reducer } from 'redux';
import { AppThunkAction, Action } from '../..';
import { get, post } from '../../../helpers/apiHelpers';
import { formattedDateAllowUndefined } from '../../../helpers/miscellaneous';
import { Congregation } from '../../../models/congregation';
import { InstallmentParameters, InstallmentParametersToSend, InstallmentResults } from '../../../models/sacco/installment';
import { Loan } from '../../../models/sacco/loan';
import { Member } from '../../../models/sacco/member';
import { pagedResultsDefaults } from '../../../models/shared';
import { loadLoans } from '../shared';

const SET_PARAMETERS = 'SACCO_INSTALLMENT.SET_PARAMETERS';
const SET_SEARCH_START_DATE = 'SACCO_INSTALLMENT.SET_SEARCH_START_DATE';
const SET_SEARCH_END_DATE = 'SACCO_INSTALLMENT.SET_SEARCH_END_DATE';
const SET_SEARCH_MEMBER_ID = 'SACCO_INSTALLMENT.SET_SEARCH_MEMBER_ID';
const SET_SEARCH_LOAN_ID = 'SACCO_INSTALLMENT.SET_SEARCH_LOAN_ID';
const SET_SEARCH_RECEIPT_NUMBER = 'SACCO_INSTALLMENT.SET_SEARCH_RECEIPT_NUMBER';
const SET_RESULTS_LOADING = 'SACCO_INSTALLMENT.SET_RESULTS_LOADING';
const SET_RESULTS = 'SACCO_INSTALLMENT.SET_RESULTS';

const setResultsLoadingAction = () => ({
    type: SET_RESULTS_LOADING,
});

const setResultsAction = (results: InstallmentResults) => ({
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

const setSearchLoanIdAction = (loanId?: number) => ({
    type: SET_SEARCH_LOAN_ID,
    value: loanId,
});

const setSearchReceiptNumberAction = (receiptNumber?: number) => ({
    type: SET_SEARCH_RECEIPT_NUMBER,
    value: receiptNumber,
});

const setParametersAction = (parameters: InstallmentParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const prefillParameters = (loanId?: number, memberId?: number, search: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const backupUrl = '/sacco/installment';

    const setParametersAndSearch = (parameters: InstallmentParameters) => {
        dispatch(setParametersAction(parameters));

        if (search) {
            dispatch(searchInstallments(parameters));
        }
    };

    if (loanId) {
        get<Loan>(`api/sacco/loan/${loanId}`, backupUrl)
            .then(loan => {
                setParametersAndSearch({
                    memberId: loan.memberId,
                    loanId,
                });
            });
    }
    else if (memberId) {
        get<Member>(`api/sacco/member/${memberId}`, backupUrl)
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
    dispatch(loadLoans(memberId))
    dispatch(setSearchMemberIdAction(memberId));
    dispatch(setSearchLoanId());
};

const setSearchLoanId = (loanId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchLoanIdAction(loanId));
}

const setSearchReceiptNumber = (receiptNumber?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchReceiptNumberAction(receiptNumber));
};

const searchInstallments = (
    parameters: InstallmentParameters = {},
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

    post<InstallmentParametersToSend>('api/sacco/installment/search', parametersToSend)
        .then(response => response.json() as Promise<InstallmentResults>)
        .then(results => {
            dispatch(setResultsAction(results));
        });
};

export const actionCreators = {
    searchInstallments,
    setSearchMemberId,
    setSearchLoanId,
    setSearchStartDate,
    setSearchEndDate,
    setSearchReceiptNumber,
    prefillParameters,
};

export interface State {
    resultsLoading: boolean;
    results: InstallmentResults;
    parameters: InstallmentParameters,
}

const initialState: State = {
    results: { ...pagedResultsDefaults, installments: [] },
    resultsLoading: true,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_SEARCH_MEMBER_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    memberId: action.value,
                }
            };
        case SET_SEARCH_LOAN_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    loanId: action.value,
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
        case SET_SEARCH_RECEIPT_NUMBER:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    receiptNumber: action.value,
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