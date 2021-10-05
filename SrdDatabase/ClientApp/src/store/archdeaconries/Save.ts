import { Reducer } from 'redux';
import { AppThunkAction } from '..';
import { post } from '../../apiHelpers';
import { SaveResponse } from '../../sharedResponses';
import { SetIsLoadingAction } from '../sharedActions';
import { Archdeaconry } from './Archdeaconries';

export interface State {
    isLoading: boolean;
    archdeaconry?: Archdeaconry;
}

const initialState: State = { archdeaconry: undefined, isLoading: false };

interface LoadArchdeaconryAction {
    type: 'LOAD_ARCHDEACONRY';
    value: Archdeaconry;
}

interface UpdateArchdeaconryIdAction {
    type: 'UPDATE_ARCHDEACONRY_ID';
    value: number;
}

interface UpdateArchdeaconryNameAction {
    type: 'UPDATE_ARCHDEACONRY_NAME';
    value: string;
}

type Action = LoadArchdeaconryAction | UpdateArchdeaconryIdAction | SetIsLoadingAction | UpdateArchdeaconryNameAction;

export const actionCreators = {
    loadArchdeaconry: (id: number): AppThunkAction<Action> => (dispatch) =>
    {
        fetch(`archdeaconry/${id}`)
            .then(response => response.json() as Promise<Archdeaconry>)
            .then(archdeaconry => {
                dispatch({ type: 'LOAD_ARCHDEACONRY', value: archdeaconry });
            });

        dispatch({ type: 'SET_IS_LOADING', value: true });
    },
    saveArchdeaconry: (archdeaconry: Archdeaconry): AppThunkAction<Action> => (dispatch) => {
        post<SaveResponse>('archdeaconry/save', archdeaconry)
            .then(response => {
                dispatch({ type: 'UPDATE_ARCHDEACONRY_ID', value: response.id });
            });

        dispatch({ type: 'SET_IS_LOADING', value: true });
    },
    updateArchdeaconryName: (name: string): AppThunkAction<Action> => (dispatch) => {
        dispatch({ type: 'UPDATE_ARCHDEACONRY_NAME', value: name });
    }
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case "SET_IS_LOADING":
            return {
                ...state,
                isLoading: false,
            };
        case "LOAD_ARCHDEACONRY":
            return {
                ...state,
                archdeaconry: action.value,
                isLoading: false,
            };
        case "UPDATE_ARCHDEACONRY_ID":
            return {
                ...state,
                archdeaconry: {
                    ...state.archdeaconry,
                    id: action.value,
                },
                isLoading: false,
            }
        case "UPDATE_ARCHDEACONRY_NAME":
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
