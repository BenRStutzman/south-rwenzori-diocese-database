import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { getUser } from '../../helpers/userHelper';
import { Archdeaconry, ArchdeaconryResults } from '../../models/archdeaconry';
import { Quota } from '../../models/quota';
import { Census } from '../../models/census';
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
const SET_DELETING_CENSUS_ID = 'SET_DELETING_CENSUS_ID';
const SET_DELETING_PAYMENT_ID = 'SET_DELETING_PAYMENT_ID';
const SET_DELETING_QUOTA_ID = 'SET_DELETING_QUOTA_ID';
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

const setDeletingArchdeaconryIdAction = (archdeaconryId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_ARCHDEACONRY_ID,
    value: { archdeaconryId, isDeleting },
});

const setDeletingParishIdAction = (parishId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_PARISH_ID,
    value: { parishId, isDeleting },
});

const setDeletingCongregationIdAction = (congregationId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_CONGREGATION_ID,
    value: { congregationId, isDeleting },
});

const setDeletingEventIdAction = (eventId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_EVENT_ID,
    value: { eventId, isDeleting },
});

const setDeletingPaymentIdAction = (paymentId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_PAYMENT_ID,
    value: { paymentId, isDeleting },
});

const setDeletingQuotaIdAction = (quotaId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_QUOTA_ID,
    value: { quotaId, isDeleting },
});

const setDeletingUserIdAction = (userId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_USER_ID,
    value: { userId, isDeleting },
});

const setDeletingCensusIdAction = (censusId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_CENSUS_ID,
    value: { censusId, isDeleting },
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
                        dispatch(setDeletingArchdeaconryIdAction(archdeaconry.id, false));
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
                        dispatch(setDeletingParishIdAction(parish.id, false));
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
                        dispatch(setDeletingCongregationIdAction(congregation.id, false));
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
                        dispatch(setDeletingEventIdAction(event.id, false));
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
                        dispatch(setDeletingPaymentIdAction(payment.id, false));
                        alert(errorMessage);
                    });
                });
        }
    };

const deleteQuota = (quota: Quota, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete this quota to ${quota.congregation}?`)) {
            dispatch(setDeletingQuotaIdAction(quota.id));

            post<{ id: number }>('api/quota/delete', { id: quota.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingQuotaIdAction(quota.id, false));
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
                        dispatch(setDeletingUserIdAction(user.id, false));
                        alert(errorMessage);
                    });
                });
        }
    };

const deleteCensus = (census: Census, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete this census for ${census.congregation}?`)) {
            dispatch(setDeletingCensusIdAction(census.id));

            post<{ id: number }>('api/census/delete', { id: census.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingCensusIdAction(census.id, false));
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
    deleteQuota,
    deleteUser,
    deleteCensus,
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
    deletingArchdeaconryIds: number[];
    deletingParishIds: number[];
    deletingCongregationIds: number[];
    deletingEventIds: number[];
    deletingPaymentIds: number[];
    deletingQuotaIds: number[];
    deletingUserIds: number[];
    deletingCensusIds: number[];
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
    deletingArchdeaconryIds: [],
    deletingParishIds: [],
    deletingCongregationIds: [],
    deletingEventIds: [],
    deletingQuotaIds: [],
    deletingPaymentIds: [],
    deletingUserIds: [],
    deletingCensusIds: [],
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
                deletingArchdeaconryIds: action.value.isDeleting
                    ? [...state.deletingArchdeaconryIds, action.value.archdeaconryId]
                    : state.deletingArchdeaconryIds.filter(id => id != action.value.archdeaconryId),
            };
        case SET_DELETING_PARISH_ID:
            return {
                ...state,
                deletingParishIds: action.value.isDeleting
                    ? [...state.deletingParishIds, action.value.parishId]
                    : state.deletingParishIds.filter(id => id != action.value.parishId),
            };
        case SET_DELETING_CONGREGATION_ID:
            return {
                ...state,
                deletingCongregationIds: action.value.isDeleting
                    ? [...state.deletingCongregationIds, action.value.congregationId]
                    : state.deletingCongregationIds.filter(id => id != action.value.congregationId),
            };
        case SET_DELETING_EVENT_ID:
            return {
                ...state,
                deletingEventIds: action.value.isDeleting
                    ? [...state.deletingEventIds, action.value.eventId]
                    : state.deletingEventIds.filter(id => id != action.value.eventId),
            };
        case SET_DELETING_PAYMENT_ID:
            return {
                ...state,
                deletingPaymentIds: action.value.isDeleting
                    ? [...state.deletingPaymentIds, action.value.paymentId]
                    : state.deletingPaymentIds.filter(id => id != action.value.paymentId),
            };
        case SET_DELETING_QUOTA_ID:
            return {
                ...state,
                deletingQuotaIds: action.value.isDeleting
                    ? [...state.deletingQuotaIds, action.value.quotaId]
                    : state.deletingQuotaIds.filter(id => id != action.value.quotaId),
            };
        case SET_DELETING_USER_ID:
            return {
                ...state,
                deletingUserIds: action.value.isDeleting
                    ? [...state.deletingUserIds, action.value.userId]
                    : state.deletingUserIds.filter(id => id != action.value.userId),
            };
        case SET_DELETING_CENSUS_ID:
            return {
                ...state,
                deletingCensusIds: action.value.isDeleting
                    ? [...state.deletingCensusIds, action.value.censusId]
                    : state.deletingCensusIds.filter(id => id != action.value.censusId),
            };
        default:
            return state;
    }
};
