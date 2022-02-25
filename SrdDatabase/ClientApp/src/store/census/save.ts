import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Census } from '../../models/census';
import { History } from 'history';
import { Congregation } from '../../models/congregation';
import { loadCongregations, loadParishes } from '../shared';
import { Parish } from '../../models/parish';
import { Archdeaconry } from '../../models/archdeaconry';

const SET_IS_LOADING = 'CENSUS.SET_IS_LOADING';
const SET_CENSUS = 'CENSUS.SET_CENSUS';
const SET_CENSUS_TYPE_ID = 'CENSUS.SET_CENSUS_TYPE_ID';
const SET_ARCHDEACONRY_ID = 'CENSUS.SET_ARCHDEACONRY_ID';
const SET_PARISH_ID = 'CENSUS.SET_PARISH_ID';
const SET_CONGREGATION_ID = 'CENSUS.SET_CONGREGATION_ID';
const SET_NUMBER_OF_CHRISTIANS = 'CENSUS.SET_NUMBER_OF_CHRISTIANS';
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

const setNumberOfChristiansAction = (numberOfChristians: number) => ({
    type: SET_NUMBER_OF_CHRISTIANS,
    value: numberOfChristians,
})

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

    get<Census>(`api/census/${id}`)
        .then(census => {
            dispatch(setCensus(census));
        });
};

const saveCensus = (census: Census, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const action = census.id ? 'edit' : 'add';

    post<Census>(`api/census/${action}`, census)
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

const setNumberOfChristians = (numberOfChristians: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setNumberOfChristiansAction(numberOfChristians));
};

const setDate = (date: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDateAction(date));
};

export const actionCreators = {
    prefillCensus,
    loadCensus,
    saveCensus,
    setCongregationId,
    setParishId,
    setArchdeaconryId,
    setNumberOfChristians,
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
        case SET_NUMBER_OF_CHRISTIANS:
            return {
                ...state,
                census: {
                    ...state.census,
                    numberOfChristians: action.value,
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