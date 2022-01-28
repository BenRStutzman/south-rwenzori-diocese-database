import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Event } from '../../models/event';
import { History } from 'history';
import { Congregation } from '../../models/congregation';
import { loadCongregations, loadParishes } from '../shared';
import { Parish } from '../../models/parish';
import { Archdeaconry } from '../../models/archdeaconry';

const SET_IS_LOADING = 'EVENT.SET_IS_LOADING';
const SET_EVENT = 'EVENT.SET_EVENT';
const SET_EVENT_TYPE_ID = 'EVENT.SET_EVENT_TYPE_ID';
const SET_ARCHDEACONRY_ID = 'EVENT.SET_ARCHDEACONRY_ID';
const SET_PARISH_ID = 'EVENT.SET_PARISH_ID';
const SET_CONGREGATION_ID = 'EVENT.SET_CONGREGATION_ID';
const SET_FIRST_PERSON_NAME = 'EVENT.SET_FIRST_PERSON_NAME';
const SET_SECOND_PERSON_NAME = 'EVENT.SET_SECOND_PERSON_NAME';
const SET_DATE = 'EVENT.SET_DATE';
const SET_IS_SAVING = 'EVENT.SET_IS_SAVING';
const SET_ERRORS = 'EVENT.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setEventAction = (event: Event) => ({
    type: SET_EVENT,
    value: event,
});

const setEventTypeIdAction = (eventTypeId: number) => ({
    type: SET_EVENT_TYPE_ID,
    value: eventTypeId,
});

const setArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const setParishIdAction = (parishId?: number) => ({
    type: SET_PARISH_ID,
    value: parishId,
});

const setCongregationIdAction = (congregationId?: number) => ({
    type: SET_CONGREGATION_ID,
    value: congregationId,
});

const setFirstPersonNameAction = (firstPersonName: string) => ({
    type: SET_FIRST_PERSON_NAME,
    value: firstPersonName,
});

const setSecondPersonNameAction = (secondPersonName: string) => ({
    type: SET_SECOND_PERSON_NAME,
    value: secondPersonName,
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

const prefillEvent = (congregationId?: number, parishId?: number, archdeaconryId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    const date = new Date();

    if (congregationId) {
        get<Congregation>(`api/congregation/${congregationId}`)
            .then(congregation => {
                dispatch(setEvent({
                    date,
                    congregationId: congregation.id,
                    parishId: congregation.parishId,
                    archdeaconryId: congregation.archdeaconryId,
                }));
            });
    } else if (parishId) {
        get<Parish>(`api/parish/${parishId}`)
            .then(parish => {
                dispatch(setEvent({
                    date,
                    parishId: parish.id,
                    archdeaconryId: parish.archdeaconryId,
                }));
            });
    } else if (archdeaconryId) {
        get<Archdeaconry>(`api/archdeaconry/${archdeaconryId}`)
            .then(archdeaconry => {
                dispatch(setEvent({
                    date,
                    archdeaconryId: archdeaconry.id,
                }));
            });
    } else {
        dispatch(setEvent({
            date,
        }));
    }
};

const setEvent = (event: Event): AppThunkAction<Action> => (dispatch) => {
    dispatch(setEventAction(event));
    dispatch(loadParishes(event.archdeaconryId));
    dispatch(loadCongregations(event.parishId));
}

const loadEvent = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Event>(`api/event/${id}`)
        .then(event => {
            dispatch(setEvent(event));
        });
};

const saveEvent = (event: Event, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const action = event.id ? 'edit' : 'add';

    post<Event>(`api/event/${action}`, event)
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

const setEventTypeId = (eventTypeId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setEventTypeIdAction(eventTypeId));
};

const setArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setArchdeaconryIdAction(archdeaconryId));
    dispatch(loadParishes(archdeaconryId));
    dispatch(setParishId(undefined));
};

const setParishId = (parishId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParishIdAction(parishId));
    dispatch(loadCongregations(parishId));
    dispatch(setCongregationId(undefined));
}

const setCongregationId = (congregationId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setCongregationIdAction(congregationId));
};

const setFirstPersonName = (firstPersonName: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setFirstPersonNameAction(firstPersonName));
};

const setSecondPersonName = (secondPersonName: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSecondPersonNameAction(secondPersonName));
};

const setDate = (date: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDateAction(date));
};

export const actionCreators = {
    prefillEvent,
    loadEvent,
    saveEvent,
    setEventTypeId,
    setCongregationId,
    setParishId,
    setArchdeaconryId,
    setFirstPersonName,
    setSecondPersonName,
    setDate,
};

export interface State {
    isLoading: boolean;
    congregationsLoading: boolean;
    congregations: Congregation[];
    event: Event;
    involvesTwoPeople: boolean;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    event: {},
    involvesTwoPeople: false,
    congregations: [],
    isLoading: true,
    congregationsLoading: true,
    hasBeenChanged: false,
    isSaving: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case SET_EVENT:
            return {
                ...state,
                event: action.value,
                errors: {},
                isLoading: false,
                hasBeenChanged: false,
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
        case SET_ARCHDEACONRY_ID:
            return {
                ...state,
                event: {
                    ...state.event,
                    archdeaconryId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_PARISH_ID:
            return {
                ...state,
                event: {
                    ...state.event,
                    parishId: action.value,
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
        case SET_FIRST_PERSON_NAME:
            return {
                ...state,
                event: {
                    ...state.event,
                    firstPersonName: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_SECOND_PERSON_NAME:
            return {
                ...state,
                event: {
                    ...state.event,
                    secondPersonName: action.value,
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