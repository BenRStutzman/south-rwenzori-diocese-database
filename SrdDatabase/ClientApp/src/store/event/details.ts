import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get } from '../../helpers/apiHelpers';
import { Event } from '../event';

export interface EventDetails {
    event: Event;
}

const REQUEST_DETAILS = 'EVENT.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'EVENT.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: EventDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

export interface State {
    detailsLoading: boolean;
    details: EventDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        event: {},
    },
};

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<EventDetails>(`api/event/details/${id}`)
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
