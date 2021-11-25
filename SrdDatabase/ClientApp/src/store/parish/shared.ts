import { Reducer } from "redux";
import { Action, AppThunkAction } from "..";
import { get } from "../../helpers/apiHelpers";
import { Archdeaconry } from "../archdeaconry";

const REQUEST_ARCHDEACONRIES = 'PARISH.REQUEST_ARCHDEACONRIES';
const RECEIVE_ARCHDEACONRIES = 'PARISH.RECEIVE_ARCHDEACONRIES';

const requestArchdeaconriesAction = () => ({
    type: REQUEST_ARCHDEACONRIES,
});

const receiveArchdeaconriesAction = (archdeaconries: Archdeaconry[]) => ({
    type: RECEIVE_ARCHDEACONRIES,
    value: archdeaconries,
});

const loadArchdeaconries = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestArchdeaconriesAction());

    get<Archdeaconry[]>('api/archdeaconry/all')
        .then(archdeaconries => {
            dispatch(receiveArchdeaconriesAction(archdeaconries));
        });
};

export const actionCreators = {
    loadArchdeaconries,
};

export interface State {
    archdeaconries: Archdeaconry[];
    archdeaconriesLoading: boolean;
}

const initialState: State = {
    archdeaconries: [],
    archdeaconriesLoading: true,
}

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_ARCHDEACONRIES:
            return {
                ...state,
                archdeaconriesLoading: true,
            };
        case RECEIVE_ARCHDEACONRIES:
            return {
                ...state,
                archdeaconries: action.value,
                archdeaconriesLoading: false,
            };
        default:
            return state;
    }
};
