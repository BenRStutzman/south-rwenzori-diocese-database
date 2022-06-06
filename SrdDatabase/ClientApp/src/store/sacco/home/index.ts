import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { get } from '../../../helpers/apiHelpers';
import { SaccoDetails } from '../../../models/sacco/home';
import { pagedResultsDefaults } from '../../../models/shared';

const REQUEST_DETAILS = 'SACCO_HOME.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'SACCO_HOME.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: SaccoDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

const loadDetails = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<SaccoDetails>('api/sacco/home/details')
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
}

export const actionCreators = {
    loadDetails,
};

export interface State {
    detailsLoading: boolean;
    details: SaccoDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        memberResults: { ...pagedResultsDefaults, members: [] },
        transactionResults: { ...pagedResultsDefaults, transactions: [] },
        distributionResults: { ...pagedResultsDefaults, distributions: [] },
        loanResults: { ...pagedResultsDefaults, loans: [] },
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
