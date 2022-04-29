import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get } from '../../helpers/apiHelpers';
import { MemberDetails } from '../../models/member';
import { pagedResultsDefaults } from '../../models/shared';

const REQUEST_DETAILS = 'MEMBER.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'MEMBER.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: MemberDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<MemberDetails>(`api/sacco/member/details/${id}`, '/member')
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
}

export const actionCreators = {
    loadDetails,
};

export interface State {
    detailsLoading: boolean;
    details: MemberDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        member: {},
        parishResults: { ...pagedResultsDefaults, parishes: [] },
        congregationResults: { ...pagedResultsDefaults, congregations: [] },
        eventResults: { ...pagedResultsDefaults, events: [] },
        paymentResults: { ...pagedResultsDefaults, payments: [] },
        quotaResults: { ...pagedResultsDefaults, quotas: [] },
        censusResults: { ...pagedResultsDefaults, censuses: [] },
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
