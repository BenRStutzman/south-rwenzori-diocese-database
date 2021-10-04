import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ArchdeaconriesState {
    isLoading: boolean;
    archdeaconries: Archdeaconry[];
}

export interface Archdeaconry {
    id: string;
    name: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestArchdeaconriesAction {
    type: 'REQUEST_ARCHDEACONRIES';
}

interface ReceiveArchdeaconriesAction {
    type: 'RECEIVE_ARCHDEACONRIES';
    archdeaconries: Archdeaconry[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestArchdeaconriesAction | ReceiveArchdeaconriesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestArchdeaconries: (): AppThunkAction<KnownAction> => (dispatch, getState) =>
    {
        const appState = getState();
        if (appState) {
            fetch('archdeaconry/all')
                .then(response => response.json() as Promise<Archdeaconry[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_ARCHDEACONRIES', archdeaconries: data });
                });

            dispatch({ type: 'REQUEST_ARCHDEACONRIES' });
        }

    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ArchdeaconriesState = { archdeaconries: [], isLoading: false };

export const reducer: Reducer<ArchdeaconriesState> = (state: ArchdeaconriesState | undefined, incomingAction: Action): ArchdeaconriesState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ARCHDEACONRIES':
            return {
                archdeaconries: state.archdeaconries,
                isLoading: true
            };
        case 'RECEIVE_ARCHDEACONRIES':
            return {
                archdeaconries: action.archdeaconries,
                isLoading: false
            };
        default:
            return state;
    }
};
