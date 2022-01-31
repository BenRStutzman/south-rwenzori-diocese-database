import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get } from '../../helpers/apiHelpers';
import { ChargeDetails } from '../../models/charge';

const REQUEST_DETAILS = 'CHARGE.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'CHARGE.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: ChargeDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<ChargeDetails>(`api/charge/details/${id}`)
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
}

export const actionCreators = {
    loadDetails,
};

export interface State {
    detailsLoading: boolean;
    details: ChargeDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        charge: {},
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
