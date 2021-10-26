import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../apiHelpers';
import { Congregation } from '.';
import { History } from 'history';
import { Parish } from '../parish';

const REQUEST_CONGREGATION = 'CONGREGATION.REQUEST_CONGREGATION';
const RECEIVE_CONGREGATION = 'CONGREGATION.RECEIVE_CONGREGATION';
const REQUEST_PARISHES = 'CONGREGATION.REQUEST_PARISHES';
const RECEIVE_PARISHES = 'CONGREGATION.RECEIVE_PARISHES';
const SET_NAME = 'CONGREGATION.SET_NAME';
const SET_PARISH_ID = 'CONGREGATION.SET_PARISH_ID';
const SET_IS_SAVING = 'CONGREGATION.SET_IS_SAVING';
const SET_ERRORS = 'CONGREGATION.SET_ERRORS';

const requestCongregationAction = () => ({
    type: REQUEST_CONGREGATION,
});

const receiveCongregationAction = (congregation: Congregation) => ({
    type: RECEIVE_CONGREGATION,
    value: congregation,
});

const requestParishesAction = () => ({
    type: REQUEST_PARISHES,
});

const receiveParishesAction = (parishes: Parish[]) => ({
    type: RECEIVE_PARISHES,
    value: parishes,
});

const setNameAction = (name: string) => ({
    type: SET_NAME,
    value: name,
});

const setParishIdAction = (parishId: number) => ({
    type: SET_PARISH_ID,
    value: parishId,
});

const setIsSavingAction = (isSaving: boolean) => ({
    type: SET_IS_SAVING,
    value: isSaving,
});

const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
})

const resetCongregation = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(receiveCongregationAction(initialState.congregation));
}

const loadCongregation = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestCongregationAction());

    get<Congregation>(`api/congregation/${id}`)
        .then(congregation => {
            dispatch(receiveCongregationAction(congregation));
        });
}

const loadParishes = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestParishesAction());

    get<Parish[]>('api/parish/all')
        .then(parishes => {
            dispatch(receiveParishesAction(parishes));
        });
};

const setName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setNameAction(name));
};

const setParishId = (parishId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParishIdAction(parishId));
};

const saveCongregation = (congregation: Congregation, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    post<Congregation>('api/congregation/save', congregation)
        .then(response => {
            if (response.ok) {
                history.push('/congregation');
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

export const actionCreators = {
    loadParishes,
    resetCongregation,
    loadCongregation,
    saveCongregation,
    setName,
    setParishId,
};

export interface State {
    isSaving: boolean;
    congregationLoading: boolean;
    parishesLoading: boolean;
    parishes: Parish[];
    congregation: Congregation;
    hasBeenChanged: boolean,
    hasBeenSaved: boolean;
    errors: Errors;
}

const initialState: State = {
    isSaving: false,
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
        case REQUEST_CONGREGATION:
            return {
                ...state,
                congregationLoading: true,
            };
        case RECEIVE_CONGREGATION:
            return {
                ...state,
                congregation: action.value,
                congregationLoading: false,
                hasBeenChanged: false,
                errors: {},
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
        case SET_NAME:
            return {
                ...state,
                congregation: {
                    ...state.congregation,
                    name: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_PARISH_ID:
            return {
                ...state,
                congregation: {
                    ...state.congregation,
                    parishId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_IS_SAVING:
            return {
                ...state,
                isSaving: action.value,
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