import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Transaction } from '../../models/transaction';
import { History } from 'history';
import { Congregation } from '../../models/congregation';
import { loadCongregations, loadParishes } from '../shared';
import { Parish } from '../../models/parish';
import { Archdeaconry } from '../../models/archdeaconry';

const REQUEST_TRANSACTION = 'TRANSACTION.REQUEST_TRANSACTION';
const RECEIVE_TRANSACTION = 'TRANSACTION.RECEIVE_TRANSACTION';
const SET_TRANSACTION_TYPE_ID = 'TRANSACTION.SET_TRANSACTION_TYPE_ID';
const SET_ARCHDEACONRY_ID = 'EVENT.SET_ARCHDEACONRY_ID';
const SET_PARISH_ID = 'EVENT.SET_PARISH_ID';
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

const setArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const setParishIdAction = (parishId?: number) => ({
    type: SET_PARISH_ID,
    value: parishId,
});

const setCongregationIdAction = (congregationId?: number) => ({
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

const resetTransaction = (congregationId?: number, parishId?: number, archdeaconryId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestTransactionAction());

    const date = new Date();

    if (congregationId) {
        get<Congregation>(`api/congregation/${congregationId}`)
            .then(congregation => {
                dispatch(receiveTransaction({
                    date,
                    congregationId: congregation.id,
                    parishId: congregation.parishId,
                    archdeaconryId: congregation.archdeaconryId,
                }));
            });
    } else if (parishId) {
        get<Parish>(`api/parish/${parishId}`)
            .then(parish => {
                dispatch(receiveTransaction({
                    date,
                    parishId: parish.id,
                    archdeaconryId: parish.archdeaconryId,
                }));
            });
    } else if (archdeaconryId) {
        get<Archdeaconry>(`api/archdeaconry/${archdeaconryId}`)
            .then(archdeaconry => {
                dispatch(receiveTransaction({
                    date,
                    archdeaconryId: archdeaconry.id,
                }));
            });
    } else {
        dispatch(receiveTransaction({
            date,
        }));
    }
};

const receiveTransaction = (transaction: Transaction): AppThunkAction<Action> => (dispatch) => {
    dispatch(receiveTransactionAction(transaction));
    dispatch(loadParishes(transaction.archdeaconryId));
    dispatch(loadCongregations(transaction.parishId));
}

const loadTransaction = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestTransactionAction());

    get<Transaction>(`api/transaction/${id}`)
        .then(transaction => {
            dispatch(receiveTransaction(transaction));
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

const setArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setArchdeaconryIdAction(archdeaconryId));
    dispatch(loadParishes(archdeaconryId));
    dispatch(setParishId(undefined));
};

const setParishId = (parishId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParishIdAction(parishId));
    dispatch(loadCongregations(parishId));
    dispatch(setCongregationId(undefined));
}

const setCongregationId = (congregationId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setCongregationIdAction(congregationId));
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
    setArchdeaconryId,
    setParishId,
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
        case SET_ARCHDEACONRY_ID:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    archdeaconryId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_PARISH_ID:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    parishId: action.value,
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