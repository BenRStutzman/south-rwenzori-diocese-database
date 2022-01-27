import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Archdeaconry } from '../../models/archdeaconry';
import { History } from 'history';

const REQUEST_ARCHDEACONRY = 'ARCHDEACONRY.REQUEST_ARCHDEACONRY';
const RECEIVE_ARCHDEACONRY = 'ARCHDEACONRY.RECEIVE_ARCHDEACONRY';
const SET_NAME = 'ARCHDEACONRY.SET_NAME';
const SET_IS_SAVING = 'ARCHDEACONRY.SET_IS_SAVING';
const SET_ERRORS = 'ARCHDEACONRY.SET_ERRORS';

const requestArchdeaconryAction = () => ({
    type: REQUEST_ARCHDEACONRY,
});

const receiveArchdeaconryAction = (archdeaconry: Archdeaconry) => ({
    type: RECEIVE_ARCHDEACONRY,
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

const setArchdeaconry = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(receiveArchdeaconryAction({}));
};

const loadArchdeaconry = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestArchdeaconryAction());

    get<Archdeaconry>(`api/archdeaconry/${id}`)
        .then(archdeaconry => {
            dispatch(receiveArchdeaconryAction(archdeaconry));
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
    setArchdeaconry,
    loadArchdeaconry,
    setName,
    saveArchdeaconry,
};

export interface State {
    archdeaconryLoading: boolean;
    archdeaconry: Archdeaconry;
    hasBeenChanged: boolean,
    isSaving: boolean;
    errors: Errors;
}

const initialState: State = {
    archdeaconryLoading: true,
    archdeaconry: {},
    hasBeenChanged: false,
    isSaving: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_ARCHDEACONRY:
            return {
                ...state,
                archdeaconryLoading: true,
            };
        case RECEIVE_ARCHDEACONRY:
            return {
                ...state,
                archdeaconryLoading: false,
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
