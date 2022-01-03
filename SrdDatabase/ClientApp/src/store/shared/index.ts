import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { getUser } from '../../helpers/userHelper';
import { Archdeaconry, ArchdeaconryResults } from '../../models/archdeaconry';
import { Congregation } from '../../models/congregation';
import { Event, EventType } from '../../models/event';
import { Parish } from '../../models/parish';
import { Transaction, TransactionType } from '../../models/transaction';
import { CurrentUser, User, UserData, UserType } from '../../models/user';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REQUEST_ARCHDEACONRIES = 'REQUEST_ARCHDEACONRIES';
const RECEIVE_ARCHDEACONRIES = 'RECEIVE_ARCHDEACONRIES';
const REQUEST_PARISHES = 'REQUEST_PARISHES';
const RECEIVE_PARISHES = 'RECEIVE_PARISHES';
const REQUEST_CONGREGATIONS = 'REQUEST_CONGREGATIONS';
const RECEIVE_CONGREGATIONS = 'RECIEVE_CONGREGATIONS';
const REQUEST_EVENT_TYPES = 'REQUEST_EVENT_TYPES';
const RECEIVE_EVENT_TYPES = 'RECEIVE_EVENT_TYPES';
const REQUEST_TRANSACTION_TYPES = 'REQUEST_TRANSACTION_TYPES';
const RECEIVE_TRANSACTION_TYPES = 'RECEIVE_TRANSACTION_TYPES';
const REQUEST_USER_TYPES = 'REQUEST_USER_TYPES';
const RECEIVE_USER_TYPES = 'RECEIVE_USER_TYPES';
const SET_DELETING_ARCHDEACONRY_ID = 'SET_DELETING_ARCHDEACONRY_ID';
const SET_DELETING_PARISH_ID = 'SET_DELETING_PARISH_ID';
const SET_DELETING_CONGREGATION_ID = 'SET_DELETING_CONGREGATION_ID';
const SET_DELETING_EVENT_ID = 'SET_DELETING_EVENT_ID';
const SET_DELETING_TRANSACTION_ID = 'SET_DELETING_TRANSACTION_ID';
const SET_DELETING_USER_ID = 'SET_DELETING_USER_ID';

const loginAction = (user: CurrentUser) => ({
    type: LOGIN,
    value: user,
});

const logoutAction = () => ({
    type: LOGOUT,
});

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

const requestTransactionTypesAction = () => ({
    type: REQUEST_TRANSACTION_TYPES,
});

const receiveTransactionTypesAction = (transactionTypes: TransactionType[]) => ({
    type: RECEIVE_TRANSACTION_TYPES,
    value: transactionTypes,
})

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

const setDeletingParishIdAction = (parishId?: number) => ({
    type: SET_DELETING_PARISH_ID,
    value: parishId,
});

const setDeletingCongregationIdAction = (congregationId?: number) => ({
    type: SET_DELETING_CONGREGATION_ID,
    value: congregationId,
});

const setDeletingEventIdAction = (eventId?: number) => ({
    type: SET_DELETING_EVENT_ID,
    value: eventId,
});

const setDeletingTransactionIdAction = (transactionId?: number) => ({
    type: SET_DELETING_TRANSACTION_ID,
    value: transactionId,
});

const setDeletingUserIdAction = (userId?: number) => ({
    type: SET_DELETING_USER_ID,
    value: userId,
});

const login = (userData: UserData): AppThunkAction<Action> => (dispatch) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    dispatch(loginAction(userData.user));
};

const logout = (): AppThunkAction<Action> => (dispatch) => {
    localStorage.removeItem('userData');
    dispatch(logoutAction());
};

const loadArchdeaconries = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestArchdeaconriesAction());

    get<Archdeaconry[]>('api/archdeaconry/all')
        .then(archdeaconries => {
            dispatch(receiveArchdeaconriesAction(archdeaconries));
        });
};

const loadParishes = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestParishesAction());

    get<Parish[]>('api/parish/all')
        .then(parishes => {
            dispatch(receiveParishesAction(parishes));
        });
};

const loadCongregations = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestCongregationsAction());

    get<Congregation[]>('api/congregation/all')
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

