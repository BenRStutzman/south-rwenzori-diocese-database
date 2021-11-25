import { Reducer } from 'redux';
import { Action, AppThunkAction } from '.';
import { get } from '../helpers/apiHelpers';
import { Archdeaconry } from './archdeaconry';
import { Congregation } from './congregation';
import { Parish } from './parish';

const REQUEST_ARCHDEACONRIES = 'REQUEST_ARCHDEACONRIES';
const RECEIVE_ARCHDEACONRIES = 'RECEIVE_ARCHDEACONRIES';
const REQUEST_PARISHES = 'REQUEST_PARISHES';
const RECEIVE_PARISHES = 'RECEIVE_PARISHES';
const REQUEST_CONGREGATIONS = 'REQUEST_CONGREGATIONS';
const RECEIVE_CONGREGATIONS = 'RECIEVE_CONGREGATIONS';

const requestArchdeaconriesAction = () => ({
    type: REQUEST_ARCHDEACONRIES,
});

const receiveArchdeaconriesAction = (archdeaconries: Archdeaconry[]) => ({
    type: RECEIVE_ARCHDEACONRIES,
    value: archdeaconries,
});

const requestParishesAction = () => ({
    type: REQUEST_PARISHES,
});

const receiveParishesAction = (parishes: Parish[]) => ({
    type: RECEIVE_PARISHES,
    value: parishes,
});

const requestCongregationsAction = () => ({
    type: REQUEST_CONGREGATIONS,
});

const receiveCongregationsAction = (congregations: Congregation[]) => ({
    type: RECEIVE_CONGREGATIONS,
    value: congregations,
});

const loadArchdeaconries = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestArchdeaconriesAction());

    get<Archdeaconry[]>('api/archdeaconry/all')
        .then(archdeaconries => {
            dispatch(receiveArchdeaconriesAction(archdeaconries));
        });
};

const loadParishes = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestParishesAction());

    get<Archdeaconry[]>('api/parish/all')
        .then(parishes => {
            dispatch(receiveParishesAction(parishes));
        });
};

const loadCongregations = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestCongregationsAction());

    get<Archdeaconry[]>('api/congregation/all')
        .then(congregations => {
            dispatch(receiveCongregationsAction(congregations));
        });
};

export const actionCreators = {
    loadArchdeaconries,
    loadParishes,
    loadCongregations,
};

export interface State {
    archdeaconries: Archdeaconry[];
    archdeaconriesLoading: boolean;
    parishes: Parish[];
    parishesLoading: boolean;
    conregations: Congregation[];
    congregationsLoading: boolean;
}

const initialState: State = {
    archdeaconries: [],
    archdeaconriesLoading: true,
    parishes: [],
    parishesLoading: true,
    conregations: [],
    congregationsLoading: true,
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
        case REQUEST_PARISHES:
            return {
                ...state,
                parishesLoading: true,
            };
        case RECEIVE_PARISHES:
            return {
                ...state,
                parishes: action.value,
                parishesLoading: false,
            };
        case REQUEST_CONGREGATIONS:
            return {
                ...state,
                congregationsLoading: true,
            };
        case RECEIVE_CONGREGATIONS:
            return {
                ...state,
                conregations: action.value,
                congregationsLoading: false,
            };
        default:
            return state;
    }
};
