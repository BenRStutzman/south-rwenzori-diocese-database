import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { get } from '../../../helpers/apiHelpers';
import { DistributionDetails } from '../../../models/sacco/distribution';

const REQUEST_DETAILS = 'SACCO_DISTRIBUTION.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'SACCO_DISTRIBUTION.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: DistributionDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<DistributionDetails>(`api/sacco/distribution/details/${id}`, '/sacco/distribution')
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
};

export const actionCreators = {
    loadDetails,
};

export interface State {
    detailsLoading: boolean;
    details: DistributionDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        distribution: {},
    },
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
