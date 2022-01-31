import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { Archdeaconry } from '../../models/archdeaconry';
import { ParishParameters, ParishResults } from '../../models/parish';
import { PagedParameters, pagedResultsDefaults } from '../../models/shared';

const SET_RESULTS_LOADING = 'PARISH.SET_RESULTS_LOADING';
const SET_RESULTS = 'PARISH.SET_RESULTS';
const SET_SEARCH_NAME = 'PARISH.SET_SEARCH_NAME';
const SET_SEARCH_ARCHDEACONRY_ID = 'PARISH.SET_SEARCH_ARCHDEACONRY_ID';
const SET_PARAMETERS = 'PARISH.SET_PARAMETERS';

const setResultsLoadingAction = (showLoading: boolean = true) => ({
    type: SET_RESULTS_LOADING,
    value: showLoading,
});

const setResultsAction = (results: ParishResults) => ({
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

const setParametersAction = (parameters: ParishParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const prefillParameters = (archdeaconryId?: number, search: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const backupUrl = '/parish';

    const setParametersAndSearch = (parameters: ParishParameters) => {
        dispatch(setParameters(parameters));

        if (search) {
            dispatch(searchParishes(parameters));
        }
    };

    if (archdeaconryId) {
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

const setParameters = (parameters: ParishParameters): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParametersAction(parameters));
}

export const setSearchName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchNameAction(name));
}

export const setSearchArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchArchdeaconryIdAction(archdeaconryId));
};

const searchParishes = (
    parameters: ParishParameters = {},
    pageNumber: number = 0,
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    dispatch(setResultsLoadingAction(showLoading));

    post<ParishParameters & PagedParameters>('api/parish/search', { ...parameters, pageNumber })
        .then(response => response.json() as Promise<ParishResults>)
        .then(results => {
            dispatch(setResultsAction(results));
        });
};

export const actionCreators = {
    searchParishes,
    setSearchName,
    setSearchArchdeaconryId,
    prefillParameters,
};

export interface State {
    resultsLoading: boolean;
    results: ParishResults;
    parameters: ParishParameters;
}

const initialState: State = {
    results: { ...pagedResultsDefaults, parishes: [] },
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
        default:
            return state;
    }
};
