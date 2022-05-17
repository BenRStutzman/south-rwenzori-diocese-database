import { Reducer } from 'redux';
import { AppThunkAction, Action } from '../..';
import { post } from '../../../helpers/apiHelpers';
import { formattedDateAllowUndefined } from '../../../helpers/miscellaneous';
import { DividendParameters, DividendParametersToSend, DividendResults } from '../../../models/sacco/dividend';
import { pagedResultsDefaults } from '../../../models/shared';

const SET_PARAMETERS = 'SACCO_DIVIDEND.SET_PARAMETERS';
const SET_SEARCH_START_DATE = 'SACCO_DIVIDEND.SET_SEARCH_START_DATE';
const SET_SEARCH_END_DATE = 'SACCO_DIVIDEND.SET_SEARCH_END_DATE';
const SET_RESULTS_LOADING = 'SACCO_DIVIDEND.SET_RESULTS_LOADING';
const SET_RESULTS = 'SACCO_DIVIDEND.SET_RESULTS';

const setResultsLoadingAction = () => ({
    type: SET_RESULTS_LOADING,
});

const setResultsAction = (results: DividendResults) => ({
    type: SET_RESULTS,
    value: results,
});

const setSearchStartDateAction = (startDate?: Date) => ({
    type: SET_SEARCH_START_DATE,
    value: startDate,
});

const setSearchEndDateAction = (endDate?: Date) => ({
    type: SET_SEARCH_END_DATE,
    value: endDate,
});

const setParametersAction = (parameters: DividendParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const prefillParameters = (search: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const parameters = {};

    dispatch(setParametersAction(parameters));

    if (search) {
        dispatch(searchDividends(parameters));
    }
};

const setSearchStartDate = (startDate?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchStartDateAction(startDate));
};

const setSearchEndDate = (endDate?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchEndDateAction(endDate));
};

const searchDividends = (
    parameters: DividendParameters = {},
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    if (showLoading) {
        dispatch(setResultsLoadingAction());
    }

    dispatch(setParametersAction(parameters));

    const parametersToSend = {
        ...parameters,
        startDate: formattedDateAllowUndefined(parameters.startDate),
        endDate: formattedDateAllowUndefined(parameters.endDate),
    }

    post<DividendParametersToSend>('api/sacco/dividend/search', parametersToSend)
        .then(response => response.json() as Promise<DividendResults>)
        .then(results => {
            dispatch(setResultsAction(results));
        });
};

export const actionCreators = {
    searchDividends,
    setSearchStartDate,
    setSearchEndDate,
    prefillParameters,
};

export interface State {
    resultsLoading: boolean;
    results: DividendResults;
    parameters: DividendParameters,
}

const initialState: State = {
    results: { ...pagedResultsDefaults, dividends: [] },
    resultsLoading: true,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
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