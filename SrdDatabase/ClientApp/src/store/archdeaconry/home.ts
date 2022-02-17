import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { ArchdeaconryParameters } from '../../models/archdeaconry';
import { ArchdeaconryResults } from '../../models/archdeaconry';
import { pagedResultsDefaults } from '../../models/shared';

const SET_RESULTS_LOADING = 'ARCHDEACONRY.SET_RESULTS_LOADING';
const SET_RESULTS = 'ARCHDEACONRY.SET_RESULTS';
const SET_SEARCH_NAME = 'ARCHDEACONRY.SET_SEARCH_NAME';
const SET_PARAMETERS = 'ARCHDEACONRY.SET_PARAMETERS';

const setResultsLoadingAction = () => ({
    type: SET_RESULTS_LOADING,
});

const setResultsAction = (results: ArchdeaconryResults) => ({
    type: SET_RESULTS,
    value: results,
});

const setSearchNameAction = (name: string) => ({
    type: SET_SEARCH_NAME,
    value: name,
});

const setParametersAction = (parameters: ArchdeaconryParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const setParameters = (parameters: ArchdeaconryParameters): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParametersAction(parameters));
};

const prefillParameters = (search: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const parameters = {};

    dispatch(setParameters(parameters));

    if (search) {
        dispatch(searchArchdeaconries(parameters));
    }
};

const searchArchdeaconries = (
    parameters: ArchdeaconryParameters = {},
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    if (showLoading) {
        dispatch(setResultsLoadingAction());
    }

    dispatch(setParametersAction(parameters));

    post<ArchdeaconryParameters>('api/archdeaconry/search', parameters)
        .then(response => response.json() as Promise<ArchdeaconryResults>)
        .then(results => {
            dispatch(setResultsAction(results));
        });
};

const setSearchName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchNameAction(name));
};

export const actionCreators = {
    searchArchdeaconries,
    setSearchName,
    prefillParameters,
};

export interface State {
    results: ArchdeaconryResults
    resultsLoading: boolean;
    parameters: ArchdeaconryParameters;
}

const initialState: State = {
    results: { ...pagedResultsDefaults, archdeaconries: [] },
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
                resultsLoading: true,
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
        default:
            return state;
    }
};