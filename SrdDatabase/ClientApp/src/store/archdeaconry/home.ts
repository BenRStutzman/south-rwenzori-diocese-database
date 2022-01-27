import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { ArchdeaconryParameters } from '../../models/archdeaconry';
import { ArchdeaconryResults } from '../../models/archdeaconry';
import { PagedParameters, pagedResultsDefaults } from '../../models/shared';

const REQUEST_RESULTS = 'ARCHDEACONRY.REQUEST_RESULTS';
const RECEIVE_RESULTS = 'ARCHDEACONRY.RECEIVE_RESULTS';
const SET_SEARCH_NAME = 'ARCHDEACONRY.SET_SEARCH_NAME';
const SET_PARAMETERS = 'ARCHDEACONRY.SET_PARAMETERS';

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

const setParametersAction = (parameters: ArchdeaconryParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const setParameters = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParametersAction({}));
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

    post<ArchdeaconryParameters & PagedParameters>('api/archdeaconry/search', { ...parameters, pageNumber })
        .then(response => response.json() as Promise<ArchdeaconryResults>)
        .then(results => {
            dispatch(receiveResultsAction(results));
        });
};

export const actionCreators = {
    searchArchdeaconries,
    setSearchName,
    setParameters,
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