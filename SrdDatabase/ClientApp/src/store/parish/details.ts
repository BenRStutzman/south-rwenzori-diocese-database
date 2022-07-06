import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get } from '../../helpers/apiHelpers';
import { ParishDetails } from '../../models/parish';
import { pagedResultsDefaults } from '../../models/shared';

const REQUEST_DETAILS = 'PARISH.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'PARISH.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: ParishDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<ParishDetails>(`api/parish/details/${id}`, '/parish')
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
}

export const actionCreators = {
    loadDetails,
};

export interface State {
    detailsLoading: boolean;
    details: ParishDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        parish: {},
        population: {},
        congregationResults: { ...pagedResultsDefaults, congregations: [] },
        eventResults: { ...pagedResultsDefaults, events: [] },
        paymentResults: { ...pagedResultsDefaults, payments: [] },
        quotaResults: { ...pagedResultsDefaults, quotas: [] },
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
