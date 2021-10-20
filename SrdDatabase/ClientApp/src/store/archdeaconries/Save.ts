import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get, post } from '../../apiHelpers';
import { SaveResponse } from '../../sharedResponses';
import { Archdeaconry } from './archdeaconry';
import { History } from 'history';

export const RESET_ARCHDEACONRY = 'RESET_ARCHDEACONRY';
export const REQUEST_ARCHDEACONRY = 'REQUEST_ARCHDEACONRY';
export const RECEIVE_ARCHDEACONRY = 'RECEIVE_ARCHDEACONRY';
export const SET_ARCHDEACONRY_NAME = 'SET_ARCHDEACONRY_NAME';
export const SET_HAS_BEEN_SAVED = 'SET_HAD_BEEN_SAVED';

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

export const setHasBeenSavedAction = () => ({
    type: SET_HAS_BEEN_SAVED,
});

export interface State {
    isLoading: boolean;
    archdeaconry: Archdeaconry;
    hasBeenChanged: boolean,
    hasBeenSaved: boolean;
}

const initialState: State = {
    archdeaconry: {
        name: '',
    },
    isLoading: true,
    hasBeenChanged: false,
    hasBeenSaved: false,
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case RESET_ARCHDEACONRY:
            return initialState;
        case REQUEST_ARCHDEACONRY:
            return {
                ...state,
                isLoading: true,
            };
        case RECEIVE_ARCHDEACONRY:
            return {
                ...state,
                archdeaconry: action.value,
                isLoading: false,
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
    post<Archdeaconry, SaveResponse>('api/archdeaconry/save', archdeaconry)
        .then(response => {
            if (archdeaconry.id) {
                dispatch(loadArchdeaconry(response.id));
            } else {
                history.push(`/archdeaconry/edit/${response.id}`);
            }
            dispatch(setHasBeenSavedAction());
        });
}

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
