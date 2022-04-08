import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Census, CensusToSend } from '../../models/census';
import { History } from 'history';
import { Congregation } from '../../models/congregation';
import { loadCongregations, loadParishes } from '../shared';
import { Parish } from '../../models/parish';
import { Archdeaconry } from '../../models/archdeaconry';
import { formattedDate } from '../../helpers/miscellaneous';

const SET_IS_LOADING = 'CENSUS.SET_IS_LOADING';
const SET_CENSUS = 'CENSUS.SET_CENSUS';
const SET_ARCHDEACONRY_ID = 'CENSUS.SET_ARCHDEACONRY_ID';
const SET_PARISH_ID = 'CENSUS.SET_PARISH_ID';
const SET_CONGREGATION_ID = 'CENSUS.SET_CONGREGATION_ID';
const SET_MALES_0_TO_12 = 'CENSUS.SET_MALES_0_TO_12';
const SET_FEMALES_0_TO_12 = 'CENSUS.SET_FEMALES_0_TO_12';
const SET_MALES_13_TO_17 = 'CENSUS.SET_MALES_13_TO_17';
const SET_FEMALES_13_TO_17 = 'CENSUS.SET_FEMALES_13_TO_17';
const SET_MALES_18_TO_35 = 'CENSUS.SET_MALES_18_TO_35';
const SET_FEMALES_18_TO_35 = 'CENSUS.SET_FEMALES_18_TO_35';
const SET_MALES_36_AND_ABOVE = 'CENSUS.SET_MALES_36_AND_ABOVE';
const SET_FEMALES_36_AND_ABOVE = 'CENSUS.SET_FEMALES_36_AND_ABOVE';
const SET_DATE = 'CENSUS.SET_DATE';
const SET_IS_SAVING = 'CENSUS.SET_IS_SAVING';
const SET_ERRORS = 'CENSUS.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setCensusAction = (census: Census) => ({
    type: SET_CENSUS,
    value: census,
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

const setMales0To12Action = (males0To12: number) => ({
    type: SET_MALES_0_TO_12,
    value: males0To12,
});

const setMales13To17Action = (males13To17: number) => ({
    type: SET_MALES_13_TO_17,
    value: males13To17,
});

const setMales18To35Action = (males18To35: number) => ({
    type: SET_MALES_18_TO_35,
    value: males18To35,
});

const setMales36AndAboveAction = (males36AndAbove: number) => ({
    type: SET_MALES_36_AND_ABOVE,
    value: males36AndAbove,
});

const setFemales0To12Action = (females0To12: number) => ({
    type: SET_FEMALES_0_TO_12,
    value: females0To12,
});

const setFemales13To17Action = (females13To17: number) => ({
    type: SET_FEMALES_13_TO_17,
    value: females13To17,
});

const setFemales18To35Action = (females18To35: number) => ({
    type: SET_FEMALES_18_TO_35,
    value: females18To35,
});

const setFemales36AndAboveAction = (females36AndAbove: number) => ({
    type: SET_FEMALES_36_AND_ABOVE,
    value: females36AndAbove,
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

const setCensus = (census: Census): AppThunkAction<Action> => (dispatch) => {
    dispatch(setCensusAction(census));
    dispatch(loadParishes(census.archdeaconryId));
    dispatch(loadCongregations(census.parishId));
};

const prefillCensus = (congregationId?: number, parishId?: number, archdeaconryId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());
    const backupUrl = '/census/add';

    const setCensusWithDate = (census: Census) => {
        dispatch(setCensus({
            ...census,
            date: new Date(),
        }))
    };

    if (congregationId) {
        get<Congregation>(`api/congregation/${congregationId}`, backupUrl)
            .then(congregation => {
                setCensusWithDate({
                    congregationId,
                    parishId: congregation.parishId,
                    archdeaconryId: congregation.archdeaconryId,
                });
            });
    } else if (parishId) {
        get<Parish>(`api/parish/${parishId}`, backupUrl)
            .then(parish => {
                setCensusWithDate({
                    parishId,
                    archdeaconryId: parish.archdeaconryId,
                });
            });
    } else if (archdeaconryId) {
        get<Archdeaconry>(`api/archdeaconry/${archdeaconryId}`, backupUrl)
            .then(() => {
                setCensusWithDate({
                    archdeaconryId,
                });
            });
    } else {
        setCensusWithDate({});
    }
};

const loadCensus = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Census>(`api/census/${id}`, '/census')
        .then(census => {
            dispatch(setCensus(census));
        });
};

const saveCensus = (census: Census, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const action = census.id ? 'edit' : 'add';

    const censusToSend = {
        ...census,
        date: formattedDate(census.date),
    };
    
    post<CensusToSend>(`api/census/${action}`, censusToSend)
        .then(response => {
            if (response.ok) {
                history.push('/census');
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

const setMales0To12 = (males0To12: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setMales0To12Action(males0To12));
};

const setMales13To17 = (males13To17: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setMales13To17Action(males13To17));
};

const setMales18To35 = (males18To35: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setMales18To35Action(males18To35));
};

const setMales36AndAbove = (males36AndAbove: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setMales36AndAboveAction(males36AndAbove));
};

const setFemales0To12 = (females0To12: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setFemales0To12Action(females0To12));
};

const setFemales13To17 = (females13To17: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setFemales13To17Action(females13To17));
};

const setFemales18To35 = (females18To35: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setFemales18To35Action(females18To35));
};

const setFemales36AndAbove = (females36AndAbove: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setFemales36AndAboveAction(females36AndAbove));
};

const setDate = (date?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDateAction(date));
};

export const actionCreators = {
    prefillCensus,
    loadCensus,
    saveCensus,
    setCongregationId,
    setParishId,
    setArchdeaconryId,
    setMales0To12,
    setMales13To17,
    setMales18To35,
    setMales36AndAbove,
    setFemales0To12,
    setFemales13To17,
    setFemales18To35,
    setFemales36AndAbove,
    setDate,
};

export interface State {
    isLoading: boolean;
    congregationsLoading: boolean;
    congregations: Congregation[];
    census: Census;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    census: {},
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
        case SET_CENSUS:
            return {
                ...state,
                census: action.value,
                errors: {},
                isLoading: false,
                hasBeenChanged: false,
            };
        case SET_MALES_0_TO_12:
            return {
                ...state,
                census: {
                    ...state.census,
                    males0To12: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_MALES_13_TO_17:
            return {
                ...state,
                census: {
                    ...state.census,
                    males13To17: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_MALES_18_TO_35:
            return {
                ...state,
                census: {
                    ...state.census,
                    males18To35: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_MALES_36_AND_ABOVE:
            return {
                ...state,
                census: {
                    ...state.census,
                    males36AndAbove: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_FEMALES_0_TO_12:
            return {
                ...state,
                census: {
                    ...state.census,
                    females0To12: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_FEMALES_13_TO_17:
            return {
                ...state,
                census: {
                    ...state.census,
                    females13To17: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_FEMALES_18_TO_35:
            return {
                ...state,
                census: {
                    ...state.census,
                    females18To35: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_FEMALES_36_AND_ABOVE:
            return {
                ...state,
                census: {
                    ...state.census,
                    females36AndAbove: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_ARCHDEACONRY_ID:
            return {
                ...state,
                census: {
                    ...state.census,
                    archdeaconryId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_PARISH_ID:
            return {
                ...state,
                census: {
                    ...state.census,
                    parishId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_CONGREGATION_ID:
            return {
                ...state,
                census: {
                    ...state.census,
                    congregationId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_DATE:
            return {
                ...state,
                census: {
                    ...state.census,
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