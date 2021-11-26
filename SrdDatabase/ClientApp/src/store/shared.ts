import { Reducer } from 'redux';
import { Action, AppThunkAction } from '.';
import { get, post } from '../helpers/apiHelpers';
import { Archdeaconry } from './archdeaconry';
import { Congregation } from './congregation';
import { EventType } from './event';
import { Parish } from './parish';
import { UserType } from './user';

const REQUEST_ARCHDEACONRIES = 'REQUEST_ARCHDEACONRIES';
const RECEIVE_ARCHDEACONRIES = 'RECEIVE_ARCHDEACONRIES';
const REQUEST_PARISHES = 'REQUEST_PARISHES';
const RECEIVE_PARISHES = 'RECEIVE_PARISHES';
const REQUEST_CONGREGATIONS = 'REQUEST_CONGREGATIONS';
const RECEIVE_CONGREGATIONS = 'RECIEVE_CONGREGATIONS';
const REQUEST_EVENT_TYPES = 'REQUEST_EVENT_TYPES';
const RECEIVE_EVENT_TYPES = 'RECEIVE_EVENT_TYPES';
const REQUEST_USER_TYPES = 'REQUEST_USER_TYPES';
const RECEIVE_USER_TYPES = 'RECEIVE_USER_TYPES';
const SET_DELETING_ARCHDEACONRY_ID = 'SET_DELETING_ARCHDEACONRY_ID';

const requestArchdeaconriesAction = () => ({
    type: REQUEST_ARCHDEACONRIES,
});

const receiveArchdeaconriesAction = (archdeaconries: Archdeaconry[]) => ({
    type: RECEIVE_ARCHDEACONRIES,
    value: archdeaconries,
});

const requestParishesAction = () => ({
    type: REQUEST_PARISHES,
});

const receiveParishesAction = (parishes: Parish[]) => ({
    type: RECEIVE_PARISHES,
    value: parishes,
});

const requestCongregationsAction = () => ({
    type: REQUEST_CONGREGATIONS,
});

const receiveCongregationsAction = (congregations: Congregation[]) => ({
    type: RECEIVE_CONGREGATIONS,
    value: congregations,
});

const requestEventTypesAction = () => ({
    type: REQUEST_EVENT_TYPES,
});

const receiveEventTypesAction = (eventTypes: EventType[]) => ({
    type: RECEIVE_EVENT_TYPES,
    value: eventTypes,
});

const requestUserTypesAction = () => ({
    type: REQUEST_USER_TYPES,
});

const receiveUserTypesAction = (userTypes: UserType[]) => ({
    type: RECEIVE_USER_TYPES,
    value: userTypes,
});

const setDeletingArchdeaconryIdAction = (archdeaconryId?: number) => ({
    type: SET_DELETING_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const loadArchdeaconries = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestArchdeaconriesAction());

    get<Archdeaconry[]>('api/archdeaconry/all')
        .then(archdeaconries => {
            dispatch(receiveArchdeaconriesAction(archdeaconries));
        });
};

const loadParishes = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestParishesAction());

    get<Archdeaconry[]>('api/parish/all')
        .then(parishes => {
            dispatch(receiveParishesAction(parishes));
        });
};

const loadCongregations = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestCongregationsAction());

    get<Archdeaconry[]>('api/congregation/all')
        .then(congregations => {
            dispatch(receiveCongregationsAction(congregations));
        });
};

const loadEventTypes = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestEventTypesAction());

    get<EventType[]>('api/event/types')
        .then(eventTypes => {
            dispatch(receiveEventTypesAction(eventTypes));
        });
};

const loadUserTypes = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestUserTypesAction());

    get<UserType[]>('api/user/types')
        .then(userTypes => {
            dispatch(receiveUserTypesAction(userTypes));
        });
};

const deleteArchdeaconry = (archdeaconry: Archdeaconry, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {

        if (window.confirm(`Are you sure you want to delete ${archdeaconry.name} Archdeaconry?`)) {
            dispatch(setDeletingArchdeaconryIdAction(archdeaconry.id));

            post<{ id: number }>('api/archdeaconry/delete', { id: archdeaconry.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        alert(errorMessage);
                    });
                }).finally(() => {
                    dispatch(setDeletingArchdeaconryIdAction(undefined));
                });
        }
    };

export const actionCreators = {
    loadArchdeaconries,
    loadParishes,
    loadCongregations,
    loadEventTypes,
    loadUserTypes,
    deleteArchdeaconry,
};

export interface State {
    archdeaconries: Archdeaconry[];
    archdeaconriesLoading: boolean;
    parishes: Parish[];
    parishesLoading: boolean;
    congregations: Congregation[];
    congregationsLoading: boolean;
    eventTypes: EventType[];
    eventTypesLoading: boolean;
    userTypes: UserType[];
    userTypesLoading: boolean;
    deletingArchdeaconryId?: number;
}

const initialState: State = {
    archdeaconries: [],
    archdeaconriesLoading: true,
    parishes: [],
    parishesLoading: true,
    congregations: [],
    congregationsLoading: true,
    eventTypes: [],
    eventTypesLoading: true,
    userTypes: [],
    userTypesLoading: true,
}

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_ARCHDEACONRIES:
            return {
                ...state,
                archdeaconriesLoading: true,
            };
        case RECEIVE_ARCHDEACONRIES:
            return {
                ...state,
                archdeaconries: action.value,
                archdeaconriesLoading: false,
            };
        case REQUEST_PARISHES:
            return {
                ...state,
                parishesLoading: true,
            };
        case RECEIVE_PARISHES:
            return {
                ...state,
                parishes: action.value,
                parishesLoading: false,
            };
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
            };
        case REQUEST_USER_TYPES:
            return {
                ...state,
                userTypesLoading: true,
            };
        case RECEIVE_USER_TYPES:
            return {
                ...state,
                userTypes: action.value,
                userTypesLoading: false,
            };
        case SET_DELETING_ARCHDEACONRY_ID:
            return {
                ...state,
                deletingArchdeaconryId: action.value,
            };
        default:
            return state;
    }
};
