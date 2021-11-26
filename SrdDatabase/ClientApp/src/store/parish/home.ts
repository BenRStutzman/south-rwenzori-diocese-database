import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { Parish } from '.';

export interface SearchParameters {
    name?: string;
    archdeaconryId?: number;
}

const REQUEST_PARISHES = 'PARISH.REQUEST_PARISHES';
const RECEIVE_PARISHES = 'PARISH.RECEIVE_PARISHES';
const SET_SEARCH_NAME = 'PARISH.SET_SEARCH_NAME';
const SET_SEARCH_ARCHDEACONRY_ID = 'PARISH.SET_SEARCH_ARCHDEACONRY_ID';
const RESET_PARAMETERS = 'PARISH.RESET_PARAMETERS';

const requestParishesAction = (showLoading: boolean = true) => ({
    type: REQUEST_PARISHES,
    value: showLoading,
});

const receiveParishesAction = (parishes: Parish[]) => ({
    type: RECEIVE_PARISHES,
    value: parishes,
});

const setSearchNameAction = (name: string) => ({
    type: SET_SEARCH_NAME,
    value: name,
});

const setSearchArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_SEARCH_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const resetParametersAction = () => ({
    type: RESET_PARAMETERS,
});

const resetParameters = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetParametersAction());
};

export const setSearchName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchNameAction(name));
}

export const setSearchArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchArchdeaconryIdAction(archdeaconryId));
};

const searchParishes = (
    showLoading: boolean = true,
    parameters: SearchParameters = {},
): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestParishesAction(showLoading));

    post<SearchParameters>('api/parish/search', parameters)
        .then(response => response.json() as Promise<Parish[]>)
        .then(parishes => {
            dispatch(receiveParishesAction(parishes));
        });
};

export const actionCreators = {
    searchParishes,
    setSearchName,
    setSearchArchdeaconryId,
    resetParameters,
};

export interface State {
    resultsLoading: boolean;
    results: Parish[];
    deletingId?: number;
    parameters: SearchParameters;
}

const initialState: State = {
    results: [],
    resultsLoading: true,
    deletingId: undefined,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case RESET_PARAMETERS:
            return {
                ...state,
                parameters: initialState.parameters,
            };
        case REQUEST_PARISHES:
            return {
                ...state,
                resultsLoading: action.value,
            };
        case RECEIVE_PARISHES:
            return {
                ...state,
                results: action.value,
                resultsLoading: false,
                deletingId: undefined,
            };
        case SET_SEARCH_NAME:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    name: action.value,
                }
            };
        case SET_SEARCH_ARCHDEACONRY_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    archdeaconryId: action.value,
                }
            };
        default:
            return state;
    }
};
