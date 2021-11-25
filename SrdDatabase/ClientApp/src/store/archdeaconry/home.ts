import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { Archdeaconry, SearchParameters } from '.';

const REQUEST_ARCHDEACONRIES = 'ARCHDEACONRY.REQUEST_ARCHDEACONRIES';
const RECEIVE_ARCHDEACONRIES = 'ARCHDEACONRY.RECEIVE_ARCHDEACONRIES';
const SET_DELETING_ID = 'ARCHDEACONRY.SET_DELETING_ID';
const SET_SEARCH_NAME = 'ARCHDEACONRY.SET_SEARCH_NAME';
const RESET_SEARCH_PARAMETERS = 'ARCHDEACONRY.RESET_SEARCH_PARAMETERS';

const requestArchdeaconriesAction = (showLoading: boolean = true) => ({
    type: REQUEST_ARCHDEACONRIES,
    value: showLoading,
});

const receiveArchdeaconriesAction = (archdeaconries: Archdeaconry[]) => ({
    type: RECEIVE_ARCHDEACONRIES,
    value: archdeaconries,
});

const setDeletingIdAction = (archdeaconryId?: number) => ({
    type: SET_DELETING_ID,
    value: archdeaconryId,
});

const setSearchNameAction = (name: string) => ({
    type: SET_SEARCH_NAME,
    value: name,
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

const searchArchdeaconries = (
    showLoading: boolean = true,
    searchParameters: SearchParameters = {},
): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestArchdeaconriesAction(showLoading));

    post<SearchParameters>('api/archdeaconry/search', searchParameters)
        .then(response => response.json() as Promise<Archdeaconry[]>)
        .then(archdeaconries => {
            dispatch(receiveArchdeaconriesAction(archdeaconries));
        });
};

const deleteArchdeaconry = (id: number, searchParameters: SearchParameters): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDeletingIdAction(id));

    post<{ id: number }>('api/archdeaconry/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(searchArchdeaconries(false, searchParameters));
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
    searchArchdeaconries,
    deleteArchdeaconry,
    setSearchName,
    resetSearchParameters,
};

export interface State {
    results: Archdeaconry[];
    resultsLoading: boolean;
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
                deletingId: undefined,
            };
        case SET_DELETING_ID:
            return {
                ...state,
                deletingId: action.value,
            };
        case SET_SEARCH_NAME:
            return {
                ...state,
                searchParameters: {
                    ...state.searchParameters,
                    name: action.value,
                }
            };
        default:
            return state;
    }
};