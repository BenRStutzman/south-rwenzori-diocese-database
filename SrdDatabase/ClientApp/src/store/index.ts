import * as Archdeaconries from './archdeaconries/archdeaconry';

export interface State {
    archdeaconries: Archdeaconries.State;
}

export interface Action {
    type: string;
    value?: any;
}

export const reducers = {
    archdeaconries: Archdeaconries.reducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction | AppThunkAction<TAction>) => void, getState: () => State): void;
}