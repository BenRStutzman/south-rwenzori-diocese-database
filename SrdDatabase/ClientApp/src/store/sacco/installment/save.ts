import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { ErrorResponse, Errors, get, post } from '../../../helpers/apiHelpers';
import { Installment, InstallmentToSend } from '../../../models/sacco/installment';
import { History } from 'history';
import { formattedDate } from '../../../helpers/miscellaneous';

const SET_IS_LOADING = 'SACCO_INSTALLMENT.SET_IS_LOADING';
const SET_INSTALLMENT = 'SACCO_INSTALLMENT.SET_INSTALLMENT';
const SET_DATE_PAID = 'SACCO_INSTALLMENT.SET_DATE_PAID';
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

const setDatePaidAction = (datePaid?: Date) => ({
    type: SET_DATE_PAID,
    value: datePaid,
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
};

const prefillInstallment = () : AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());
    dispatch(setInstallment({ datePaid: new Date() }))
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
        datePaid: formattedDate(installment.dateDue),
    }

    post<InstallmentToSend>(`api/sacco/installment/edit`, installmentToSend)
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

const setDatePaid = (datePaid?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDatePaidAction(datePaid));
};

const setReceiptNumber = (receiptNumber?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setReceiptNumberAction(receiptNumber));
};

export const actionCreators = {
    prefillInstallment,
    loadInstallment,
    saveInstallment,
    setDatePaid,
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
        case SET_DATE_PAID:
            return {
                ...state,
                installment: {
                    ...state.installment,
                    datePaid: action.value,
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