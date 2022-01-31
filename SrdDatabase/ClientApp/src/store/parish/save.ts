import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Parish } from '../../models/parish';
import { History } from 'history';
import { Archdeaconry } from '../../models/archdeaconry';

const SET_IS_LOADING = 'PARISH.SET_IS_LOADING';
const SET_PARISH = 'PARISH.SET_PARISH';
const SET_NAME = 'PARISH.SET_NAME';
const SET_ARCHDEACONRY_ID = 'PARISH.SET_ARCHDEACONRY_ID';
const SET_IS_SAVING = 'PARISH.SET_IS_SAVING';
const SET_ERRORS = 'PARISH.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setParishAction = (parish: Parish) => ({
    type: SET_PARISH,
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

const prefillParish = (archdeaconryId?: number): AppThunkAction<Action> => (dispatch) => {
    const backupUrl = '/parish/add';

    if (archdeaconryId) {
        get<Archdeaconry>(`api/archdeaconry/${archdeaconryId}`, backupUrl)
            .then(() => {
                dispatch(setParish({
                    archdeaconryId,
                }));
            });
    } else {
        dispatch(setParish({}));
    }
}

const loadParish = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Parish>(`api/parish/${id}`)
        .then(parish => {
            dispatch(setParish(parish));
        });
};

const setParish = (parish: Parish): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParishAction(parish));
};

const setName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setNameAction(name));
};

const setArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setArchdeaconryIdAction(archdeaconryId));
};

const saveParish = (parish: Parish, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const action = parish.id ? 'edit' : 'add';

    post<Parish>(`api/parish/${action}`, parish)
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
    prefillParish,
    loadParish,
    setName,
    setArchdeaconryId,
    saveParish,
};

export interface State {
    isLoading: boolean;
    parish: Parish;
    hasBeenChanged: boolean,
    isSaving: boolean;
    hasBeenSaved: boolean;
    errors: Errors;
}

const initialState: State = {
    isLoading: true,
    parish: {},
    hasBeenChanged: false,
    isSaving: false,
    hasBeenSaved: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case SET_PARISH:
            return {
                ...state,
                parish: action.value,
                isLoading: false,
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