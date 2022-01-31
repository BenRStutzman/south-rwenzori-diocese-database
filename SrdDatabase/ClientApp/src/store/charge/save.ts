import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Charge } from '../../models/charge';
import { History } from 'history';
import { Congregation } from '../../models/congregation';
import { loadCongregations, loadParishes } from '../shared';
import { Parish } from '../../models/parish';
import { Archdeaconry } from '../../models/archdeaconry';

const SET_IS_LOADING = 'CHARGE.SET_IS_LOADING';
const SET_CHARGE = 'CHARGE.SET_CHARGE';
const SET_ARCHDEACONRY_ID = 'EVENT.SET_ARCHDEACONRY_ID';
const SET_PARISH_ID = 'EVENT.SET_PARISH_ID';
const SET_CONGREGATION_ID = 'CHARGE.SET_CONGREGATION_ID';
const SET_AMOUNT_PER_YEAR = 'CHARGE.SET_AMOUNT_PER_YEAR';
const SET_START_YEAR = 'CHARGE.SET_START_YEAR';
const SET_END_YEAR = 'CHARGE.SET_END_YEAR';
const SET_IS_SAVING = 'CHARGE.SET_IS_SAVING';
const SET_ERRORS = 'CHARGE.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setChargeAction = (charge: Charge) => ({
    type: SET_CHARGE,
    value: charge,
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

const setCharge = (charge: Charge): AppThunkAction<Action> => (dispatch) => {
    dispatch(setChargeAction(charge));
    dispatch(loadParishes(charge.archdeaconryId));
    dispatch(loadCongregations(charge.parishId));
};

const prefillCharge = (congregationId?: number, parishId?: number, archdeaconryId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());
    const backupUrl = '/charge/add';

    const setChargeWithYear = (charge: Charge) => {
        dispatch(setCharge({
            ...charge,
            startYear: (new Date()).getFullYear(),
        }))
    };

    if (congregationId) {
        get<Congregation>(`api/congregation/${congregationId}`, backupUrl)
            .then(congregation => {
                setChargeWithYear({
                    congregationId,
                    parishId: congregation.parishId,
                    archdeaconryId: congregation.archdeaconryId,
                });
            });
    } else if (parishId) {
        get<Parish>(`api/parish/${parishId}`, backupUrl)
            .then(parish => {
                setChargeWithYear({
                    parishId,
                    archdeaconryId: parish.archdeaconryId,
                });
            });
    } else if (archdeaconryId) {
        get<Archdeaconry>(`api/archdeaconry/${archdeaconryId}`, backupUrl)
            .then(() => {
                setChargeWithYear({
                    archdeaconryId,
                });
            });
    } else {
        setChargeWithYear({});
    }
};

const loadCharge = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Charge>(`api/charge/${id}`)
        .then(charge => {
            dispatch(setCharge(charge));
        });
};

const saveCharge = (charge: Charge, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const action = charge.id ? 'edit' : 'add';

    post<Charge>(`api/charge/${action}`, charge)
        .then(response => {
            if (response.ok) {
                history.push('/charge');
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
    prefillCharge,
    loadCharge,
    saveCharge,
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
    charge: Charge;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    charge: {},
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
        case SET_CHARGE:
            return {
                ...state,
                charge: action.value,
                errors: {},
                isLoading: false,
                hasBeenChanged: false,
            };
        case SET_ARCHDEACONRY_ID:
            return {
                ...state,
                charge: {
                    ...state.charge,
                    archdeaconryId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_PARISH_ID:
            return {
                ...state,
                charge: {
                    ...state.charge,
                    parishId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_CONGREGATION_ID:
            return {
                ...state,
                charge: {
                    ...state.charge,
                    congregationId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_AMOUNT_PER_YEAR:
            return {
                ...state,
                charge: {
                    ...state.charge,
                    amountPerYear: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_START_YEAR:
            return {
                ...state,
                charge: {
                    ...state.charge,
                    startYear: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_END_YEAR:
            return {
                ...state,
                charge: {
                    ...state.charge,
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