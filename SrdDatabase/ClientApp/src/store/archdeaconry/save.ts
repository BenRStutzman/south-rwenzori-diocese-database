import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Archdeaconry } from '../../models/archdeaconry';
import { History } from 'history';

const SET_IS_LOADING = 'ARCHDEACONRY.SET_IS_LOADING';
const SET_ARCHDEACONRY = 'ARCHDEACONRY.RECEIVE_ARCHDEACONRY';
const SET_NAME = 'ARCHDEACONRY.SET_NAME';
const SET_IS_SAVING = 'ARCHDEACONRY.SET_IS_SAVING';
const SET_ERRORS = 'ARCHDEACONRY.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setArchdeaconryAction = (archdeaconry: Archdeaconry) => ({
    type: SET_ARCHDEACONRY,
    value: archdeaconry,
});

const setNameAction = (name: string) => ({
    type: SET_NAME,
    value: name,
});

const setIsSavingAction = (isSaving: boolean) => ({
    type: SET_IS_SAVING,
    value: isSaving,
});

const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
});

const prefillArchdeaconry = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(setArchdeaconry({}));
};

const setArchdeaconry = (archdeaconry: Archdeaconry): AppThunkAction<Action> => (dispatch) => {
    dispatch(setArchdeaconryAction(archdeaconry));
}

const loadArchdeaconry = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Archdeaconry>(`api/archdeaconry/${id}`)
        .then(archdeaconry => {
            dispatch(setArchdeaconry(archdeaconry));
        });
}

const setName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setNameAction(name));
};

const saveArchdeaconry = (archdeaconry: Archdeaconry, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const action = archdeaconry.id ? 'edit' : 'add';

    post<Archdeaconry>(`api/archdeaconry/${action}`, archdeaconry)
        .then(response => {
            if (response.ok) {
                history.push('/archdeaconry');
            } else {
                throw response.json();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorResponse: ErrorResponse) => {
                dispatch(setErrorsAction(errorResponse.errors));
            });
        }).finally(() => {
            dispatch(setIsSavingAction(false))
        });
};

export const actionCreators = {
    prefillArchdeaconry,
    loadArchdeaconry,
    setName,
    saveArchdeaconry,
};

export interface State {
    isLoading: boolean;
    archdeaconry: Archdeaconry;
    hasBeenChanged: boolean,
    isSaving: boolean;
    errors: Errors;
}

const initialState: State = {
    isLoading: true,
    archdeaconry: {},
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
        case SET_ARCHDEACONRY:
            return {
                ...state,
                isLoading: false,
                archdeaconry: action.value,
                hasBeenChanged: false,
                errors: {},
            };
        case SET_NAME:
            return {
                ...state,
                archdeaconry: {
                    ...state.archdeaconry,
                    name: action.value,
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
