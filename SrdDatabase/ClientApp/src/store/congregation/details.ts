import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get } from '../../helpers/apiHelpers';
import { CongregationDetails } from '../../models/congregation';
import { pagedResultsDefaults } from '../../models/shared';

const REQUEST_DETAILS = 'CONGREGATION.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'CONGREGATION.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: CongregationDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

export interface State {
    detailsLoading: boolean;
    details: CongregationDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        congregation: {},
        eventResults: { ...pagedResultsDefaults, events: [] },
        paymentResults: { ...pagedResultsDefaults, payments: [] },
    },
};

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<CongregationDetails>(`api/congregation/details/${id}`)
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
