import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../apiHelpers';
import { Event, EventType } from '.';
import { History } from 'history';
import { Congregation } from '../congregation';

const REQUEST_EVENT = 'EVENT.REQUEST_EVENT';
const RECEIVE_EVENT = 'EVENT.RECEIVE_EVENT';
const REQUEST_EVENT_TYPES = 'EVENT.REQUEST_EVENT_TYPES';
const RECEIVE_EVENT_TYPES = 'EVENT.RECEIVE_EVENT_TYPES';
const REQUEST_CONGREGATIONS = 'EVENT.REQUEST_CONGREGATIONS';
const RECEIVE_CONGREGATIONS = 'EVENT.RECEIVE_CONGREGATIONS';
const SET_EVENT_TYPE_ID = 'EVENT.SET_EVENT_TYPE_ID';
const SET_CONGREGATION_ID = 'EVENT.SET_CONGREGATION_ID';
const SET_PERSON_NAME = 'EVENT.SET_PERSON_NAME';
const SET_DATE = 'EVENT.SET_DATE';
const SET_IS_SAVING = 'EVENT.SET_IS_SAVING';
const SET_ERRORS = 'EVENT.SET_ERRORS';

const requestEventAction = () => ({
    type: REQUEST_EVENT,
});

const receiveEventAction = (event: Event) => ({
    type: RECEIVE_EVENT,
    value: event,
});

const requestEventTypesAction = () => ({
    type: REQUEST_EVENT_TYPES,
});

const receiveEventTypesAction = (eventTypes: EventType[]) => ({
    type: RECEIVE_EVENT_TYPES,
    value: eventTypes,
});

const requestCongregationsAction = () => ({
    type: REQUEST_CONGREGATIONS,
});

const receiveCongregationsAction = (congregations: Congregation[]) => ({
    type: RECEIVE_CONGREGATIONS,
    value: congregations,
});

const setEventTypeIdAction = (eventTypeId: number) => ({
    type: SET_EVENT_TYPE_ID,
    value: eventTypeId,
});

const setCongregationIdAction = (congregationId: number) => ({
    type: SET_CONGREGATION_ID,
    value: congregationId,
});

const setPersonNameAction = (personName: string) => ({
    type: SET_PERSON_NAME,
    value: personName,
});

const setDateAction = (date: Date) => ({
    type: SET_DATE,
    value: date,
});

const setIsSavingAction = (isSaving: boolean) => ({
    type: SET_IS_SAVING,
    value: isSaving,
});

const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
});

const resetEvent = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(receiveEventAction(initialState.event));
};

const loadEvent = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestEventAction());

    get<Event>(`api/event/${id}`)
        .then(event => {
            dispatch(receiveEventAction(event));
        });
};

const loadEventTypes = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestEventTypesAction());

    get<EventType[]>('api/event/types')
        .then(eventTypes => {
            dispatch(receiveEventTypesAction(eventTypes));
        });
};

const loadCongregations = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestCongregationsAction());

    get<Congregation[]>('api/congregation/all')
        .then(congregations => {
            dispatch(receiveCongregationsAction(congregations));
        });
};

const saveEvent = (event: Event, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    post<Event>('api/event/save', event)
        .then(response => {
            if (response.ok) {
                history.push('/event');
            } else {
                throw response.json();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorResponse: ErrorResponse) => {
                dispatch(setErrorsAction(errorResponse.errors));
            });
        }).finally(() => {
            dispatch(setIsSavingAction(false));
        });
};

const deleteEvent = (id: number, history: History): AppThunkAction<Action> => (dispatch) => {
    post<{ id: number }>('api/event/delete', { id })
        .then(response => {
            if (response.ok) {
                history.push('/event');
            } else {
                throw response.text();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorMessage: string) => {
                alert(errorMessage);
            });
        });
};

const setEventTypeId = (eventTypeId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setEventTypeIdAction(eventTypeId));
};

const setCongregationId = (parishId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setCongregationIdAction(parishId));
};

const setPersonName = (personName: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setPersonNameAction(personName));
};

const setDate = (date: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDateAction(date));
};

export const actionCreators = {
    loadCongregations,
    loadEventTypes,
    resetEvent,
    loadEvent,
    saveEvent,
    deleteEvent,
    setEventTypeId,
    setCongregationId,
    setPersonName,
    setDate,
};

export interface State {
    eventLoading: boolean;
    eventTypesLoading: boolean;
    eventTypes: EventType[];
    congregationsLoading: boolean;
    congregations: Congregation[];
    event: Event;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    event: {
        date: new Date(),
    },
    congregations: [],
    eventTypes: [],
    eventLoading: true,
    eventTypesLoading: true,
    congregationsLoading: true,
    hasBeenChanged: false,
    isSaving: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
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
        case SET_EVENT_TYPE_ID:
            return {
                ...state,
                event: {
                    ...state.event,
                    eventTypeId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_CONGREGATION_ID:
            return {
                ...state,
                event: {
                    ...state.event,
                    congregationId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_PERSON_NAME:
            return {
                ...state,
                event: {
                    ...state.event,
                    personName: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_DATE:
            return {
                ...state,
                event: {
                    ...state.event,
                    date: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_IS_SAVING:
            return {
                ...state,
                isSaving: action.value,
            }
        case SET_ERRORS:
            return {
                ...state,
                errors: action.value,
            };
        default:
            return state;
    }
};