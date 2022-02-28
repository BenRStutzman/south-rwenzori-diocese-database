import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { Archdeaconry } from '../../models/archdeaconry';
import { QuotaParameters, QuotaResults } from '../../models/quota';
import { Congregation } from '../../models/congregation';
import { Parish } from '../../models/parish';
import { pagedResultsDefaults } from '../../models/shared';
import { loadCongregations, loadParishes } from '../shared';

const SET_PARAMETERS = 'QUOTA.SET_PARAMETERS';
const SET_SEARCH_START_YEAR = 'QUOTA.SET_SEARCH_START_YEAR';
const SET_SEARCH_END_YEAR = 'QUOTA.SET_SEARCH_END_YEAR';
const SET_SEARCH_ARCHDEACONRY_ID = 'QUOTA.SET_SEARCH_ARCHDEACONRY_ID';
const SET_SEARCH_PARISH_ID = 'QUOTA.SET_SEARCH_PARISH_ID';
const SET_SEARCH_CONGREGATION_ID = 'QUOTA.SET_SEARCH_CONGREGATION_ID';
const SET_RESULTS_LOADING = 'QUOTA.SET_RESULTS_LOADING';
const SET_RESULTS = 'QUOTA.SET_RESULTS';

const setResultsLoadingAction = () => ({
    type: SET_RESULTS_LOADING,
});

const setResultsAction = (results: QuotaResults) => ({
    type: SET_RESULTS,
    value: results,
});

const setSearchStartYearAction = (startYear: number) => ({
    type: SET_SEARCH_START_YEAR,
    value: startYear,
});

const setSearchEndYearAction = (endYear: number) => ({
    type: SET_SEARCH_END_YEAR,
    value: endYear,
});

const setSearchArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_SEARCH_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const setSearchParishIdAction = (parishId?: number) => ({
    type: SET_SEARCH_PARISH_ID,
    value: parishId,
});

const setSearchCongregationIdAction = (congregationId?: number) => ({
    type: SET_SEARCH_CONGREGATION_ID,
    value: congregationId,
});

const setParametersAction = (parameters: QuotaParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const setParameters = (parameters: QuotaParameters): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParametersAction(parameters));
    dispatch(loadParishes(parameters.archdeaconryId));
    dispatch(loadCongregations(parameters.parishId));
}

const prefillParameters = (congregationId?: number, parishId?: number, archdeaconryId?: number, search: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const backupUrl = '/quota';

    const setParametersAndSearch = (parameters: QuotaParameters) => {
        dispatch(setParameters(parameters));

        if (search) {
            dispatch(searchQuotas(parameters));
        }
    };

    if (congregationId) {
        get<Congregation>(`api/congregation/${congregationId}`, backupUrl)
            .then(congregation => {
                setParametersAndSearch({
                    congregationId,
                    parishId: congregation.parishId,
                    archdeaconryId: congregation.archdeaconryId,
                });
            });
    } else if (parishId) {
        get<Parish>(`api/parish/${parishId}`, backupUrl)
            .then(parish => {
                setParametersAndSearch({
                    parishId,
                    archdeaconryId: parish.archdeaconryId,
                });
            });
    } else if (archdeaconryId) {
        get<Archdeaconry>(`api/archdeaconry/${archdeaconryId}`, backupUrl)
            .then(() => {
                setParametersAndSearch({
                    archdeaconryId,
                });
            });
    } else {
        setParametersAndSearch({});
    }  
};

const setSearchStartYear = (startYear: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchStartYearAction(startYear));
};

const setSearchEndYear = (endYear: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchEndYearAction(endYear));
};

const setSearchArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchArchdeaconryIdAction(archdeaconryId));
    dispatch(loadParishes(archdeaconryId));
    dispatch(setSearchParishId(undefined));
};

const setSearchParishId = (parishId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchParishIdAction(parishId));
    dispatch(loadCongregations(parishId));
    dispatch(setSearchCongregationId(undefined));
};

const setSearchCongregationId = (congregationId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchCongregationIdAction(congregationId));
};

const searchQuotas = (
    parameters: QuotaParameters = {},
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    if (showLoading) {
        dispatch(setResultsLoadingAction());
    }

    dispatch(setParametersAction(parameters));

    post<QuotaParameters>('api/quota/search', parameters)
        .then(response => response.json() as Promise<QuotaResults>)
        .then(results => {
            dispatch(setResultsAction(results));
        });
};

export const actionCreators = {
    searchQuotas,
    setSearchParishId,
    setSearchCongregationId,
    setSearchArchdeaconryId,
    setSearchStartYear,
    setSearchEndYear,
    prefillParameters,
};

export interface State {
    resultsLoading: boolean;
    results: QuotaResults;
    parameters: QuotaParameters,
}

const initialState: State = {
    results: { ...pagedResultsDefaults, quotas: [] },
    resultsLoading: true,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_SEARCH_CONGREGATION_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    congregationId: action.value,
                }
            };
        case SET_SEARCH_PARISH_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    parishId: action.value,
                }
            };
        case SET_SEARCH_ARCHDEACONRY_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    archdeaconryId: action.value,
                }
            };
        case SET_SEARCH_START_YEAR:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    startYear: action.value,
                }
            };
        case SET_SEARCH_END_YEAR:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    endYear: action.value,
                }
            };
        case SET_PARAMETERS:
            return {
                ...state,
                parameters: action.value,
            };
        case SET_RESULTS_LOADING:
            return {
                ...state,
                resultsLoading: true,
            };
        case SET_RESULTS:
            return {
                ...state,
                results: action.value,
                resultsLoading: false,
            };
        default:
            return state;
    }
};