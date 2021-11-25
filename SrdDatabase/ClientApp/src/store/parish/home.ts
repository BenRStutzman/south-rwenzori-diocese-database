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
const SET_DELETING_ID = 'PARISH.SET_DELETING_ID';
const SET_SEARCH_NAME = 'PARISH.SET_SEARCH_NAME';
const SET_SEARCH_ARCHDEACONRY_ID = 'PARISH.SET_SEARCH_ARCHDEACONRY_ID';
const RESET_SEARCH_PARAMETERS = 'PARISH.RESET_SEARCH_PARAMETERS';

const requestParishesAction = (showLoading: boolean = true) => ({
    type: REQUEST_PARISHES,
    value: showLoading,
});

const receiveParishesAction = (parishes: Parish[]) => ({
    type: RECEIVE_PARISHES,
    value: parishes,
});

const setDeletingIdAction = (parishId?: number) => ({
    type: SET_DELETING_ID,
    value: parishId,
});

const setSearchNameAction = (name: string) => ({
    type: SET_SEARCH_NAME,
    value: name,
});

const setSearchArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_SEARCH_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const resetSearchParametersAction = () => ({
    type: RESET_SEARCH_PARAMETERS,
});

const resetSearchParameters = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetSearchParametersAction());
};

export const setSearchName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchNameAction(name));
}

export const setSearchArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchArchdeaconryIdAction(archdeaconryId));
};

const searchParishes = (
    showLoading: boolean = true,
    searchParameters: SearchParameters = {},
): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestParishesAction(showLoading));

    post<SearchParameters>('api/parish/search', searchParameters)
        .then(response => response.json() as Promise<Parish[]>)
        .then(parishes => {
            dispatch(receiveParishesAction(parishes));
        });
};

const deleteParish = (id: number, searchParameters: SearchParameters): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDeletingIdAction(id));

    post<{ id: number }>('api/parish/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(searchParishes(false, searchParameters));
            } else {
                throw response.text();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorMessage: string) => {
                dispatch(setDeletingIdAction(undefined));
                alert(errorMessage);
            });
        });
};

export const actionCreators = {
    searchParishes,
    deleteParish,
    setSearchName,
    setSearchArchdeaconryId,
    resetSearchParameters,
};

export interface State {
    resultsLoading: boolean;
    results: Parish[];
    deletingId?: number;
    searchParameters: SearchParameters;
}

const initialState: State = {
    results: [],
    resultsLoading: true,
    deletingId: undefined,
    searchParameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case RESET_SEARCH_PARAMETERS:
            return {
                ...state,
                searchParameters: initialState.searchParameters,
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
                searchParameters: {
                    ...state.searchParameters,
                    name: action.value,
                }
            };
        case SET_SEARCH_ARCHDEACONRY_ID:
            return {
                ...state,
                searchParameters: {
                    ...state.searchParameters,
                    archdeaconryId: action.value,
                }
            };
        case SET_DELETING_ID:
            return {
                ...state,
                deletingId: action.value,
            };
        default:
            return state;
    }
};
