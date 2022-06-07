import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { ErrorResponse, Errors, get, post } from '../../../helpers/apiHelpers';
import { Transaction, TransactionToSend } from '../../../models/sacco/transaction';
import { History } from 'history';
import { formattedDate } from '../../../helpers/miscellaneous';
import { Member } from '../../../models/sacco/member';

const SET_IS_LOADING = 'SACCO_TRANSACTION.SET_IS_LOADING';
const SET_TRANSACTION = 'SACCO_TRANSACTION.SET_TRANSACTION';
const SET_MEMBER_ID = 'SACCO_TRANSACTION.SET_MEMBER_ID';
const SET_IS_SHARES = 'SACCO_TRANSACTION.SET_IS_SHARES';
const SET_IS_CONTRIBUTION = 'SACCO_TRANSACTION.SET_IS_CONTRIBUTION';
const SET_AMOUNT = 'SACCO_TRANSACTION.SET_AMOUNT';
const SET_DATE = 'SACCO_TRANSACTION.SET_DATE';
const SET_RECEIPT_NUMBER = 'SACCO_TRANSACTION.SET_RECEIPT_NUMBER';
const SET_NOTES = 'SACCO_TRANSACTION.SET_NOTES';
const SET_IS_SAVING = 'SACCO_TRANSACTION.SET_IS_SAVING';
const SET_ERRORS = 'SACCO_TRANSACTION.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setTransactionAction = (transaction: Transaction) => ({
    type: SET_TRANSACTION,
    value: transaction,
});

const setMemberIdAction = (memberId: number) => ({
    type: SET_MEMBER_ID,
    value: memberId,
});

const setIsSharesAction = (isShares: boolean) => ({
    type: SET_IS_SHARES,
    value: isShares,
});

const setIsContributionAction = (isContribution: boolean) => ({
    type: SET_IS_CONTRIBUTION,
    value: isContribution,
});

const setAmountAction = (amount: number) => ({
    type: SET_AMOUNT,
    value: amount,
});

const setDateAction = (date?: Date) => ({
    type: SET_DATE,
    value: date,
});

const setReceiptNumberAction = (receiptNumber?: number) => ({
    type: SET_RECEIPT_NUMBER,
    value: receiptNumber,
});

const setNotesAction = (notes?: string) => ({
    type: SET_NOTES,
    value: notes,
})

const setIsSavingAction = (isSaving: boolean) => ({
    type: SET_IS_SAVING,
    value: isSaving,
});

const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
});

const prefillTransaction = (memberId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());
    const backupUrl = '/sacco/transaction/add';

    const setTransactionWithDate = (transaction: Transaction) => {
        dispatch(setTransactionAction({
            ...transaction,
            date: new Date(),
            isShares: true,
            isContribution: true,
        }))
    };

    if (memberId) {
        get<Member>(`api/sacco/member/${memberId}`, backupUrl)
            .then(() => {
                setTransactionWithDate({
                    memberId,
                });
            });
    } else {
        setTransactionWithDate({});
    }
};

const loadTransaction = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Transaction>(`api/sacco/transaction/${id}`, '/sacco/transaction')
        .then(transaction => {
            dispatch(setTransactionAction(transaction));
        });
};

const saveTransaction = (transaction: Transaction, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const transactionToSend = {
        ...transaction,
        date: formattedDate(transaction.date),
    }

    const action = transaction.id ? 'edit' : 'add';

    post<TransactionToSend>(`api/sacco/transaction/${action}`, transactionToSend)
        .then(response => {
            if (response.ok) {
                history.push('/sacco/transaction');
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

const setMemberId = (memberId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setMemberIdAction(memberId));
};

const setIsShares = (isShares: boolean): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSharesAction(isShares));
}

const setIsContribution = (isContribution: boolean): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsContributionAction(isContribution));
};

const setAmount = (amount: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setAmountAction(amount));
};

const setDate = (date?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDateAction(date));
};

const setReceiptNumber = (receiptNumber?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setReceiptNumberAction(receiptNumber));
};

const setNotes = (notes: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setNotesAction(notes.length ? notes : undefined));
}

export const actionCreators = {
    prefillTransaction,
    loadTransaction,
    saveTransaction,
    setMemberId,
    setIsShares,
    setIsContribution,
    setAmount,
    setDate,
    setReceiptNumber,
    setNotes,
};

export interface State {
    isLoading: boolean;
    transaction: Transaction;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    transaction: {},
    isLoading: true,
    hasBeenChanged: false,
    isSaving: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case SET_TRANSACTION:
            return {
                ...state,
                transaction: action.value,
                errors: {},
                isLoading: false,
                hasBeenChanged: false,
            };
        case SET_MEMBER_ID:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    memberId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_IS_SHARES:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    isShares: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_IS_CONTRIBUTION:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    isContribution: action.value,
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
        case SET_RECEIPT_NUMBER:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    receiptNumber: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_NOTES:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    notes: action.value,
                },
                hasBeenChanged: true,
            }
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