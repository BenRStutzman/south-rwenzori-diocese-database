import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { TransactionParameters, TransactionResults } from '../../models/payment';
import { PagedParameters, pagedResultsDefaults } from '../../models/shared';

const RESET_PARAMETERS = 'TRANSACTION.RESET_PARAMETERS';
const SET_SEARCH_TRANSACTION_TYPE_ID = 'TRANSACTION.SET_SEARCH_TRANSACTION_TYPE_ID';
const SET_SEARCH_START_DATE = 'TRANSACTION.SET_SEARCH_START_DATE';
const SET_SEARCH_END_DATE = 'TRANSACTION.SET_SEARCH_END_DATE';
const SET_SEARCH_ARCHDEACONRY_ID = 'TRANSACTION.SET_SEARCH_ARCHDEACONRY_ID';
const SET_SEARCH_PARISH_ID = 'TRANSACTION.SET_SEARCH_PARISH_ID';
const SET_SEARCH_CONGREGATION_ID = 'TRANSACTION.SET_SEARCH_CONGREGATION_ID';
const REQUEST_RESULTS = 'TRANSACTION.REQUEST_RESULTS';
const RECEIVE_RESULTS = 'TRANSACTION.RECEIVE_RESULTS';

const requestResultsAction = (showLoading: boolean = true) => ({
    type: REQUEST_RESULTS,
    value: showLoading,
});

const receiveResultsAction = (results: TransactionResults) => ({
    type: RECEIVE_RESULTS,
    value: results,
});

const setSearchTransactionTypeIdAction = (transactionTypeId: number) => ({
    type: SET_SEARCH_TRANSACTION_TYPE_ID,
    value: transactionTypeId,
});

const setSearchStartDateAction = (startDate: Date) => ({
    type: SET_SEARCH_START_DATE,
    value: startDate,
});

const setSearchEndDateAction = (endDate: Date) => ({
    type: SET_SEARCH_END_DATE,
    value: endDate,
});

const setSearchArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_SEARCH_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const setSearchParishIdAction = (parishId: number) => ({
    type: SET_SEARCH_PARISH_ID,
    value: parishId,
});

const setSearchCongregationIdAction = (congregationId: number) => ({
    type: SET_SEARCH_CONGREGATION_ID,
    value: congregationId,
});

const resetParametersAction = () => ({
    type: RESET_PARAMETERS,
});

const resetParameters = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetParametersAction());
};

const setSearchTransactionTypeId = (transactionTypeId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchTransactionTypeIdAction(transactionTypeId));
};

const setSearchStartDate = (startDate: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchStartDateAction(startDate));
};

const setSearchEndDate = (endDate: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchEndDateAction(endDate));
};

const setSearchArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchArchdeaconryIdAction(archdeaconryId));
};

const setSearchParishId = (parishId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchParishIdAction(parishId));
};

const setSearchCongregationId = (congregationId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchCongregationIdAction(congregationId));
};

const searchTransactions = (
    parameters: TransactionParameters = {},
    pageNumber: number = 0,
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestResultsAction(showLoading));

    post<TransactionParameters & PagedParameters>('api/transaction/search', { ...parameters, pageNumber })
        .then(response => response.json() as Promise<TransactionResults>)
        .then(results => {
            dispatch(receiveResultsAction(results));
        });
};

export const actionCreators = {
    searchTransactions,
    setSearchTransactionTypeId,
    setSearchParishId,
    setSearchCongregationId,
    setSearchArchdeaconryId,
    setSearchStartDate,
    setSearchEndDate,
    resetParameters,
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
        case SET_SEARCH_TRANSACTION_TYPE_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    transactionTypeId: action.value,
                }
            };
        case SET_SEARCH_CONGREGATION_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    congregationId: action.value,
                }
            };
        case SET_SEARCH_PARISH_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    parishId: action.value,
                }
            };
        case SET_SEARCH_ARCHDEACONRY_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    archdeaconryId: action.value,
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
        case RESET_PARAMETERS:
            return {
                ...state,
                parameters: initialState.parameters,
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