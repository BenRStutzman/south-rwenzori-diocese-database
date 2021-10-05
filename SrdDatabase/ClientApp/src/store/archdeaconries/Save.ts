import { Action, Reducer } from 'redux';
import { AppThunkAction } from '..';
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

type KnownAction = RequestArchdeaconryAction | ReceiveArchdeaconryAction;

export const actionCreators = {
    requestArchdeaconry: (id: number): AppThunkAction<KnownAction> => (dispatch) =>
    {
        fetch(`archdeaconry/${id}`)
            .then(response => response.json() as Promise<Archdeaconry>)
            .then(data => {
                dispatch({ type: 'RECEIVE_ARCHDEACONRY', archdeaconry: data });
            });

        dispatch({ type: 'REQUEST_ARCHDEACONRY' });
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
                archdeaconry: state.archdeaconry,
                isLoading: true,
            };
        case "RECEIVE_ARCHDEACONRY":
            return {
                ...state,
                archdeaconry: action.archdeaconry,
                isLoading: false,
            };
        default:
            return state;
    }
};
