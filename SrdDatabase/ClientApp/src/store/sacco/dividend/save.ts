import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { ErrorResponse, Errors, get, post } from '../../../helpers/apiHelpers';
import { Dividend, DividendToSend } from '../../../models/sacco/dividend';
import { History } from 'history';
import { formattedDate } from '../../../helpers/miscellaneous';

const SET_IS_LOADING = 'SACCO_DIVIDEND.SET_IS_LOADING';
const SET_DIVIDEND = 'SACCO_DIVIDEND.SET_DIVIDEND';
const SET_PERCENTAGE = 'SACCO_DIVIDEND.SET_PERCENTAGE';
const SET_DATE = 'SACCO_DIVIDEND.SET_DATE';
const SET_IS_SAVING = 'SACCO_DIVIDEND.SET_IS_SAVING';
const SET_ERRORS = 'SACCO_DIVIDEND.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setDividendAction = (dividend: Dividend) => ({
    type: SET_DIVIDEND,
    value: dividend,
});

const setPercentageAction = (percentage: number) => ({
    type: SET_PERCENTAGE,
    value: percentage,
});

const setDateAction = (date?: Date) => ({
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

const prefillDividend = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    dispatch(setDividendAction({
        date: new Date(),
    }));
};

const loadDividend = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Dividend>(`api/sacco/dividend/${id}`, '/sacco/dividend')
        .then(dividend => {
            dispatch(setDividendAction(dividend));
        });
};

const saveDividend = (dividend: Dividend, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const dividendToSend = {
        ...dividend,
        date: formattedDate(dividend.date),
    }

    const action = dividend.id ? 'edit' : 'add';

    post<DividendToSend>(`api/sacco/dividend/${action}`, dividendToSend)
        .then(response => {
            if (response.ok) {
                history.push('/sacco/dividend');
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

const setPercentage = (percentage: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setPercentageAction(percentage));
};

const setDate = (date?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDateAction(date));
};

export const actionCreators = {
    prefillDividend,
    loadDividend,
    saveDividend,
    setPercentage,
    setDate,
};

export interface State {
    isLoading: boolean;
    dividend: Dividend;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    dividend: {},
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
        case SET_DIVIDEND:
            return {
                ...state,
                dividend: action.value,
                errors: {},
                isLoading: false,
                hasBeenChanged: false,
            };
        case SET_PERCENTAGE:
            return {
                ...state,
                dividend: {
                    ...state.dividend,
                    percentage: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_DATE:
            return {
                ...state,
                dividend: {
                    ...state.dividend,
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