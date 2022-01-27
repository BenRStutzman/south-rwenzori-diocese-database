import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { ChargeParameters, ChargeResults } from '../../models/charge';
import { PagedParameters, pagedResultsDefaults } from '../../models/shared';
import { loadCongregations, loadParishes } from '../shared';

const RESET_PARAMETERS = 'CHARGE.RESET_PARAMETERS';
const Set_SEARCH_START_YEAR = 'CHARGE.SET_SEARCH_START_YEAR';
const SET_SEARCH_END_YEAR = 'CHARGE.SET_SEARCH_END_YEAR';
const SET_SEARCH_ARCHDEACONRY_ID = 'CHARGE.SET_SEARCH_ARCHDEACONRY_ID';
const SET_SEARCH_PARISH_ID = 'CHARGE.SET_SEARCH_PARISH_ID';
const SET_SEARCH_CONGREGATION_ID = 'CHARGE.SET_SEARCH_CONGREGATION_ID';
const REQUEST_RESULTS = 'CHARGE.REQUEST_RESULTS';
const RECEIVE_RESULTS = 'CHARGE.RECEIVE_RESULTS';

const requestResultsAction = (showLoading: boolean = true) => ({
    type: REQUEST_RESULTS,
    value: showLoading,
});

const receiveResultsAction = (results: ChargeResults) => ({
    type: RECEIVE_RESULTS,
    value: results,
});

const setSearchStartYearAction = (startYear: number) => ({
    type: Set_SEARCH_START_YEAR,
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

const resetParametersAction = () => ({
    type: RESET_PARAMETERS,
});

const resetParameters = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetParametersAction());
    dispatch(loadParishes(undefined));
    dispatch(loadCongregations(undefined));
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

const searchCharges = (
    parameters: ChargeParameters = {},
    pageNumber: number = 0,
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestResultsAction(showLoading));

    post<ChargeParameters & PagedParameters>('api/charge/search', { ...parameters, pageNumber })
        .then(response => response.json() as Promise<ChargeResults>)
        .then(results => {
            dispatch(receiveResultsAction(results));
        });
};

export const actionCreators = {
    searchCharges,
    setSearchParishId,
    setSearchCongregationId,
    setSearchArchdeaconryId,
    setSearchStartYear,
    setSearchEndYear,
    resetParameters,
};

export interface State {
    resultsLoading: boolean;
    results: ChargeResults;
    parameters: ChargeParameters,
}

const initialState: State = {
    results: { ...pagedResultsDefaults, charges: [] },
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
        case Set_SEARCH_START_YEAR:
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
        default:
            return state;
    }
};