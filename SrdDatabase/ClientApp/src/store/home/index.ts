import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get } from '../../helpers/apiHelpers';
import { Archdeaconry } from '../archdeaconry';
import { Congregation } from '../congregation';
import { Event } from '../event';
import { Parish } from '../parish';

export interface DioceseDetails {
    archdeaconries: Archdeaconry[];
    parishes: Parish[];
    congregations: Congregation[];
    recentEvents: Event[];
}

const REQUEST_DETAILS = 'HOME.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'HOME.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: DioceseDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

export interface State {
    detailsLoading: boolean;
    details: DioceseDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        archdeaconries: [],
        parishes: [],
        congregations: [],
        recentEvents: [],
    },
};

const loadDetails = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<DioceseDetails>('api/home/details')
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
}

export const actionCreators = {
    loadDetails,
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