const loadTransactionTypes = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestTransactionTypesAction());

    get<TransactionType[]>('api/transaction/types')
        .then(transactionTypes => {
            dispatch(receiveTransactionTypesAction(transactionTypes));
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
                        dispatch(setDeletingArchdeaconryIdAction(undefined));
                        alert(errorMessage);
                    });
                });
        }
    };

const deleteParish = (parish: Parish, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete ${parish.name} Parish?`)) {
            dispatch(setDeletingParishIdAction(parish.id));

            post<{ id: number }>('api/parish/delete', { id: parish.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingParishIdAction(undefined));
                        alert(errorMessage);
                    });
                });
        }
    };

const deleteCongregation = (congregation: Congregation, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete ${congregation.name} Congregation?`)) {
            dispatch(setDeletingCongregationIdAction(congregation.id));

            post<{ id: number }>('api/congregation/delete', { id: congregation.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingCongregationIdAction(undefined));
                        alert(errorMessage);
                    });
                });
        }
    };

const deleteEvent = (event: Event, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete this ${event.eventType} event?`)) {
            dispatch(setDeletingEventIdAction(event.id));

            post<{ id: number }>('api/event/delete', { id: event.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingEventIdAction(undefined));
                        alert(errorMessage);
                    });
                });
        }
    };

const deleteTransaction = (transaction: Transaction, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete this ${transaction.transactionType} transaction?`)) {
            dispatch(setDeletingTransactionIdAction(transaction.id));

            post<{ id: number }>('api/transaction/delete', { id: transaction.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingTransactionIdAction(undefined));
                        alert(errorMessage);
                    });
                });
        }
    };

const deleteUser = (user: User, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete the user ${user.name}?`)) {
            dispatch(setDeletingUserIdAction(user.id));

            post<{ id: number }>('api/user/delete', { id: user.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingUserIdAction(undefined));
                        alert(errorMessage);
                    });
                });
        }
    };

export const actionCreators = {
    login,
    logout,
    loadArchdeaconries,
    loadParishes,
    loadCongregations,
    loadEventTypes,
    loadTransactionTypes,
    loadUserTypes,
    deleteArchdeaconry,
    deleteParish,
    deleteCongregation,
    deleteEvent,
    deleteTransaction,
    deleteUser,
};

export interface State {
    currentUser?: CurrentUser;
    archdeaconries: Archdeaconry[];
    archdeaconriesLoading: boolean;
    parishes: Parish[];
    parishesLoading: boolean;
    congregations: Congregation[];
    congregationsLoading: boolean;
    eventTypes: EventType[];
    eventTypesLoading: boolean;
    transactionTypes: TransactionType[];
    transactionTypesLoading: boolean;
    userTypes: UserType[];
    userTypesLoading: boolean;
    deletingArchdeaconryId?: number;
    deletingParishId?: number;
    deletingCongregationId?: number;
    deletingEventId?: number;
    deletingTransactionId?: number;
    deletingUserId?: number;
}

const initialState: State = {
    currentUser: getUser(),
    archdeaconries: [],
    archdeaconriesLoading: true,
    parishes: [],
    parishesLoading: true,
    congregations: [],
    congregationsLoading: true,
    eventTypes: [],
    eventTypesLoading: true,
    transactionTypes: [],
    transactionTypesLoading: true,
    userTypes: [],
    userTypesLoading: true,
}

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                currentUser: action.value,
            };
        case LOGOUT:
            return {
                ...state,
                currentUser: undefined,
            };
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
        case REQUEST_TRANSACTION_TYPES:
            return {
                ...state,
                transactionTypesLoading: true,
            };
        case RECEIVE_TRANSACTION_TYPES:
            return {
                ...state,
                transactionTypes: action.value,
                transactionTypesLoading: false,
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
        case SET_DELETING_PARISH_ID:
            return {
                ...state,
                deletingParishId: action.value,
            };
        case SET_DELETING_CONGREGATION_ID:
            return {
                ...state,
                deletingCongregationId: action.value,
            };
        case SET_DELETING_EVENT_ID:
            return {
                ...state,
                deletingEventId: action.value,
            };
        case SET_DELETING_TRANSACTION_ID:
            return {
                ...state,
                deletingTransactionId: action.value,
            };
        case SET_DELETING_USER_ID:
            return {
                ...state,
                deletingUserId: action.value,
            };
        default:
            return state;
    }
};
