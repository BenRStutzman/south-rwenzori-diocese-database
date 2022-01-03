import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Transaction } from '../../models/transaction';
import { History } from 'history';
import { Congregation } from '../../models/congregation';

const REQUEST_TRANSACTION = 'TRANSACTION.REQUEST_TRANSACTION';
const RECEIVE_TRANSACTION = 'TRANSACTION.RECEIVE_TRANSACTION';
const SET_TRANSACTION_TYPE_ID = 'TRANSACTION.SET_TRANSACTION_TYPE_ID';
const SET_CONGREGATION_ID = 'TRANSACTION.SET_CONGREGATION_ID';
const SET_AMOUNT = 'TRANSACTION.SET_AMOUNT';
const SET_DATE = 'TRANSACTION.SET_DATE';
const SET_IS_SAVING = 'TRANSACTION.SET_IS_SAVING';
const SET_ERRORS = 'TRANSACTION.SET_ERRORS';

const requestTransactionAction = () => ({
    type: REQUEST_TRANSACTION,
});

const receiveTransactionAction = (transaction: Transaction) => ({
    type: RECEIVE_TRANSACTION,
    value: transaction,
});

const setTransactionTypeIdAction = (transactionTypeId: number) => ({
    type: SET_TRANSACTION_TYPE_ID,
    value: transactionTypeId,
});

const setCongregationIdAction = (congregationId: number) => ({
    type: SET_CONGREGATION_ID,
    value: congregationId,
});

const setFirstPersonNameAction = (amount: number) => ({
    type: SET_AMOUNT,
    value: amount,
});

const setDateAction = (date: Date) => ({
    type: SET_DATE,
    value: date,
});

const setIsSavingAction = (isSaving: boolean) => ({
    type: SET_IS_SAVING,
    value: isSaving,
});

const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
});

const resetTransaction = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(receiveTransactionAction(initialState.transaction));
};

const loadTransaction = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestTransactionAction());

    get<Transaction>(`api/transaction/${id}`)
        .then(transaction => {
            dispatch(receiveTransactionAction(transaction));
        });
};

const saveTransaction = (transaction: Transaction, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const action = transaction.id ? 'edit' : 'add';

    post<Transaction>(`api/transaction/${action}`, transaction)
        .then(response => {
            if (response.ok) {
                history.push('/transaction');
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

const setTransactionTypeId = (transactionTypeId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setTransactionTypeIdAction(transactionTypeId));
};

const setCongregationId = (parishId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setCongregationIdAction(parishId));
};

const setAmount = (amount: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setFirstPersonNameAction(amount));
};

const setDate = (date: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDateAction(date));
};

export const actionCreators = {
    resetTransaction,
    loadTransaction,
    saveTransaction,
    setTransactionTypeId,
    setCongregationId,
    setAmount,
    setDate,
};

export interface State {
    transactionLoading: boolean;
    congregationsLoading: boolean;
    congregations: Congregation[];
    transaction: Transaction;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    transaction: {
        date: new Date(),
    },
    congregations: [],
    transactionLoading: true,
    congregationsLoading: true,
    hasBeenChanged: false,
    isSaving: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_TRANSACTION:
            return {
                ...state,
                transactionLoading: true,
            };
        case RECEIVE_TRANSACTION:
            return {
                ...state,
                transaction: action.value,
                errors: {},
                transactionLoading: false,
                hasBeenChanged: false,
            };
        case SET_TRANSACTION_TYPE_ID:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    transactionTypeId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_CONGREGATION_ID:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    congregationId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_AMOUNT:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    amount: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_DATE:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    date: action.value,
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