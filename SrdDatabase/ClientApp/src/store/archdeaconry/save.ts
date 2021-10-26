import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../apiHelpers';
import { Archdeaconry } from '.';
import { History } from 'history';

const RESET_ARCHDEACONRY = 'ARCHDEACONRY.RESET_ARCHDEACONRY';
const REQUEST_ARCHDEACONRY = 'ARCHDEACONRY.REQUEST_ARCHDEACONRY';
const RECEIVE_ARCHDEACONRY = 'ARCHDEACONRY.RECEIVE_ARCHDEACONRY';
const SET_NAME = 'ARCHDEACONRY.SET_NAME';
const SET_IS_SAVING = 'ARCHDEACONRY.SET_IS_SAVING';
const SET_ERRORS = 'ARCHDEACONRY.SET_ERRORS';

const resetArchdeaconryAction = () => ({
    type: RESET_ARCHDEACONRY,
})

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
})

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

const resetArchdeaconry = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetArchdeaconryAction());
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

    post<Archdeaconry>('api/archdeaconry/save', archdeaconry)
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
    resetArchdeaconry,
    loadArchdeaconry,
    setName,
    saveArchdeaconry,
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case RESET_ARCHDEACONRY:
            return {
                ...state,
                archdeaconry: {},
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
