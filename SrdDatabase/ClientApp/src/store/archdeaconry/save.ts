import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../apiHelpers';
import { Archdeaconry } from '.';
import { History } from 'history';

export const RESET_ARCHDEACONRY = 'RESET_ARCHDEACONRY';
export const REQUEST_ARCHDEACONRY = 'REQUEST_ARCHDEACONRY';
export const RECEIVE_ARCHDEACONRY = 'RECEIVE_ARCHDEACONRY';
export const SET_ARCHDEACONRY_NAME = 'SET_ARCHDEACONRY_NAME';
export const SET_ARCHDEACONRY_HAS_BEEN_SAVED = 'SET_ARCHDEACONRY_HAS_BEEN_SAVED';
export const SET_ARCHDEACONRY_ERRORS = 'SET_ARCHDEACONRY_ERRORS';

export const resetArchdeaconryAction = () => ({
    type: RESET_ARCHDEACONRY,
})

export const requestArchdeaconryAction = () => ({
    type: REQUEST_ARCHDEACONRY,
});

export const receiveArchdeaconryAction = (archdeaconry: Archdeaconry) => ({
    type: RECEIVE_ARCHDEACONRY,
    value: archdeaconry,
});

export const setArchdeaconryNameAction = (name: string) => ({
    type: SET_ARCHDEACONRY_NAME,
    value: name,
});

export const setArchdeaconryHasBeenSavedAction = () => ({
    type: SET_ARCHDEACONRY_HAS_BEEN_SAVED,
});

export const setArchdeaconryErrorsAction = (errors: Errors) => ({
    type: SET_ARCHDEACONRY_ERRORS,
    value: errors,
})

export interface State {
    archdeaconryLoading: boolean;
    archdeaconry: Archdeaconry;
    hasBeenChanged: boolean,
    hasBeenSaved: boolean;
    errors: Errors;
}

const initialState: State = {
    archdeaconry: {},
    archdeaconryLoading: true,
    hasBeenChanged: false,
    hasBeenSaved: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case RESET_ARCHDEACONRY:
            return {
                ...initialState,
                archdeaconryLoading: false,
            }
        case REQUEST_ARCHDEACONRY:
            return {
                ...state,
                archdeaconryLoading: true,
            };
        case RECEIVE_ARCHDEACONRY:
            return {
                ...state,
                archdeaconry: action.value,
                errors: {},
                archdeaconryLoading: false,
                hasBeenChanged: false,
            };
        case SET_ARCHDEACONRY_NAME:
            return {
                ...state,
                archdeaconry: {
                    ...state.archdeaconry,
                    name: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_HAS_BEEN_SAVED:
            return {
                ...state,
                hasBeenSaved: true,
            };
        case SET_ARCHDEACONRY_ERRORS:
            return {
                ...state,
                errors: action.value,
                archdeaconryLoading: false,
            };
        default:
            return state;
    }
};

const loadArchdeaconry = (id: number): AppThunkAction<Action> => (dispatch) => {
    get<Archdeaconry>(`api/archdeaconry/${id}`)
        .then(archdeaconry => {
            dispatch(receiveArchdeaconryAction(archdeaconry));
        });

    dispatch(requestArchdeaconryAction());
}

const saveArchdeaconry = (archdeaconry: Archdeaconry, history: History): AppThunkAction<Action> => (dispatch) => {
    post<Archdeaconry>('api/archdeaconry/save', archdeaconry)
        .then(response => {
            if (response.ok) {
                return response.json() as Promise<number>;
            } else {
                throw response.json();
            }
        }).then(archdeaconryId => {
            if (archdeaconry.id) {
                dispatch(loadArchdeaconry(archdeaconry.id));
            } else {
                history.push(`/archdeaconry/edit/${archdeaconryId}`);
            }
            dispatch(setArchdeaconryHasBeenSavedAction());
        }).catch(errorPromise => {
            errorPromise.then((errorResponse: ErrorResponse) => {
                dispatch(setArchdeaconryErrorsAction(errorResponse.errors));
            });
        });

    dispatch(requestArchdeaconryAction());
};

const setArchdeaconryName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setArchdeaconryNameAction(name));
};

const resetArchdeaconry = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetArchdeaconryAction());
}

export const actionCreators = {
    resetArchdeaconry,
    loadArchdeaconry,
    saveArchdeaconry,
    setArchdeaconryName,
};
