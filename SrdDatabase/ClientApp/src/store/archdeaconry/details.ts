import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { get } from '../../helpers/apiHelpers';
import { ArchdeaconryDetails } from '../../models/archdeaconry';
import { pagedResultsDefaults } from '../../models/shared';

const REQUEST_DETAILS = 'ARCHDEACONRY.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'ARCHDEACONRY.RECEIVE_DETAILS';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: ArchdeaconryDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());

    get<ArchdeaconryDetails>(`api/archdeaconry/details/${id}`)
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
}

export const actionCreators = {
    loadDetails,
};

export interface State {
    detailsLoading: boolean;
    details: ArchdeaconryDetails;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        archdeaconry: {},
        parishResults: { ...pagedResultsDefaults, parishes: [] },
        congregationResults: { ...pagedResultsDefaults, congregations: [] },
        eventResults: { ...pagedResultsDefaults, events: [] },
        paymentResults: { ...pagedResultsDefaults, payments: [] },
        chargeResults: { ...pagedResultsDefaults, charges: [] },
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
