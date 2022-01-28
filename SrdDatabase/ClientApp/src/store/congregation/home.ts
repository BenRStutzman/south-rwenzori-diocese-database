import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { Archdeaconry } from '../../models/archdeaconry';
import { CongregationParameters, CongregationResults } from '../../models/congregation';
import { Parish } from '../../models/parish';
import { PagedParameters, pagedResultsDefaults } from '../../models/shared';
import { loadParishes } from '../shared';

const SET_SEARCH_NAME = 'CONGREGATION.SET_SEARCH_NAME';
const SET_SEARCH_ARCHDEACONRY_ID = 'CONGREGATION.SET_SEARCH_ARCHDEACONRY_ID';
const SET_SEARCH_PARISH_ID = 'CONGREGATION.SET_SEARCH_PARISH_ID';
const SET_RESULTS_LOADING = 'CONGREGATION.SET_RESULTS_LOADING';
const SET_RESULTS = 'CONGREGATION.SET_RESULTS';
const SET_PARAMETERS = 'CONGREGATION.SET_PARAMETERS';

const setResultsLoadingAction = (showLoading: boolean = true) => ({
    type: SET_RESULTS_LOADING,
    value: showLoading,
});

const setResultsAction = (results: CongregationResults) => ({
    type: SET_RESULTS,
    value: results,
});

const setSearchNameAction = (name: string) => ({
    type: SET_SEARCH_NAME,
    value: name,
});

const setSearchArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_SEARCH_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const setSearchParishIdAction = (parishId?: number) => ({
    type: SET_SEARCH_PARISH_ID,
    value: parishId,
});

const setParametersAction = (parameters: CongregationParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const prefillParameters = (parishId?: number, archdeaconryId?: number, search: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const getParameters = new Promise<CongregationParameters>((resolve) => {
        if (parishId) {
            get<Parish>(`api/parish/${parishId}`)
                .then(parish => {
                    resolve({
                        parishId,
                        archdeaconryId: parish.archdeaconryId,
                    });
                });
        } else {
            resolve({
                archdeaconryId,
            });
        }
    });

    getParameters.then(parameters => {
        dispatch(setParameters(parameters));

        if (search) {
            dispatch(searchCongregations(parameters));
        }
    });
};

const setParameters = (parameters: CongregationParameters): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParametersAction(parameters));
    dispatch(loadParishes(parameters.archdeaconryId));
}

const setSearchName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchNameAction(name));
};

const setSearchArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(loadParishes(archdeaconryId));
    dispatch(setSearchArchdeaconryIdAction(archdeaconryId));
    dispatch(setSearchParishId(undefined));
};

const setSearchParishId = (parishId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchParishIdAction(parishId));
};

const searchCongregations = (
    parameters: CongregationParameters = {},
    pageNumber: number = 0,
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    dispatch(setResultsLoadingAction(showLoading));

    post<CongregationParameters & PagedParameters>('api/congregation/search', { ...parameters, pageNumber })
        .then(response => response.json() as Promise<CongregationResults>)
        .then(results => {
            dispatch(setResultsAction(results));
        });
};

export const actionCreators = {
    searchCongregations,
    prefillParameters,
    setSearchName,
    setSearchArchdeaconryId,
    setSearchParishId,
};

export interface State {
    resultsLoading: boolean;
    results: CongregationResults;
    parameters: CongregationParameters;
}

const initialState: State = {
    results: { ...pagedResultsDefaults, congregations: [] },
    resultsLoading: true,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_PARAMETERS:
            return {
                ...state,
                parameters: action.value,
            };
        case SET_SEARCH_NAME:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    name: action.value,
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
        case SET_SEARCH_PARISH_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    parishId: action.value,
                }
            };
        case SET_RESULTS_LOADING:
            return {
                ...state,
                resultsLoading: action.value,
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