import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { Congregation } from '.';

export interface SearchParameters {
    name?: string;
    parishId?: number;
    archdeaconryId?: number;
}

const SET_SEARCH_NAME = 'CONGREGATION.SET_SEARCH_NAME';
const SET_SEARCH_ARCHDEACONRY_ID = 'CONGREGATION.SET_SEARCH_ARCHDEACONRY_ID';
const SET_SEARCH_PARISH_ID = 'CONGREGATION.SET_SEARCH_PARISH_ID';
const REQUEST_CONGREGATIONS = 'CONGREGATION.REQUEST_CONGREGATIONS';
const RECEIVE_CONGREGATIONS = 'CONGREGATION.RECEIVE_CONGREGATIONS';
const SET_DELETING_ID = 'CONGREGATION.SET_DELETING_ID';
const RESET_SEARCH_PARAMETERS = 'CONGREGATION.RESET_SEARCH_PARAMETERS';

const requestCongregationsAction = (showLoading: boolean = true) => ({
    type: REQUEST_CONGREGATIONS,
    value: showLoading,
});

const receiveCongregationsAction = (congregations: Congregation[]) => ({
    type: RECEIVE_CONGREGATIONS,
    value: congregations,
});

const setDeletingIdAction = (congregationId?: number) => ({
    type: SET_DELETING_ID,
    value: congregationId,
});

const setSearchNameAction = (name: string) => ({
    type: SET_SEARCH_NAME,
    value: name,
});

const setSearchArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_SEARCH_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const setSearchParishIdAction = (parishId: number) => ({
    type: SET_SEARCH_PARISH_ID,
    value: parishId,
});

const resetSearchParametersAction = () => ({
    type: RESET_SEARCH_PARAMETERS,
});

const resetSearchParameters = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(resetSearchParametersAction());
};

const setSearchName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchNameAction(name));
};

const setSearchArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchArchdeaconryIdAction(archdeaconryId));
};

const setSearchParishId = (parishId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchParishIdAction(parishId));
};

const searchCongregations = (
    showLoading: boolean = true,
    searchParameters: SearchParameters = {},
): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestCongregationsAction(showLoading));

    post<SearchParameters>('api/congregation/search', searchParameters)
        .then(response => response.json() as Promise<Congregation[]>)
        .then(parishes => {
            dispatch(receiveCongregationsAction(parishes));
        });
};

const deleteCongregation = (id: number, searchParameters: SearchParameters)
    : AppThunkAction<Action> => (dispatch) => {
    dispatch(setDeletingIdAction(id));

    post<{ id: number }>('api/congregation/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(searchCongregations(false, searchParameters));
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
    searchCongregations,
    deleteCongregation,
    resetSearchParameters,
    setSearchName,
    setSearchArchdeaconryId,
    setSearchParishId,
};

export interface State {
    resultsLoading: boolean;
    results: Congregation[];
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
        case SET_SEARCH_PARISH_ID:
            return {
                ...state,
                searchParameters: {
                    ...state.searchParameters,
                    parishId: action.value,
                }
            };
        case REQUEST_CONGREGATIONS:
            return {
                ...state,
                resultsLoading: action.value,
            };
        case RECEIVE_CONGREGATIONS:
            return {
                ...state,
                results: action.value,
                resultsLoading: false,
                deletingId: undefined,
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