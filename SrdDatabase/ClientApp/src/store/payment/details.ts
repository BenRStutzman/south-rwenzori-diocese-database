import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get } from '../../helpers/apiHelpers';
import { PaymentDetails } from '../../models/payment';

const REQUEST_DETAILS = 'PAYMENT.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'PAYMENT.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: PaymentDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<PaymentDetails>(`api/payment/details/${id}`, '/payment')
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
};

export const actionCreators = {
    loadDetails,
};

export interface State {
    detailsLoading: boolean;
    details: PaymentDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        payment: {},
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
