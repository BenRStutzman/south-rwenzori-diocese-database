import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { ErrorResponse, Errors, get, post } from '../../../helpers/apiHelpers';
import { Payment, PaymentToSend } from '../../../models/sacco/payment';
import { History } from 'history';
import { formattedDate } from '../../../helpers/miscellaneous';
import { Loan } from '../../../models/sacco/loan';
import { loadLoans } from '../shared';
import { Member } from '../../../models/sacco/member';

const SET_IS_LOADING = 'SACCO_PAYMENT.SET_IS_LOADING';
const SET_PAYMENT = 'SACCO_PAYMENT.SET_PAYMENT';
const SET_MEMBER_ID = 'SACCO_PAYMENT.SET_MEMBER_ID';
const SET_LOAN_ID = 'SACCO_PAYMENT.SET_LOAN_ID';
const SET_AMOUNT = 'SACCO_PAYMENT.SET_AMOUNT';
const SET_DATE = 'SACCO_PAYMENT.SET_DATE';
const SET_RECEIPT_NUMBER = 'SACCO_PAYMENT.SET_RECEIPT_NUMBER';
const SET_IS_SAVING = 'SACCO_PAYMENT.SET_IS_SAVING';
const SET_ERRORS = 'SACCO_PAYMENT.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setPaymentAction = (payment: Payment) => ({
    type: SET_PAYMENT,
    value: payment,
});

const setMemberIdAction = (memberId: number) => ({
    type: SET_MEMBER_ID,
    value: memberId,
});

const setLoanIdAction = (loanId: number) => ({
    type: SET_LOAN_ID,
    value: loanId,
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

const setIsSavingAction = (isSaving: boolean) => ({
    type: SET_IS_SAVING,
    value: isSaving,
});

const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
});

const setPayment = (congregation: Payment): AppThunkAction<Action> => (dispatch) => {
    dispatch(setPaymentAction(congregation));
    dispatch(loadLoans(congregation.memberId));
};

const prefillPayment = (loanId?: number, memberId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());
    const backupUrl = '/sacco/payment/add';

    const setPaymentWithDate = (payment: Payment) => {
        dispatch(setPayment({
            ...payment,
            date: new Date(),
        }))
    };

    if (loanId) {
        get<Loan>(`api/sacco/loan/${loanId}`, backupUrl)
            .then(loan => {
                setPaymentWithDate({
                    memberId: loan.memberId,
                    loanId,
                });
            });
    } else if (memberId) {
        get<Member>(`api/sacco/member/${memberId}`, backupUrl)
            .then(() => {
                setPaymentWithDate({
                    memberId,
                });
            });
    } else {
        setPaymentWithDate({});
    }
};

const loadPayment = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Payment>(`api/sacco/payment/${id}`, '/sacco/payment')
        .then(payment => {
            dispatch(setPaymentAction(payment));
        });
};

const savePayment = (payment: Payment, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const paymentToSend = {
        ...payment,
        date: formattedDate(payment.date),
    }

    const action = payment.id ? 'edit' : 'add';

    post<PaymentToSend>(`api/sacco/payment/${action}`, paymentToSend)
        .then(response => {
            if (response.ok) {
                history.push('/sacco/payment');
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
    dispatch(loadLoans(memberId));
    dispatch(setMemberIdAction(memberId));
    dispatch(setLoanId(undefined));
};

const setLoanId = (loanId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setLoanIdAction(loanId));
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

export const actionCreators = {
    prefillPayment,
    loadPayment,
    savePayment,
    setLoanId,
    setMemberId,
    setAmount,
    setDate,
    setReceiptNumber,
};

export interface State {
    isLoading: boolean;
    payment: Payment;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    payment: {},
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
        case SET_PAYMENT:
            return {
                ...state,
                payment: action.value,
                errors: {},
                isLoading: false,
                hasBeenChanged: false,
            };
        case SET_LOAN_ID:
            return {
                ...state,
                payment: {
                    ...state.payment,
                    memberId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_AMOUNT:
            return {
                ...state,
                payment: {
                    ...state.payment,
                    amount: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_DATE:
            return {
                ...state,
                payment: {
                    ...state.payment,
                    date: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_RECEIPT_NUMBER:
            return {
                ...state,
                payment: {
                    ...state.payment,
                    receiptNumber: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_IS_SAVING:
            return {
                ...state,
                isSaving: action.value,
            };
        case SET_ERRORS:
            return {
                ...state,
                errors: action.value,
            };
        default:
            return state;
    }
};