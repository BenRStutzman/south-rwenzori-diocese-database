import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { CongregationParameters, CongregationResults } from '../../models/congregation';
import { PagedParameters, pagedResultsDefaults } from '../../models/shared';
import { loadParishes } from '../shared';

const SET_SEARCH_NAME = 'CONGREGATION.SET_SEARCH_NAME';
const SET_SEARCH_ARCHDEACONRY_ID = 'CONGREGATION.SET_SEARCH_ARCHDEACONRY_ID';
const SET_SEARCH_PARISH_ID = 'CONGREGATION.SET_SEARCH_PARISH_ID';
const REQUEST_RESULTS = 'CONGREGATION.REQUEST_RESULTS';
const RECEIVE_RESULTS = 'CONGREGATION.RECEIVE_RESULTS';
const SET_PARAMETERS = 'CONGREGATION.SET_PARAMETERS';

const requestResultsAction = (showLoading: boolean = true) => ({
    type: REQUEST_RESULTS,
    value: showLoading,
});

const receiveResultsAction = (results: CongregationResults) => ({
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

const setSearchParishIdAction = (parishId?: number) => ({
    type: SET_SEARCH_PARISH_ID,
    value: parishId,
});

const setParametersAction = (parameters: CongregationParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const setParameters = (archdeaconryId?: number, parishId?: number): AppThunkAction<Action> => (dispatch) => {


    dispatch(setParametersAction({}));
    dispatch(loadParishes(undefined));
};

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
    dispatch(requestResultsAction(showLoading));

    post<CongregationParameters & PagedParameters>('api/congregation/search', { ...parameters, pageNumber })
        .then(response => response.json() as Promise<CongregationResults>)
        .then(results => {
            dispatch(receiveResultsAction(results));
        });
};

export const actionCreators = {
    searchCongregations,
    setParameters,
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
        default:
            return state;
    }
};