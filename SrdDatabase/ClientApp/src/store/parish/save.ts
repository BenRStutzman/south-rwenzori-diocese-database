import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Parish } from '../../models/parish';
import { History } from 'history';

const REQUEST_PARISH = 'PARISH.REQUEST_PARISH';
const RECEIVE_PARISH = 'PARISH.RECEIVE_PARISH';
const SET_NAME = 'PARISH.SET_NAME';
const SET_ARCHDEACONRY_ID = 'PARISH.SET_ARCHDEACONRY_ID';
const SET_IS_SAVING = 'PARISH.SET_IS_SAVING';
const SET_ERRORS = 'PARISH.SET_ERRORS';

const requestParishAction = () => ({
    type: REQUEST_PARISH,
});

const receiveParishAction = (parish: Parish) => ({
    type: RECEIVE_PARISH,
    value: parish,
});

const setNameAction = (name: string) => ({
    type: SET_NAME,
    value: name,
});

const setArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const setIsSavingAction = (isSaving: boolean) => ({
    type: SET_IS_SAVING,
    value: isSaving,
});

const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
})

const resetParish = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(receiveParishAction(initialState.parish));
}

const loadParish = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestParishAction());

    get<Parish>(`api/parish/${id}`)
        .then(parish => {
            dispatch(receiveParishAction(parish));
        });
};

const setName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setNameAction(name));
};

const setArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setArchdeaconryIdAction(archdeaconryId));
};

const saveParish = (parish: Parish, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    post<Parish>('api/parish/save', parish)
        .then(response => {
            if (response.ok) {
                history.push('/parish');
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
    resetParish,
    loadParish,
    setName,
    setArchdeaconryId,
    saveParish,
};

export interface State {
    parishLoading: boolean;
    parish: Parish;
    hasBeenChanged: boolean,
    isSaving: boolean;
    hasBeenSaved: boolean;
    errors: Errors;
}

const initialState: State = {
    parishLoading: true,
    parish: {},
    hasBeenChanged: false,
    isSaving: false,
    hasBeenSaved: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_PARISH:
            return {
                ...state,
                parishLoading: true,
            };
        case RECEIVE_PARISH:
            return {
                ...state,
                parish: action.value,
                parishLoading: false,
                hasBeenChanged: false,
            };
        case SET_NAME:
            return {
                ...state,
                parish: {
                    ...state.parish,
                    name: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_ARCHDEACONRY_ID:
            return {
                ...state,
                parish: {
                    ...state.parish,
                    archdeaconryId: action.value,
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