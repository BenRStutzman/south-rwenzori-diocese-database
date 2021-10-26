import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../apiHelpers';
import { Event, EventType } from '.';
import { History } from 'history';
import { loadCongregations, REQUEST_CONGREGATIONS, RECEIVE_CONGREGATIONS } from '../congregation/search';
import { Congregation } from '../congregation';

export const RESET_EVENT = 'RESET_EVENT';
export const REQUEST_EVENT = 'REQUEST_EVENT';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const REQUEST_EVENT_TYPES = 'REQUEST_EVENT_TYPES';
export const RECEIVE_EVENT_TYPES = 'RECEIVE_EVENT_TYPES';
export const SET_EVENT_NAME = 'SET_EVENT_NAME';
export const SET_EVENT_EVENT_TYPE_ID = 'SET_EVENT_EVENT_TYPE_ID';
export const SET_EVENT_CONGREGATION_ID = 'SET_EVENT_CONGREGATION_ID';
export const SET_EVENT_PERSON_NAME = 'SET_EVENT_PERSON_NAME';
export const SET_EVENT_DATE = 'SET_EVENT_DATE';
export const SET_EVENT_IS_SAVING = 'SET_EVENT_IS_SAVING';
export const SET_EVENT_HAS_BEEN_SAVED = 'SET_EVENT_HAS_BEEN_SAVED';
export const SET_EVENT_ERRORS = 'SET_EVENT_ERRORS';

export const resetEventAction = () => ({
    type: RESET_EVENT,
})

export const requestEventAction = () => ({
    type: REQUEST_EVENT,
});

export const receiveEventAction = (event: Event) => ({
    type: RECEIVE_EVENT,
    value: event,
});

export const requestEventTypesAction = () => ({
    type: REQUEST_EVENT_TYPES,
});

export const receiveEventTypesAction = (eventTypes: EventType[]) => ({
    type: RECEIVE_EVENT_TYPES,
    value: eventTypes,
});

export const setEventEventTypeIdAction = (eventTypeId: number) => ({
    type: SET_EVENT_EVENT_TYPE_ID,
    value: eventTypeId,
});

export const setEventCongregationIdAction = (congregationId: number) => ({
    type: SET_EVENT_CONGREGATION_ID,
    value: congregationId,
});

export const setEventPersonNameAction = (personName: string) => ({
    type: SET_EVENT_PERSON_NAME,
    value: personName,
});

export const setEventDateAction = (date: Date) => ({
    type: SET_EVENT_DATE,
    value: date,
});

export const setEventHasBeenSavedAction = () => ({
    type: SET_EVENT_HAS_BEEN_SAVED,
});

export const setEventErrorsAction = (errors: Errors) => ({
    type: SET_EVENT_ERRORS,
    value: errors,
})

export interface State {
    eventLoading: boolean;
    eventTypesLoading: boolean;
    eventTypes: EventType[];
    congregationsLoading: boolean;
    congregations: Congregation[];
    event: Event;
    hasBeenChanged: boolean,
    hasBeenSaved: boolean;
    errors: Errors;
}

const initialState: State = {
    event: {},
    congregations: [],
    eventTypes: [],
    eventLoading: true,
    eventTypesLoading: true,
    congregationsLoading: true,
    hasBeenChanged: false,
    hasBeenSaved: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case RESET_EVENT:
            return {
                ...state,
                event: {},
                eventLoading: false,
            };
        case REQUEST_EVENT:
            return {
                ...state,
                eventLoading: true,
            };
        case RECEIVE_EVENT:
            return {
                ...state,
                event: action.value,
                errors: {},
                eventLoading: false,
                hasBeenChanged: false,
            };
        case REQUEST_EVENT_TYPES:
            return {
                ...state,
                eventTypesLoading: true,
            };
        case RECEIVE_EVENT_TYPES:
            return {
                ...state,
                eventTypes: action.value,
                eventTypesLoading: false,
            }
        case REQUEST_CONGREGATIONS:
            return {
                ...state,
                congregationsLoading: true,
            };
        case RECEIVE_CONGREGATIONS:
            return {
                ...state,
                congregations: action.value,
                congregationsLoading: false,
            };
        case SET_EVENT_EVENT_TYPE_ID:
            return {
                ...state,
                event: {
                    ...state.event,
                    eventTypeId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_EVENT_CONGREGATION_ID:
            return {
                ...state,
                event: {
                    ...state.event,
                    congregationId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_EVENT_PERSON_NAME:
            return {
                ...state,
                event: {
                    ...state.event,
                    personName: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_EVENT_DATE:
            return {
                ...state,
                event: {
                    ...state.event,
                    date: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_EVENT_HAS_BEEN_SAVED:
            return {
                ...state,
                hasBeenSaved: true,
            };
        case SET_EVENT_ERRORS:
            return {
                ...state,
                errors: action.value,
            };
        default:
            return state;
    }
};

const loadEvent = (id: number): AppThunkAction<Action> => (dispatch) => {
    get<Event>(`api/event/${id}`)
        .then(event => {
            dispatch(receiveEventAction(event));
        });

    dispatch(requestEventAction());
}

const loadEventTypes = (): AppThunkAction<Action> => (dispatch) => {
    get<EventType[]>('api/event/types')
        .then(eventTypes => {
            dispatch(receiveEventTypesAction(eventTypes));
        });

    dispatch(requestEventTypesAction());
}

const saveEvent = (event: Event, history: History): AppThunkAction<Action> => (dispatch) => {
    post<Event>('api/event/save', event)
        .then(response => {
            if (response.ok) {
                return response.json() as Promise<number>;
            } else {
                throw response.json();
            }
        }).then(eventId => {
            if (event.id) {
                dispatch(loadEvent(event.id));
            } else {
                history.push(`/event/edit/${eventId}`);
            }
            dispatch(setEventHasBeenSavedAction());
        }).catch(errorPromise => {
            errorPromise.then((errorResponse: ErrorResponse) => {
                dispatch(setEventErrorsAction(errorResponse.errors));
            });
        });
};

const setEventEventTypeId = (eventTypeId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setEventEventTypeIdAction(eventTypeId));
};

const setEventCongregationId = (parishId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setEventCongregationIdAction(parishId));
};

const setEventPersonName = (personName: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setEventPersonNameAction(personName));
};

const setEventDate = (date: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setEventDateAction(date));
};

const resetEvent = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetEventAction());
}

export const actionCreators = {
    loadCongregations,
    loadEventTypes,
    resetEvent,
    loadEvent,
    saveEvent,
    setEventEventTypeId,
    setEventCongregationId,
    setEventPersonName,
    setEventDate,
};
