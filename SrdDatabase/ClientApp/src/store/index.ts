import * as Archdeaconries from './archdeaconries/Archdeaconries';

export interface State {
    archdeaconries: Archdeaconries.State;
}

export const reducers = {
    archdeaconries: Archdeaconries.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => State): void;
}