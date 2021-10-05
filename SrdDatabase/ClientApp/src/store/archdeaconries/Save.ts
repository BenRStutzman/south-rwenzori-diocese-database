import { Action, Reducer } from 'redux';
import { AppThunkAction } from '..';
import { SaveResponse } from '../../responses';
import { Archdeaconry } from './Archdeaconries';

export interface State {
    isLoading: boolean;
    archdeaconry?: Archdeaconry;
}

interface RequestArchdeaconryAction {
    type: 'REQUEST_ARCHDEACONRY';
}

interface ReceiveArchdeaconryAction {
    type: 'RECEIVE_ARCHDEACONRY';
    archdeaconry: Archdeaconry;
}

interface SaveArchdeaconryAction {
    type: 'SAVE_ARCHDEACONRY';
}

interface UpdateArchdeaconryIdAction {
    type: 'UPDATE_ARCHDEACONRY_ID';
    archdeaconryId: number;
}

type KnownAction = RequestArchdeaconryAction | ReceiveArchdeaconryAction | SaveArchdeaconryAction | UpdateArchdeaconryIdAction;

export const actionCreators = {
    requestArchdeaconry: (id: number): AppThunkAction<KnownAction> => (dispatch) =>
    {
        fetch(`archdeaconry/${id}`)
            .then(response => response.json() as Promise<Archdeaconry>)
            .then(data => {
                dispatch({ type: 'RECEIVE_ARCHDEACONRY', archdeaconry: data });
            });

        dispatch({ type: 'REQUEST_ARCHDEACONRY' });
    },
    saveArchdeaconry: (archdeaconry: Archdeaconry): AppThunkAction<KnownAction> => (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(archdeaconry),
        };
        fetch('archdeaconry/save', requestOptions)
            .then(response => response.json() as Promise<SaveResponse>)
            .then(data => {
                dispatch({ type: 'UPDATE_ARCHDEACONRY_ID', archdeaconryId: data.id });
            });

        dispatch({ type: 'SAVE_ARCHDEACONRY' });
    }
};

const initialState: State = { archdeaconry: undefined, isLoading: false };

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
    if (state === undefined) {
        return initialState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case "REQUEST_ARCHDEACONRY":
            return {
                ...state,
                isLoading: true,
            };
        case "RECEIVE_ARCHDEACONRY":
            return {
                ...state,
                archdeaconry: action.archdeaconry,
                isLoading: false,
            };
        case "SAVE_ARCHDEACONRY":
            return {
                ...state,
                isLoading: true,
            };
        case "UPDATE_ARCHDEACONRY_ID":
            return {
                ...state,
                archdeaconry: {
                    ...state.archdeaconry,
                    id: action.archdeaconryId,
                },
            }
        default:
            return state;
    }
};
