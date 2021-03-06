import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { get } from '../../../helpers/apiHelpers';
import { LoanDetails } from '../../../models/sacco/loan';
import { pagedResultsDefaults } from '../../../models/shared';

const REQUEST_DETAILS = 'SACCO_LOAN.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'SACCO_LOAN.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: LoanDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<LoanDetails>(`api/sacco/loan/details/${id}`, '/sacco/loan')
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
};

export const actionCreators = {
    loadDetails,
};

export interface State {
    detailsLoading: boolean;
    details: LoanDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        loan: {},
        installmentResults: { ...pagedResultsDefaults, installments: [] },
        paymentResults: { ...pagedResultsDefaults, payments: [] },
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
