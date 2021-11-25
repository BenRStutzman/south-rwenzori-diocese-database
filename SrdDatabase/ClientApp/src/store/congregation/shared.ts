import { Reducer } from "redux";
import { Action, AppThunkAction } from "..";
import { get } from "../../helpers/apiHelpers";
import { Parish } from "../parish/shared";

export interface Congregation {
    id?: number;
    name?: string;
    parishId?: number;
    parish?: string;
}

const REQUEST_PARISHES = 'PARISH.REQUEST_PARISHES';
const RECEIVE_PARISHES = 'PARISH.RECEIVE_PARISHES';

const requestParishesAction = () => ({
    type: REQUEST_PARISHES,
});

const receiveParishesAction = (parishes: Parish[]) => ({
    type: RECEIVE_PARISHES,
    value: parishes,
});

const loadParishes = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestParishesAction());

    get<Parish[]>('api/parish/all')
        .then(parishes => {
            dispatch(receiveParishesAction(parishes));
        });
};

export const actionCreators = {
    loadParishes,
};

export interface State {
    parishes: Parish[];
    parishesLoading: boolean;
}

const initialState: State = {
    parishes: [],
    parishesLoading: true,
}

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
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
        default:
            return state;
    }
};
