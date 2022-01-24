import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { getUser } from '../../helpers/userHelper';
import { Archdeaconry, ArchdeaconryResults } from '../../models/archdeaconry';
import { Charge } from '../../models/charge';
import { Congregation, CongregationParameters, CongregationResults } from '../../models/congregation';
import { Event, EventType } from '../../models/event';
import { Parish, ParishParameters, ParishResults } from '../../models/parish';
import { Payment } from '../../models/payment';
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
const REQUEST_USER_TYPES = 'REQUEST_USER_TYPES';
const RECEIVE_USER_TYPES = 'RECEIVE_USER_TYPES';
const SET_DELETING_ARCHDEACONRY_ID = 'SET_DELETING_ARCHDEACONRY_ID';
const SET_DELETING_PARISH_ID = 'SET_DELETING_PARISH_ID';
const SET_DELETING_CONGREGATION_ID = 'SET_DELETING_CONGREGATION_ID';
const SET_DELETING_EVENT_ID = 'SET_DELETING_EVENT_ID';
const SET_DELETING_PAYMENT_ID = 'SET_DELETING_PAYMENT_ID';
const SET_DELETING_CHARGE_ID = 'SET_DELETING_CHARGE_ID';
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

const setDeletingPaymentIdAction = (paymentId?: number) => ({
    type: SET_DELETING_PAYMENT_ID,
    value: paymentId,
});

const setDeletingChargeIdAction = (chargeId?: number) => ({
    type: SET_DELETING_CHARGE_ID,
    value: chargeId,
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

export const loadParishes = (archdeaconryId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestParishesAction());

    if (archdeaconryId) {
        post<ParishParameters>('api/parish/search', { archdeaconryId })
            .then(response => response.json() as Promise<ParishResults>)
            .then(results => {
                dispatch(receiveParishesAction(results.parishes));
            });
    } else {
        dispatch(receiveParishesAction([]));
    }
};

export const loadCongregations = (parishId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestCongregationsAction());

    if (parishId) {
        post<CongregationParameters>('api/congregation/search', { parishId })
            .then(response => response.json() as Promise<CongregationResults>)
            .then(results => {
                dispatch(receiveCongregationsAction(results.congregations));
            });
    } else {
        dispatch(receiveCongregationsAction([]));
    }
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

const deletePayment = (payment: Payment, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete this payment from ${payment.congregation}?`)) {
            dispatch(setDeletingPaymentIdAction(payment.id));

            post<{ id: number }>('api/payment/delete', { id: payment.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingPaymentIdAction(undefined));
                        alert(errorMessage);
                    });
                });
        }
    };

const deleteCharge = (charge: Charge, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete this charge to ${charge.congregation}?`)) {
            dispatch(setDeletingChargeIdAction(charge.id));

            post<{ id: number }>('api/charge/delete', { id: charge.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingChargeIdAction(undefined));
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
    loadUserTypes,
    deleteArchdeaconry,
    deleteParish,
    deleteCongregation,
    deleteEvent,
    deletePayment,
    deleteCharge,
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
    userTypes: UserType[];
    userTypesLoading: boolean;
    deletingArchdeaconryId?: number;
    deletingParishId?: number;
    deletingCongregationId?: number;
    deletingEventId?: number;
    deletingPaymentId?: number;
    deletingChargeId?: number;
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
        case SET_DELETING_PAYMENT_ID:
            return {
                ...state,
                deletingPaymentId: action.value,
            };
        case SET_DELETING_CHARGE_ID:
            return {
                ...state,
                deletingChargeId: action.value,
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
