import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../apiHelpers';
import { Parish } from '.';
import { History } from 'history';
import { loadArchdeaconries, RECEIVE_ARCHDEACONRIES, REQUEST_ARCHDEACONRIES } from '../archdeaconry/search';
import { Archdeaconry } from '../archdeaconry';

export const RESET_PARISH = 'RESET_PARISH';
export const REQUEST_PARISH = 'REQUEST_PARISH';
export const RECEIVE_PARISH = 'RECEIVE_PARISH';
export const SET_PARISH_NAME = 'SET_PARISH_NAME';
export const SET_PARISH_ARCHDEACONRY_ID = 'SET_PARISH_ARCHDEACONRY_ID';
export const SET_HAS_BEEN_SAVED = 'SET_HAD_BEEN_SAVED';
export const SET_ERRORS = 'SET_ERRORS';

export const resetParishAction = () => ({
    type: RESET_PARISH,
})

export const requestParishAction = () => ({
    type: REQUEST_PARISH,
});

export const receiveParishAction = (parish: Parish) => ({
    type: RECEIVE_PARISH,
    value: parish,
});

export const setParishNameAction = (name: string) => ({
    type: SET_PARISH_NAME,
    value: name,
});

export const setParishArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_PARISH_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

export const setHasBeenSavedAction = () => ({
    type: SET_HAS_BEEN_SAVED,
});

export const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
})

export interface State {
    parishLoading: boolean;
    archdeaconriesLoading: boolean;
    archdeaconries: Archdeaconry[];
    parish: Parish;
    hasBeenChanged: boolean,
    hasBeenSaved: boolean;
    errors: Errors;
}

const initialState: State = {
    parish: {},
    archdeaconries: [],
    parishLoading: true,
    archdeaconriesLoading: true,
    hasBeenChanged: false,
    hasBeenSaved: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case RESET_PARISH:
            return initialState;
        case REQUEST_PARISH:
            return {
                ...state,
                parishLoading: true,
            };
        case RECEIVE_PARISH:
            return {
                ...state,
                parish: action.value,
                errors: {},
                parishLoading: false,
                hasBeenChanged: false,
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
                parish: {
                    ...state.parish,
                    archdeaconryId: state.parish.archdeaconryId ? state.parish.archdeaconryId : action.value[0].id,
                },
            };
        case SET_PARISH_NAME:
            return {
                ...state,
                parish: {
                    ...state.parish,
                    name: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_PARISH_ARCHDEACONRY_ID:
            return {
                ...state,
                parish: {
                    ...state.parish,
                    archdeaconryId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_HAS_BEEN_SAVED:
            return {
                ...state,
                hasBeenSaved: true,
            };
        case SET_ERRORS:
            return {
                ...state,
                errors: action.value,
            };
        default:
            return state;
    }
};

const loadParish = (id: number): AppThunkAction<Action> => (dispatch) => {
    get<Parish>(`api/parish/${id}`)
        .then(parish => {
            dispatch(receiveParishAction(parish));
        });

    dispatch(requestParishAction());
}

const saveParish = (parish: Parish, history: History): AppThunkAction<Action> => (dispatch) => {
    post<Parish>('api/parish/save', parish)
        .then(response => {
            if (response.ok) {
                return response.json() as Promise<number>;
            } else {
                throw response.json();
            }
        }).then(parishId => {
            if (parish.id) {
                dispatch(loadParish(parish.id));
            } else {
                history.push(`/parish/edit/${parishId}`);
            }
            dispatch(setHasBeenSavedAction());
        }).catch(errorPromise => {
            errorPromise.then((errorResponse: ErrorResponse) => {
                dispatch(setErrorsAction(errorResponse.errors));
            });
        });
};

const setParishName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParishNameAction(name));
};

const setParishArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParishArchdeaconryIdAction(archdeaconryId));
};

const resetParish = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetParishAction());
}

export const actionCreators = {
    loadArchdeaconries,
    resetParish,
    loadParish,
    saveParish,
    setParishName,
    setParishArchdeaconryId,
};
