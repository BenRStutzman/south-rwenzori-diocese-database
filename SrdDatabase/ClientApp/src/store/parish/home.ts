import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { ParishParameters, ParishResults } from '../../models/parish';
import { PagedParameters, pagedResultsDefaults } from '../../models/shared';

const REQUEST_RESULTS = 'PARISH.REQUEST_RESULTS';
const RECEIVE_RESULTS = 'PARISH.RECEIVE_RESULTS';
const SET_SEARCH_NAME = 'PARISH.SET_SEARCH_NAME';
const SET_SEARCH_ARCHDEACONRY_ID = 'PARISH.SET_SEARCH_ARCHDEACONRY_ID';
const SET_PARAMETERS = 'PARISH.SET_PARAMETERS';

const requestResultsAction = (showLoading: boolean = true) => ({
    type: REQUEST_RESULTS,
    value: showLoading,
});

const receiveResultsAction = (results: ParishResults) => ({
    type: RECEIVE_RESULTS,
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

const setParameters = (archdeaconryId?: number, search: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const parameters = { archdeaconryId };

    dispatch(setParametersAction(parameters));

    if (search) {
        dispatch(searchParishes(parameters));
    }
};

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
    dispatch(requestResultsAction(showLoading));

    post<ParishParameters & PagedParameters>('api/parish/search', { ...parameters, pageNumber })
        .then(response => response.json() as Promise<ParishResults>)
        .then(results => {
            dispatch(receiveResultsAction(results));
        });
};

export const actionCreators = {
    searchParishes,
    setSearchName,
    setSearchArchdeaconryId,
    setParameters,
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
