import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { get } from '../../../helpers/apiHelpers';
import { InstallmentDetails } from '../../../models/sacco/installment';

const REQUEST_DETAILS = 'SACCO_INSTALLMENT.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'SACCO_INSTALLMENT.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: InstallmentDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<InstallmentDetails>(`api/sacco/installment/details/${id}`, '/sacco/installment')
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
};

export const actionCreators = {
    loadDetails,
};

export interface State {
    detailsLoading: boolean;
    details: InstallmentDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        installment: {},
        fineWindows: [],
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
