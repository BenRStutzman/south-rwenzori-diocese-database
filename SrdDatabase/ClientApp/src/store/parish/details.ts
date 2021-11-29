import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get } from '../../helpers/apiHelpers';
import { Parish } from '.';
import { Congregation } from '../congregation';
import { Event } from '../event';

export interface ParishDetails {
    parish?: Parish;
    congregations?: Congregation[];
    recentEvents?: Event[];
}

const REQUEST_DETAILS = 'PARISH.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'PARISH.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: ParishDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

export interface State {
    detailsLoading: boolean;
    details: ParishDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {},
};

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<ParishDetails>(`api/parish/details/${id}`)
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
