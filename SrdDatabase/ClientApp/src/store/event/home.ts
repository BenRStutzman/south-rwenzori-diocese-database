import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { Event, EventParameters, EventResults } from '../../models/event';
import { PagedParameters, pagedResultsDefaults } from '../../models/shared';

const RESET_PARAMETERS = 'EVENT.RESET_PARAMETERS';
const SET_SEARCH_EVENT_TYPE_ID = 'EVENT.SET_SEARCH_EVENT_TYPE_ID';
const SET_SEARCH_START_DATE = 'EVENT.SET_SEARCH_START_DATE';
const SET_SEARCH_END_DATE = 'EVENT.SET_SEARCH_END_DATE';
const SET_SEARCH_PERSON_NAME = 'EVENT.SET_SEARCH_NAME';
const SET_SEARCH_ARCHDEACONRY_ID = 'EVENT.SET_SEARCH_ARCHDEACONRY_ID';
const SET_SEARCH_PARISH_ID = 'EVENT.SET_SEARCH_PARISH_ID';
const SET_SEARCH_CONGREGATION_ID = 'EVENT.SET_SEARCH_CONGREGATION_ID';
const REQUEST_RESULTS = 'EVENT.REQUEST_RESULTS';
const RECEIVE_RESULTS = 'EVENT.RECEIVE_RESULTS';

const requestResultsAction = (showLoading: boolean = true) => ({
    type: REQUEST_RESULTS,
    value: showLoading,
});

const receiveResultsAction = (results: EventResults) => ({
    type: RECEIVE_RESULTS,
    value: results,
});

const setSearchEventTypeIdAction = (eventTypeId: number) => ({
    type: SET_SEARCH_EVENT_TYPE_ID,
    value: eventTypeId,
});

const setSearchStartDateAction = (startDate: Date) => ({
    type: SET_SEARCH_START_DATE,
    value: startDate,
});

const setSearchEndDateAction = (endDate: Date) => ({
    type: SET_SEARCH_END_DATE,
    value: endDate,
});

const setSearchPersonNameAction = (personName: string) => ({
    type: SET_SEARCH_PERSON_NAME,
    value: personName,
});

const setSearchArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_SEARCH_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const setSearchParishIdAction = (parishId: number) => ({
    type: SET_SEARCH_PARISH_ID,
    value: parishId,
});

const setSearchCongregationIdAction = (congregationId: number) => ({
    type: SET_SEARCH_CONGREGATION_ID,
    value: congregationId,
});

const resetParametersAction = () => ({
    type: RESET_PARAMETERS,
});

const resetParameters = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetParametersAction());
};

const setSearchEventTypeId = (eventTypeId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchEventTypeIdAction(eventTypeId));
};

const setSearchStartDate = (startDate: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchStartDateAction(startDate));
};

const setSearchEndDate = (endDate: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchEndDateAction(endDate));
};

const setSearchPersonName = (personName: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchPersonNameAction(personName));
};

const setSearchArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchArchdeaconryIdAction(archdeaconryId));
};

const setSearchParishId = (parishId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchParishIdAction(parishId));
};

const setSearchCongregationId = (congregationId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchCongregationIdAction(congregationId));
};

const searchEvents = (
    parameters: EventParameters = {},
    pageNumber: number = 0,
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestResultsAction(showLoading));

    post<EventParameters & PagedParameters>('api/event/search', { ...parameters, pageNumber })
        .then(response => response.json() as Promise<EventResults>)
        .then(results => {
            dispatch(receiveResultsAction(results));
        });
};

export const actionCreators = {
    searchEvents,
    setSearchEventTypeId,
    setSearchParishId,
    setSearchCongregationId,
    setSearchArchdeaconryId,
    setSearchPersonName,
    setSearchStartDate,
    setSearchEndDate,
    resetParameters,
};

export interface State {
    resultsLoading: boolean;
    results: EventResults;
    parameters: EventParameters,
}

const initialState: State = {
    results: { ...pagedResultsDefaults, events: [] },
    resultsLoading: true,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_SEARCH_EVENT_TYPE_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    eventTypeId: action.value,
                }
            };
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
        case SET_SEARCH_PERSON_NAME:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    personName: action.value,
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