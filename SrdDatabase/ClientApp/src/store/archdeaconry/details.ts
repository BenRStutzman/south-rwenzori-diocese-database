import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get } from '../../helpers/apiHelpers';
import { Archdeaconry } from '.';
import { Parish } from '../parish';
import { Congregation } from '../congregation';
import { Event } from '../event';

export interface ArchdeaconryDetails {
    archdeaconry: Archdeaconry;
    parishes: Parish[];
    congregations: Congregation[];
    recentEvents: Event[];
}

const REQUEST_DETAILS = 'ARCHDEACONRY.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'ARCHDEACONRY.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: ArchdeaconryDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

export interface State {
    detailsLoading: boolean;
    details: ArchdeaconryDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        archdeaconry: {},
        parishes: [],
        congregations: [],
        recentEvents: [],
    },
};

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<ArchdeaconryDetails>(`api/archdeaconry/details/${id}`)
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
}

export const actionCreators = {
    loadDetails
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_DETAILS:
            return {
                ...state,
                detailsLoading: true,
            };
        case RECEIVE_DETAILS:
            return {
                ...state,
                detailsLoading: false,
                details: action.value,
            };
        default:
            return state;
    }
};
