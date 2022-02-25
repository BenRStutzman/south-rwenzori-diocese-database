import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { Archdeaconry } from '../../models/archdeaconry';
import { Congregation } from '../../models/congregation';
import { CensusParameters, CensusResults } from '../../models/census';
import { Parish } from '../../models/parish';
import { pagedResultsDefaults } from '../../models/shared';
import { loadCongregations, loadParishes } from '../shared';

const SET_PARAMETERS = 'CENSUS.SET_PARAMETERS';
const SET_SEARCH_START_DATE = 'CENSUS.SET_SEARCH_START_DATE';
const SET_SEARCH_END_DATE = 'CENSUS.SET_SEARCH_END_DATE';
const SET_SEARCH_ARCHDEACONRY_ID = 'CENSUS.SET_SEARCH_ARCHDEACONRY_ID';
const SET_SEARCH_PARISH_ID = 'CENSUS.SET_SEARCH_PARISH_ID';
const SET_SEARCH_CONGREGATION_ID = 'CENSUS.SET_SEARCH_CONGREGATION_ID';
const SET_RESULTS_LOADING = 'CENSUS.SET_RESULTS_LOADING';
const SET_RESULTS = 'CENSUS.SET_RESULTS';

const setResultsLoadingAction = () => ({
    type: SET_RESULTS_LOADING,
});

const setResultsAction = (results: CensusResults) => ({
    type: SET_RESULTS,
    value: results,
});

const setSearchStartDateAction = (startDate: Date) => ({
    type: SET_SEARCH_START_DATE,
    value: startDate,
});

const setSearchEndDateAction = (endDate: Date) => ({
    type: SET_SEARCH_END_DATE,
    value: endDate,
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

const setParametersAction = (parameters: CensusParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const setParameters = (parameters: CensusParameters): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParametersAction(parameters));
    dispatch(loadParishes(parameters.archdeaconryId));
    dispatch(loadCongregations(parameters.parishId));
};

const prefillParameters = (congregationId?: number, parishId?: number, archdeaconryId?: number, search: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const backupUrl = '/census';

    const setParametersAndSearch = (parameters: CensusParameters) => {
        dispatch(setParameters(parameters));

        if (search) {
            dispatch(searchCensuss(parameters));
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

const setSearchStartDate = (startDate: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchStartDateAction(startDate));
};

const setSearchEndDate = (endDate: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchEndDateAction(endDate));
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

const searchCensuss = (
    parameters: CensusParameters = {},
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    if (showLoading) {
        dispatch(setResultsLoadingAction());
    }

    dispatch(setParametersAction(parameters));

    post<CensusParameters>('api/census/search', parameters)
        .then(response => response.json() as Promise<CensusResults>)
        .then(results => {
            dispatch(setResultsAction(results));
        });
};

export const actionCreators = {
    searchCensuss,
    setSearchParishId,
    setSearchCongregationId,
    setSearchArchdeaconryId,
    setSearchStartDate,
    setSearchEndDate,
    prefillParameters,
};

export interface State {
    resultsLoading: boolean;
    results: CensusResults;
    parameters: CensusParameters,
}

const initialState: State = {
    results: { ...pagedResultsDefaults, censuses: [] },
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
        case SET_SEARCH_START_DATE:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    startDate: action.value,
                }
            };
        case SET_SEARCH_END_DATE:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    endDate: action.value,
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