import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Payment } from '../../models/payment';
import { History } from 'history';
import { Congregation } from '../../models/congregation';
import { loadCongregations, loadParishes } from '../shared';
import { Parish } from '../../models/parish';
import { Archdeaconry } from '../../models/archdeaconry';

const SET_IS_LOADING = 'PAYMENT.SET_IS_LOADING';
const SET_PAYMENT = 'PAYMENT.SET_PAYMENT';
const SET_ARCHDEACONRY_ID = 'EVENT.SET_ARCHDEACONRY_ID';
const SET_PARISH_ID = 'EVENT.SET_PARISH_ID';
const SET_CONGREGATION_ID = 'PAYMENT.SET_CONGREGATION_ID';
const SET_AMOUNT = 'PAYMENT.SET_AMOUNT';
const SET_DATE = 'PAYMENT.SET_DATE';
const SET_IS_SAVING = 'PAYMENT.SET_IS_SAVING';
const SET_ERRORS = 'PAYMENT.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setPaymentAction = (payment: Payment) => ({
    type: SET_PAYMENT,
    value: payment,
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

const setAmountAction = (amount: number) => ({
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

const prefillPayment = (congregationId?: number, parishId?: number, archdeaconryId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    const date = new Date();

    if (congregationId) {
        get<Congregation>(`api/congregation/${congregationId}`)
            .then(congregation => {
                dispatch(setPayment({
                    date,
                    congregationId: congregation.id,
                    parishId: congregation.parishId,
                    archdeaconryId: congregation.archdeaconryId,
                }));
            });
    } else if (parishId) {
        get<Parish>(`api/parish/${parishId}`)
            .then(parish => {
                dispatch(setPayment({
                    date,
                    parishId: parish.id,
                    archdeaconryId: parish.archdeaconryId,
                }));
            });
    } else if (archdeaconryId) {
        get<Archdeaconry>(`api/archdeaconry/${archdeaconryId}`)
            .then(archdeaconry => {
                dispatch(setPayment({
                    date,
                    archdeaconryId: archdeaconry.id,
                }));
            });
    } else {
        dispatch(setPayment({
            date,
        }));
    }
};

const setPayment = (payment: Payment): AppThunkAction<Action> => (dispatch) => {
    dispatch(setPaymentAction(payment));
    dispatch(loadParishes(payment.archdeaconryId));
    dispatch(loadCongregations(payment.parishId));
}

const loadPayment = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Payment>(`api/payment/${id}`)
        .then(payment => {
            dispatch(setPayment(payment));
        });
};

const savePayment = (payment: Payment, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const action = payment.id ? 'edit' : 'add';

    post<Payment>(`api/payment/${action}`, payment)
        .then(response => {
            if (response.ok) {
                history.push('/payment');
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
    dispatch(setAmountAction(amount));
};

const setDate = (date: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDateAction(date));
};

export const actionCreators = {
    prefillPayment,
    loadPayment,
    savePayment,
    setArchdeaconryId,
    setParishId,
    setCongregationId,
    setAmount,
    setDate,
};

export interface State {
    isLoading: boolean;
    congregationsLoading: boolean;
    congregations: Congregation[];
    payment: Payment;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    payment: {},
    congregations: [],
    isLoading: true,
    congregationsLoading: true,
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
        case SET_ARCHDEACONRY_ID:
            return {
                ...state,
                payment: {
                    ...state.payment,
                    archdeaconryId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_PARISH_ID:
            return {
                ...state,
                payment: {
                    ...state.payment,
                    parishId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_CONGREGATION_ID:
            return {
                ...state,
                payment: {
                    ...state.payment,
                    congregationId: action.value,
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