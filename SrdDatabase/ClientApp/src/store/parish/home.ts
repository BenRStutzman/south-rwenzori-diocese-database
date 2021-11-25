import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { post } from '../../helpers/apiHelpers';
import { Parish, SearchParameters } from '.';
import { Archdeaconry } from '../archdeaconry';

const REQUEST_PARISHES = 'PARISH.REQUEST_PARISHES';
const RECEIVE_PARISHES = 'PARISH.RECEIVE_PARISHES';
const SET_DELETING_ID = 'PARISH.SET_DELETING_ID';
const SET_SEARCH_NAME = 'PARISH.SET_SEARCH_NAME';
const SET_SEARCH_ARCHDEACONRY_ID = 'PARISH.SET_SEARCH_ARCHDEACONRY_ID';

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
};

export interface State {
    archdeaconries: Archdeaconry[];
    archdeaconriesLoading: boolean;
    parishesLoading: boolean;
    parishes: Parish[];
    deletingId?: number;
    searchParameters: SearchParameters;
}

const initialState: State = {
    archdeaconries: [],
    archdeaconriesLoading: true,
    parishes: [],
    parishesLoading: true,
    deletingId: undefined,
    searchParameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_PARISHES:
            return {
                ...state,
                parishesLoading: action.value,
            };
        case RECEIVE_PARISHES:
            return {
                ...state,
                parishes: action.value,
                parishesLoading: false,
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
