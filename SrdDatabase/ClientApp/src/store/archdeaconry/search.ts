import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../apiHelpers';
import { Archdeaconry } from '.';

export interface State {
    archdeaconries: Archdeaconry[];
    archdeaconriesLoading: boolean;
}

const initialState: State = {
    archdeaconries: [],
    archdeaconriesLoading: true
};

export const REQUEST_PARISHES = 'REQUEST_ARCHDEACONRIES';
export const RECEIVRECEIVE_PARISHESCEIVE_ARCHDEACONRIES';

export const requestArchdeaconriesAction = (showLoading: boolean = true) => ({
    type: REQUEST_PARISHES,
    value: showLoading,
});

export const receiveArchdeaconriesAction = (archdeaconries: Archdeaconry[]) => ({
    type: RECEIVE_ARCHRECEIVE_PARISHES: archdeaconries,
});

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_PARISHES:
            return {
                ...state,
                archdeaconriesLoading: action.value,
            };
        case RECEIVE_ARCHDEACONRECEIVE_PARISHESurn {
                ...state,
                archdeaconries: action.value,
                archdeaconriesLoading: false,
            };
        default:
            return state;
    }
};

export const loadParishes = (showLoading: boolean = true): AppThunkAction<Action> => (dispatch) => {
    get<Archdeaconry[]>('api/archdeaconry/all')
        .then(archdeaconries => {
            dispatch(receiveArchdeaconriesAction(archdeaconries));
        });

    dispatch(requestArchdeaconriesAction(showLoading));
};

const deleteArchdeaconry = (id: number): AppThunkAction<Action> => (dispatch) => {
    post<{ id: number }>('api/archdeaconry/delete', { id })
        .then(response => {
            if (response.ok) {
                dispatch(loadParishes(false));
            } else {
                throw response.text();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorMessage: string) => {
                alert(errorMessage);
            });
        });
};

export const actionCreators = {
    loadParishes,
    deleteArchdeaconry,
};
