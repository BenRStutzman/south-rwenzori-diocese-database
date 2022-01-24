import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get } from '../../helpers/apiHelpers';
import { TransactionDetails } from '../../models/payment';

const REQUEST_DETAILS = 'TRANSACTION.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'TRANSACTION.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: TransactionDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

export interface State {
    detailsLoading: boolean;
    details: TransactionDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        transaction: {},
    },
};

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<TransactionDetails>(`api/transaction/details/${id}`)
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
