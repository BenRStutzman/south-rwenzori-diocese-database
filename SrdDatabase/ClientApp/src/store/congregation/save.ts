import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../apiHelpers';
import { Congregation } from '.';
import { History } from 'history';
import { loadParishes, RECEIVE_PARISHES, REQUEST_PARISHES } from '../parish/search';
import { Parish } from '../parish';

export const RESET_CONGREGATION = 'RESET_CONGREGATION';
export const REQUEST_CONGREGATION = 'REQUEST_CONGREGATION';
export const RECEIVE_CONGREGATION = 'RECEIVE_CONGREGATION';
export const SET_CONGREGATION_NAME = 'SET_CONGREGATION_NAME';
export const SET_CONGREGATION_PARISH_ID = 'SET_CONGREGATION_ARCHDEACONRY_ID';
export const SET_CONGREGATION_HAS_BEEN_SAVED = 'SET_CONGREGATION_HAS_BEEN_SAVED';
export const SET_CONGREGATION_ERRORS = 'SET_CONGREGATION_ERRORS';

export const resetCongregationAction = () => ({
    type: RESET_CONGREGATION,
})

export const requestCongregationAction = () => ({
    type: REQUEST_CONGREGATION,
});

export const receiveCongregationAction = (congregation: Congregation) => ({
    type: RECEIVE_CONGREGATION,
    value: congregation,
});

export const setCongregationNameAction = (name: string) => ({
    type: SET_CONGREGATION_NAME,
    value: name,
});

export const setCongregationParishIdAction = (parishId: number) => ({
    type: SET_CONGREGATION_PARISH_ID,
    value: parishId,
});

export const setCongregationHasBeenSavedAction = () => ({
    type: SET_CONGREGATION_HAS_BEEN_SAVED,
});

export const setCongregationErrorsAction = (errors: Errors) => ({
    type: SET_CONGREGATION_ERRORS,
    value: errors,
})

export interface State {
    congregationLoading: boolean;
    parishesLoading: boolean;
    parishes: Parish[];
    congregation: Congregation;
    hasBeenChanged: boolean,
    hasBeenSaved: boolean;
    errors: Errors;
}

const initialState: State = {
    congregation: {},
    parishes: [],
    congregationLoading: true,
    parishesLoading: true,
    hasBeenChanged: false,
    hasBeenSaved: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case RESET_CONGREGATION:
            return {
                ...state,
                congregation: {},
                congregationLoading: true
            }
        case REQUEST_CONGREGATION:
            return {
                ...state,
                congregationLoading: true,
            };
        case RECEIVE_CONGREGATION:
            return {
                ...state,
                congregation: action.value,
                errors: {},
                congregationLoading: false,
                hasBeenChanged: false,
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
        case SET_CONGREGATION_NAME:
            return {
                ...state,
                congregation: {
                    ...state.congregation,
                    name: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_CONGREGATION_PARISH_ID:
            return {
                ...state,
                congregation: {
                    ...state.congregation,
                    parishId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_CONGREGATION_HAS_BEEN_SAVED:
            return {
                ...state,
                hasBeenSaved: true,
            };
        case SET_CONGREGATION_ERRORS:
            return {
                ...state,
                errors: action.value,
            };
        default:
            return state;
    }
};

const loadCongregation = (id: number): AppThunkAction<Action> => (dispatch) => {
    get<Congregation>(`api/congregation/${id}`)
        .then(congregation => {
            dispatch(receiveCongregationAction(congregation));
        });

    dispatch(requestCongregationAction());
}

const saveCongregation = (congregation: Congregation, history: History): AppThunkAction<Action> => (dispatch) => {
    post<Congregation>('api/congregation/save', congregation)
        .then(response => {
            if (response.ok) {
                return response.json() as Promise<number>;
            } else {
                throw response.json();
            }
        }).then(congregationId => {
            if (congregation.id) {
                dispatch(loadCongregation(congregation.id));
            } else {
                history.push(`/congregation/edit/${congregationId}`);
            }
            dispatch(setCongregationHasBeenSavedAction());
        }).catch(errorPromise => {
            errorPromise.then((errorResponse: ErrorResponse) => {
                dispatch(setCongregationErrorsAction(errorResponse.errors));
            });
        });
};

const setCongregationName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setCongregationNameAction(name));
};

const setCongregationParishId = (parishId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setCongregationParishIdAction(parishId));
};

const resetCongregation = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetCongregationAction());
}

export const actionCreators = {
    loadParishes,
    resetCongregation,
    loadCongregation,
    saveCongregation,
    setCongregationName,
    setCongregationParishId,
};
