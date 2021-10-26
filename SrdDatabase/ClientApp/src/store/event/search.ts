import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../apiHelpers';
import { Event } from '.';

export interface State {
    eventsLoading: boolean;
    events: Event[];
}

const initialState: State = { events: [], eventsLoading: true };

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

export const requestEventsAction = (showLoading: boolean = true) => ({
    type: REQUEST_EVENTS,
    value: showLoading,
});

export const receiveEventsAction = (events: Event[]) => ({
    type: RECEIVE_EVENTS,
    value: events,
});

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
            };
        default:
            return state;
    }
};

export const loadEvents = (showLoading: boolean = true): AppThunkAction<Action> => (dispatch) => {
    get<Event[]>('api/event/all')
        .then(events => {
            dispatch(receiveEventsAction(events));
        });

    dispatch(requestEventsAction(showLoading));
};

const deleteEvent = (id: number): AppThunkAction<Action> => (dispatch) => {
    post<{ id: number }>('api/event/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(loadEvents(false));
            } else {
                throw response.text();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorMessage: string) => {
                alert(errorMessage);
            });
        });
};

export const actionCreators = {
    loadEvents,
    deleteEvent,
};
