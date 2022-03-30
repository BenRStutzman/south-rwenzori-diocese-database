import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Quota } from '../../models/quota';
import { History } from 'history';
import { Congregation } from '../../models/congregation';
import { loadCongregations, loadParishes } from '../shared';
import { Parish } from '../../models/parish';
import { Archdeaconry } from '../../models/archdeaconry';

const SET_IS_LOADING = 'QUOTA.SET_IS_LOADING';
const SET_QUOTA = 'QUOTA.SET_QUOTA';
const SET_ARCHDEACONRY_ID = 'EVENT.SET_ARCHDEACONRY_ID';
const SET_PARISH_ID = 'EVENT.SET_PARISH_ID';
const SET_CONGREGATION_ID = 'QUOTA.SET_CONGREGATION_ID';
const SET_AMOUNT_PER_YEAR = 'QUOTA.SET_AMOUNT_PER_YEAR';
const SET_START_YEAR = 'QUOTA.SET_START_YEAR';
const SET_END_YEAR = 'QUOTA.SET_END_YEAR';
const SET_IS_SAVING = 'QUOTA.SET_IS_SAVING';
const SET_ERRORS = 'QUOTA.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setQuotaAction = (quota: Quota) => ({
    type: SET_QUOTA,
    value: quota,
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

const setAmountPerYearAction = (amount: number) => ({
    type: SET_AMOUNT_PER_YEAR,
    value: amount,
});

const setStartYearAction = (startYear: number) => ({
    type: SET_START_YEAR,
    value: startYear,
});

const setEndYearAction = (endYear?: number) => ({
    type: SET_END_YEAR,
    value: endYear,
});

const setIsSavingAction = (isSaving: boolean) => ({
    type: SET_IS_SAVING,
    value: isSaving,
});

const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
});

const setQuota = (quota: Quota): AppThunkAction<Action> => (dispatch) => {
    dispatch(setQuotaAction(quota));
    dispatch(loadParishes(quota.archdeaconryId));
    dispatch(loadCongregations(quota.parishId));
};

const prefillQuota = (congregationId?: number, parishId?: number, archdeaconryId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());
    const backupUrl = '/quota/add';

    const setQuotaWithYear = (quota: Quota) => {
        dispatch(setQuota({
            ...quota,
            startYear: (new Date()).getFullYear(),
        }))
    };

    if (congregationId) {
        get<Congregation>(`api/congregation/${congregationId}`, backupUrl)
            .then(congregation => {
                setQuotaWithYear({
                    congregationId,
                    parishId: congregation.parishId,
                    archdeaconryId: congregation.archdeaconryId,
                });
            });
    } else if (parishId) {
        get<Parish>(`api/parish/${parishId}`, backupUrl)
            .then(parish => {
                setQuotaWithYear({
                    parishId,
                    archdeaconryId: parish.archdeaconryId,
                });
            });
    } else if (archdeaconryId) {
        get<Archdeaconry>(`api/archdeaconry/${archdeaconryId}`, backupUrl)
            .then(() => {
                setQuotaWithYear({
                    archdeaconryId,
                });
            });
    } else {
        setQuotaWithYear({});
    }
};

const loadQuota = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Quota>(`api/quota/${id}`, '/quota')
        .then(quota => {
            dispatch(setQuota(quota));
        });
};

const saveQuota = (quota: Quota, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const action = quota.id ? 'edit' : 'add';

    post<Quota>(`api/quota/${action}`, quota)
        .then(response => {
            if (response.ok) {
                history.push('/quota');
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

const setAmountPerYear = (amount: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setAmountPerYearAction(amount));
};

const setStartYear = (startYear: number, endYear?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setStartYearAction(startYear));

    if (endYear && endYear < startYear) {
        dispatch(setEndYear(undefined));
    }
};

const setEndYear = (endYear?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setEndYearAction(endYear));
};

export const actionCreators = {
    prefillQuota,
    loadQuota,
    saveQuota,
    setArchdeaconryId,
    setParishId,
    setCongregationId,
    setAmountPerYear,
    setStartYear,
    setEndYear,
};

export interface State {
    isLoading: boolean;
    congregationsLoading: boolean;
    congregations: Congregation[];
    quota: Quota;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    quota: {},
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
        case SET_QUOTA:
            return {
                ...state,
                quota: action.value,
                errors: {},
                isLoading: false,
                hasBeenChanged: false,
            };
        case SET_ARCHDEACONRY_ID:
            return {
                ...state,
                quota: {
                    ...state.quota,
                    archdeaconryId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_PARISH_ID:
            return {
                ...state,
                quota: {
                    ...state.quota,
                    parishId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_CONGREGATION_ID:
            return {
                ...state,
                quota: {
                    ...state.quota,
                    congregationId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_AMOUNT_PER_YEAR:
            return {
                ...state,
                quota: {
                    ...state.quota,
                    amountPerYear: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_START_YEAR:
            return {
                ...state,
                quota: {
                    ...state.quota,
                    startYear: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_END_YEAR:
            return {
                ...state,
                quota: {
                    ...state.quota,
                    endYear: action.value,
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