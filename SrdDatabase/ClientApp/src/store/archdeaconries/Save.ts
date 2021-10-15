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

export interface State {
    isLoading: boolean;
    archdeaconry: Archdeaconry;
}

const initialState: State = {
    archdeaconry: {
        name: '',
    },
    isLoading: true,
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case RESET_ARCHDEACONRY:
            return {
                ...state,
                archdeaconry: initialState.archdeaconry,
            }
        case REQUEST_ARCHDEACONRY:
            return {
                ...state,
                isLoading: true,
            }
        case RECEIVE_ARCHDEACONRY:
            return {
                ...state,
                archdeaconry: action.value,
                isLoading: false,
            };
        case SET_ARCHDEACONRY_NAME:
            return {
                ...state,
                archdeaconry: {
                    ...state.archdeaconry,
                    name: action.value,
                },
            }
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
