import { Reducer } from 'redux';
import { AppThunkAction, Action } from '../..';
import { get, post } from '../../../helpers/apiHelpers';
import { formattedDateAllowUndefined } from '../../../helpers/miscellaneous';
import { Congregation } from '../../../models/congregation';
import { Member } from '../../../models/sacco/member';
import { TransactionParameters, TransactionParametersToSend, TransactionResults } from '../../../models/sacco/transaction';
import { pagedResultsDefaults } from '../../../models/shared';

const SET_PARAMETERS = 'SACCO_TRANSACTION.SET_PARAMETERS';
const SET_SEARCH_START_DATE = 'SACCO_TRANSACTION.SET_SEARCH_START_DATE';
const SET_SEARCH_END_DATE = 'SACCO_TRANSACTION.SET_SEARCH_END_DATE';
const SET_SEARCH_MEMBER_ID = 'SACCO_TRANSACTION.SET_SEARCH_MEMBER_ID';
const SET_SEARCH_IS_SHARES = 'SACCO_TRANSACTION.SET_SEARCH_IS_SHARES';
const SET_SEARCH_IS_CONTRIBUTION = 'SACCO_TRANSACTION.SET_SEARCH_IS_CONTRIBUTION';
const SET_SEARCH_RECEIPT_NUMBER = 'SACCO_TRANSACTION.SET_SEARCH_RECEIPT_NUMBER';
const SET_RESULTS_LOADING = 'SACCO_TRANSACTION.SET_RESULTS_LOADING';
const SET_RESULTS = 'SACCO_TRANSACTION.SET_RESULTS';

const setResultsLoadingAction = () => ({
    type: SET_RESULTS_LOADING,
});

const setResultsAction = (results: TransactionResults) => ({
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

const setSearchMemberIdAction = (memberId?: number) => ({
    type: SET_SEARCH_MEMBER_ID,
    value: memberId,
});

const setSearchIsSharesAction = (isShares?: boolean) => ({
    type: SET_SEARCH_IS_SHARES,
    value: isShares,
});

const setSearchIsContributionAction = (isContribution?: boolean) => ({
    type: SET_SEARCH_IS_CONTRIBUTION,
    value: isContribution,
});

const setSearchReceiptNumberAction = (receiptNumber?: number) => ({
    type: SET_SEARCH_RECEIPT_NUMBER,
    value: receiptNumber,
});

const setParametersAction = (parameters: TransactionParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const prefillParameters = (memberId?: number, search: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const backupUrl = '/sacco/transaction';

    const setParametersAndSearch = (parameters: TransactionParameters) => {
        dispatch(setParametersAction(parameters));

        if (search) {
            dispatch(searchTransactions(parameters));
        }
    };

    if (memberId) {
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

const setSearchMemberId = (memberId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchMemberIdAction(memberId));
};

const setSearchIsShares = (isShares?: boolean): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchIsSharesAction(isShares));
};

const setSearchIsContribution = (isContribution?: boolean): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchIsContributionAction(isContribution));
};

const setSearchReceiptNumber = (receiptNumber?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchReceiptNumberAction(receiptNumber));
};

const searchTransactions = (
    parameters: TransactionParameters = {},
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

    post<TransactionParametersToSend>('api/sacco/transaction/search', parametersToSend)
        .then(response => response.json() as Promise<TransactionResults>)
        .then(results => {
            dispatch(setResultsAction(results));
        });
};

export const actionCreators = {
    searchTransactions,
    setSearchIsShares,
    setSearchIsContribution,
    setSearchMemberId,
    setSearchStartDate,
    setSearchEndDate,
    setSearchReceiptNumber,
    prefillParameters,
};

export interface State {
    resultsLoading: boolean;
    results: TransactionResults;
    parameters: TransactionParameters,
}

const initialState: State = {
    results: { ...pagedResultsDefaults, transactions: [] },
    resultsLoading: true,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_SEARCH_IS_CONTRIBUTION:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    isContribution: action.value,
                }
            };
        case SET_SEARCH_IS_SHARES:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    isShares: action.value,
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