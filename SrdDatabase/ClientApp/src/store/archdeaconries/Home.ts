import { Reducer } from 'redux';
import { AppThunkAction } from '..';
import { SetIsLoadingAction } from '../sharedActions';
import { Archdeaconry } from './Archdeaconry';

export interface State {
    isLoading: boolean;
    archdeaconries: Archdeaconry[];
}

const initialState: State = { archdeaconries: [], isLoading: true };

interface LoadArchdeaconriesAction {
    type: 'LOAD_ARCHDEACONRIES';
    value: Archdeaconry[];
}

type Action = LoadArchdeaconriesAction | SetIsLoadingAction;

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.value,
            };
        case 'LOAD_ARCHDEACONRIES':
            return {
                ...state,
                archdeaconries: action.value,
                isLoading: false,
            };
        default:
            return state;
    }
};

export const actionCreators = {
    loadArchdeaconries: (): AppThunkAction<Action> => (dispatch) => {
        fetch('api/archdeaconry/all')
            .then(response => response.json() as Promise<Archdeaconry[]>)
            .then(archdeaconries => {
                dispatch({ type: 'LOAD_ARCHDEACONRIES', value: archdeaconries });
            });

        dispatch({ type: 'SET_IS_LOADING', value: true });
    }
};
