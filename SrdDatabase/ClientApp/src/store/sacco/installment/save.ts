import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { ErrorResponse, Errors, get, post } from '../../../helpers/apiHelpers';
import { Installment, InstallmentToSend } from '../../../models/sacco/installment';
import { History } from 'history';
import { formattedDate } from '../../../helpers/miscellaneous';
import { Loan } from '../../../models/sacco/loan';
import { loadLoans } from '../shared';

const SET_IS_LOADING = 'SACCO_INSTALLMENT.SET_IS_LOADING';
const SET_INSTALLMENT = 'SACCO_INSTALLMENT.SET_INSTALLMENT';
const SET_MEMBER_ID = 'SACCO_INSTALLMENT.SET_MEMBER_ID';
const SET_LOAN_ID = 'SACCO_INSTALLMENT.SET_LOAN_ID';
const SET_AMOUNT = 'SACCO_INSTALLMENT.SET_AMOUNT';
const SET_DATE = 'SACCO_INSTALLMENT.SET_DATE';
const SET_RECEIPT_NUMBER = 'SACCO_INSTALLMENT.SET_RECEIPT_NUMBER';
const SET_IS_SAVING = 'SACCO_INSTALLMENT.SET_IS_SAVING';
const SET_ERRORS = 'SACCO_INSTALLMENT.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setInstallmentAction = (installment: Installment) => ({
    type: SET_INSTALLMENT,
    value: installment,
});

const setMemberIdAction = (memberId: number) => ({
    type: SET_MEMBER_ID,
    value: memberId,
});

const setLoanIdAction = (loanId?: number) => ({
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

const setInstallment = (installment: Installment): AppThunkAction<Action> => (dispatch) => {
    dispatch(setInstallmentAction(installment));
    dispatch(loadLoans(installment.memberId));
};

const prefillInstallment = (loanId?: number, memberId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());
    const backupUrl = '/sacco/installment/add';

    const setInstallmentWithDate = (installment: Installment) => {
        dispatch(setInstallment({
            ...installment,
            date: new Date(),
        }))
    };

    if (loanId) {
        get<Loan>(`api/sacco/loan/${loanId}`, backupUrl)
            .then(loan => {
                setInstallmentWithDate({
                    loanId,
                    memberId: loan.memberId,
                });
            });
    } else if (memberId) {
        get<Loan>(`api/sacco/member/${memberId}`, backupUrl)
            .then(() => {
                setInstallmentWithDate({
                    memberId,
                });
            });
    } else {
        setInstallmentWithDate({});
    }
};

const loadInstallment = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Installment>(`api/sacco/installment/${id}`, '/sacco/installment')
        .then(installment => {
            dispatch(setInstallmentAction(installment));
        });
};

const saveInstallment = (installment: Installment, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const installmentToSend = {
        ...installment,
        date: formattedDate(installment.date),
    }

    const action = installment.id ? 'edit' : 'add';

    post<InstallmentToSend>(`api/sacco/installment/${action}`, installmentToSend)
        .then(response => {
            if (response.ok) {
                history.push('/sacco/installment');
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

const setLoanId = (loanId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setLoanIdAction(loanId));
}

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
    prefillInstallment,
    loadInstallment,
    saveInstallment,
    setLoanId,
    setMemberId,
    setAmount,
    setDate,
    setReceiptNumber,
};

export interface State {
    isLoading: boolean;
    installment: Installment;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    installment: {},
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
        case SET_INSTALLMENT:
            return {
                ...state,
                installment: action.value,
                errors: {},
                isLoading: false,
                hasBeenChanged: false,
            };
        case SET_MEMBER_ID:
            return {
                ...state,
                installment: {
                    ...state.installment,
                    memberId: action.value,
                },
                hasBeenChanged: true,
            };
         case SET_LOAN_ID:
            return {
                ...state,
                installment: {
                    ...state.installment,
                    loanId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_AMOUNT:
            return {
                ...state,
                installment: {
                    ...state.installment,
                    amount: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_DATE:
            return {
                ...state,
                installment: {
                    ...state.installment,
                    date: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_RECEIPT_NUMBER:
            return {
                ...state,
                installment: {
                    ...state.installment,
                    receiptNumber: action.value,
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