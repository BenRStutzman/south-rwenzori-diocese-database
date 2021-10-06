import { Reducer } from 'redux';
import { AppThunkAction } from '..';
import { get, post } from '../../apiHelpers';
import { PostResponse } from '../../sharedResponses';
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

const loadArchdeaconries = (): AppThunkAction<Action> => (dispatch) => {
    get<Archdeaconry[]>('api/archdeaconry/all')
        .then(archdeaconries => {
            dispatch({ type: 'LOAD_ARCHDEACONRIES', value: archdeaconries });
        });

    dispatch({ type: 'SET_IS_LOADING', value: true });
};

const deleteArchdeaconry = (id: number): AppThunkAction<AppThunkAction<Action>> => (dispatch) => {
    post<{ id: number }, PostResponse>('api/archdeaconry/delete', { id })
        .then(response => {
            if (response.succeeded) {
                dispatch(loadArchdeaconries());
            } else {
                alert(response.errorMessage);
            }
        });
};

export const actionCreators = {
    loadArchdeaconries,
    deleteArchdeaconry,
};
