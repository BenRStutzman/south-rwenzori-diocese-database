import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { get } from '../../../helpers/apiHelpers';
import { DividendDetails } from '../../../models/sacco/dividend';

const REQUEST_DETAILS = 'SACCO_DIVIDEND.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'SACCO_DIVIDEND.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: DividendDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<DividendDetails>(`api/sacco/dividend/details/${id}`, '/sacco/dividend')
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
};

export const actionCreators = {
    loadDetails,
};

export interface State {
    detailsLoading: boolean;
    details: DividendDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        dividend: {},
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
