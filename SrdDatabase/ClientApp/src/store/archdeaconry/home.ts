import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { ArchdeaconryParameters } from '../../models/archdeaconry';
import { ArchdeaconryResults } from '../../models/archdeaconry';
import { pagedResultsDefaults, SearchRequest } from '../../models/shared';

const REQUEST_RESULTS = 'ARCHDEACONRY.REQUEST_RESULTS';
const RECEIVE_RESULTS = 'ARCHDEACONRY.RECEIVE_RESULTS';
const SET_SEARCH_NAME = 'ARCHDEACONRY.SET_SEARCH_NAME';
const RESET_PARAMETERS = 'ARCHDEACONRY.RESET_PARAMETERS';

const requestResultsAction = (showLoading: boolean = true) => ({
    type: REQUEST_RESULTS,
    value: showLoading,
});

const receiveResultsAction = (results: ArchdeaconryResults) => ({
    type: RECEIVE_RESULTS,
    value: results,
});

const setSearchNameAction = (name: string) => ({
    type: SET_SEARCH_NAME,
    value: name,
});

const resetParametersAction = () => ({
    type: RESET_PARAMETERS,
});

const resetParameters = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetParametersAction());
};

const setSearchName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchNameAction(name));
};

const searchArchdeaconries = (
    parameters: ArchdeaconryParameters = {},
    pageNumber: number = 0,
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestResultsAction(showLoading));

    post<SearchRequest>('api/archdeaconry/search', { parameters, pageNumber })
        .then(response => response.json() as Promise<ArchdeaconryResults>)
        .then(results => {
            dispatch(receiveResultsAction(results));
        });
};

export const actionCreators = {
    searchArchdeaconries,
    setSearchName,
    resetParameters,
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
        case RESET_PARAMETERS:
            return {
                ...state,
                parameters: initialState.parameters,
            };
        case REQUEST_RESULTS:
            return {
                ...state,
                resultsLoading: action.value,
            };
        case RECEIVE_RESULTS:
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