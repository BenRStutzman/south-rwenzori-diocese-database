import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { Archdeaconry, SearchParameters } from '.';

const REQUEST_ARCHDEACONRIES = 'ARCHDEACONRY.REQUEST_ARCHDEACONRIES';
const RECEIVE_ARCHDEACONRIES = 'ARCHDEACONRY.RECEIVE_ARCHDEACONRIES';
const SET_SEARCH_NAME = 'ARCHDEACONRY.SET_SEARCH_NAME';
const RESET_PARAMETERS = 'ARCHDEACONRY.RESET_PARAMETERS';

const requestArchdeaconriesAction = (showLoading: boolean = true) => ({
    type: REQUEST_ARCHDEACONRIES,
    value: showLoading,
});

const receiveArchdeaconriesAction = (archdeaconries: Archdeaconry[]) => ({
    type: RECEIVE_ARCHDEACONRIES,
    value: archdeaconries,
});

const setSearchNameAction = (name: string) => ({
    type: SET_SEARCH_NAME,
    value: name,
});

const resetSearchParametersAction = () => ({
    type: RESET_PARAMETERS,
});

const resetParameters = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetSearchParametersAction());
};

const setSearchName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchNameAction(name));
};

const searchArchdeaconries = (
    parameters: SearchParameters = {},
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestArchdeaconriesAction(showLoading));

    post<SearchParameters>('api/archdeaconry/search', parameters)
        .then(response => response.json() as Promise<Archdeaconry[]>)
        .then(archdeaconries => {
            dispatch(receiveArchdeaconriesAction(archdeaconries));
        });
};

export const actionCreators = {
    searchArchdeaconries,
    setSearchName,
    resetParameters,
};

export interface State {
    results: Archdeaconry[];
    resultsLoading: boolean;
    parameters: SearchParameters;
}

const initialState: State = {
    results: [],
    resultsLoading: true,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case RESET_PARAMETERS:
            return {
                ...state,
                parameters: {},
            };
        case REQUEST_ARCHDEACONRIES:
            return {
                ...state,
                resultsLoading: action.value,
            };
        case RECEIVE_ARCHDEACONRIES:
            return {
                ...state,
                results: action.value,
                resultsLoading: false,
            };
        case SET_SEARCH_NAME:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    name: action.value,
                }
            };
        default:
            return state;
    }
};