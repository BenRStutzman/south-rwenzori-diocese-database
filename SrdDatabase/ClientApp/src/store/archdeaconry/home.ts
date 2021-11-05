import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../apiHelpers';
import { Archdeaconry } from '.';

const REQUEST_ARCHDEACONRIES = 'ARCHDEACONRY.REQUEST_ARCHDEACONRIES';
const RECEIVE_ARCHDEACONRIES = 'ARCHDEACONRY.RECEIVE_ARCHDEACONRIES';
const SET_DELETING_ID = 'ARCHDEACONRIES.SET_DELETING_ID';

const requestArchdeaconriesAction = (showLoading: boolean = true) => ({
    type: REQUEST_ARCHDEACONRIES,
    value: showLoading,
});

const receiveArchdeaconriesAction = (archdeaconries: Archdeaconry[]) => ({
    type: RECEIVE_ARCHDEACONRIES,
    value: archdeaconries,
});

const setDeletingId = (archdeaconryId?: number) => ({
    type: SET_DELETING_ID,
    value: archdeaconryId,
})

const loadArchdeaconries = (showLoading: boolean = true): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestArchdeaconriesAction(showLoading));

    get<Archdeaconry[]>('api/archdeaconry/all')
        .then(archdeaconries => {
            dispatch(receiveArchdeaconriesAction(archdeaconries));
        });
};

const deleteArchdeaconry = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDeletingId(id));

    post<{ id: number }>('api/archdeaconry/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(loadArchdeaconries(false));
            } else {
                throw response.text();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorMessage: string) => {
                alert(errorMessage);
            });
        }).finally(() => {
            dispatch(setDeletingId(undefined));
        });
};

export const actionCreators = {
    loadArchdeaconries,
    deleteArchdeaconry,
};

export interface State {
    archdeaconries: Archdeaconry[];
    archdeaconriesLoading: boolean;
    deletingId?: number;
}

const initialState: State = {
    archdeaconries: [],
    archdeaconriesLoading: true,
    deletingId: undefined,
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_ARCHDEACONRIES:
            return {
                ...state,
                archdeaconriesLoading: action.value,
            };
        case RECEIVE_ARCHDEACONRIES:
            return {
                ...state,
                archdeaconries: action.value,
                archdeaconriesLoading: false,
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