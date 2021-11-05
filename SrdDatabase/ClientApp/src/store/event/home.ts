import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../apiHelpers';
import { Event } from '.';

const REQUEST_EVENTS = 'EVENT.REQUEST_EVENTS';
const RECEIVE_EVENTS = 'EVENT.RECEIVE_EVENTS';
const SET_DELETING_ID = 'EVENT.SET_DELETING_ID';

export const requestEventsAction = (showLoading: boolean = true) => ({
    type: REQUEST_EVENTS,
    value: showLoading,
});

export const receiveEventsAction = (events: Event[]) => ({
    type: RECEIVE_EVENTS,
    value: events,
});

export const setDeletingIdAction = (eventId?: number) => ({
    type: SET_DELETING_ID,
    value: eventId,
});

export const loadEvents = (showLoading: boolean = true): AppThunkAction<Action> => (dispatch) => {
    get<Event[]>('api/event/all')
        .then(events => {
            dispatch(receiveEventsAction(events));
        });

    dispatch(requestEventsAction(showLoading));
};

const deleteEvent = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDeletingIdAction(id));

    post<{ id: number }>('api/event/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(loadEvents(false));
            } else {
                throw response.text();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorMessage: string) => {
                dispatch(setDeletingIdAction(undefined));
                alert(errorMessage);
            });
        });
};

export const actionCreators = {
    loadEvents,
    deleteEvent,
};

export interface State {
    eventsLoading: boolean;
    events: Event[];
    deletingId?: number;
}

const initialState: State = {
    events: [],
    eventsLoading: true,
    deletingId: undefined,
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_EVENTS:
            return {
                ...state,
                eventsLoading: action.value,
            };
        case RECEIVE_EVENTS:
            return {
                ...state,
                events: action.value,
                eventsLoading: false,
                deletingId: undefined,
            };
        case SET_DELETING_ID:
            return {
                ...state,
                deletingId: action.value,
            };
        default:
            return state;
    }
};