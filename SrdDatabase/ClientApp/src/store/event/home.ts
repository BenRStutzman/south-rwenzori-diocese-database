import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { Event } from '.';

export interface SearchParameters {
    eventTypeId?: number;
    personName?: string;
    parishId?: number;
    archdeaconryId?: number;
    congregationId?: number;
    startDate?: Date;
    endDate?: Date;
}

const RESET_PARAMETERS = 'EVENT.RESET_PARAMETERS';
const SET_SEARCH_EVENT_TYPE_ID = 'EVENT.SET_SEARCH_EVENT_TYPE_ID';
const SET_SEARCH_START_DATE = 'EVENT.SET_SEARCH_START_DATE';
const SET_SEARCH_END_DATE = 'EVENT.SET_SEARCH_END_DATE';
const SET_SEARCH_PERSON_NAME = 'EVENT.SET_SEARCH_NAME';
const SET_SEARCH_ARCHDEACONRY_ID = 'EVENT.SET_SEARCH_ARCHDEACONRY_ID';
const SET_SEARCH_PARISH_ID = 'EVENT.SET_SEARCH_PARISH_ID';
const SET_SEARCH_CONGREGATION_ID = 'EVENT.SET_SEARCH_CONGREGATION_ID';
const REQUEST_EVENTS = 'EVENT.REQUEST_EVENTS';
const RECEIVE_EVENTS = 'EVENT.RECEIVE_EVENTS';

const requestEventsAction = (showLoading: boolean = true) => ({
    type: REQUEST_EVENTS,
    value: showLoading,
});

const receiveEventsAction = (events: Event[]) => ({
    type: RECEIVE_EVENTS,
    value: events,
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
    showLoading: boolean = true,
    parameters: SearchParameters = {},
): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestEventsAction(showLoading));

    post<SearchParameters>('api/event/search', parameters)
        .then(response => response.json() as Promise<Event[]>)
        .then(events => {
            dispatch(receiveEventsAction(events));
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
    results: Event[];
    deletingId?: number;
    parameters: SearchParameters,
}

const initialState: State = {
    results: [],
    resultsLoading: true,
    deletingId: undefined,
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
        case REQUEST_EVENTS:
            return {
                ...state,
                resultsLoading: action.value,
            };
        case RECEIVE_EVENTS:
            return {
                ...state,
                results: action.value,
                resultsLoading: false,
                deletingId: undefined,
            };
        default:
            return state;
    }
};