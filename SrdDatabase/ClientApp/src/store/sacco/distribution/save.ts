import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { ErrorResponse, Errors, get, post } from '../../../helpers/apiHelpers';
import { Distribution, DistributionToSend } from '../../../models/sacco/distribution';
import { History } from 'history';
import { formattedDate } from '../../../helpers/miscellaneous';

const SET_IS_LOADING = 'SACCO_DISTRIBUTION.SET_IS_LOADING';
const SET_DISTRIBUTION = 'SACCO_DISTRIBUTION.SET_DISTRIBUTION';
const SET_PERCENTAGE = 'SACCO_DISTRIBUTION.SET_PERCENTAGE';
const SET_DATE = 'SACCO_DISTRIBUTION.SET_DATE';
const SET_IS_SAVING = 'SACCO_DISTRIBUTION.SET_IS_SAVING';
const SET_ERRORS = 'SACCO_DISTRIBUTION.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setDistributionAction = (distribution: Distribution) => ({
    type: SET_DISTRIBUTION,
    value: distribution,
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

const prefillDistribution = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    dispatch(setDistributionAction({
        date: new Date(),
    }));
};

const loadDistribution = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Distribution>(`api/sacco/distribution/${id}`, '/sacco/distribution')
        .then(distribution => {
            dispatch(setDistributionAction(distribution));
        });
};

const saveDistribution = (distribution: Distribution, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const distributionToSend = {
        ...distribution,
        date: formattedDate(distribution.date),
    }

    const action = distribution.id ? 'edit' : 'add';

    post<DistributionToSend>(`api/sacco/distribution/${action}`, distributionToSend)
        .then(response => {
            if (response.ok) {
                history.push('/sacco/distribution');
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
    prefillDistribution,
    loadDistribution,
    saveDistribution,
    setPercentage,
    setDate,
};

export interface State {
    isLoading: boolean;
    distribution: Distribution;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    distribution: {},
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
        case SET_DISTRIBUTION:
            return {
                ...state,
                distribution: action.value,
                errors: {},
                isLoading: false,
                hasBeenChanged: false,
            };
        case SET_PERCENTAGE:
            return {
                ...state,
                distribution: {
                    ...state.distribution,
                    dividendPercentage: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_DATE:
            return {
                ...state,
                distribution: {
                    ...state.distribution,
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