import * as Archdeaconry from './archdeaconry';
import * as Parish from './parish';
import * as Congregation from './congregation';
import * as Event from './event';

export interface State {
    archdeaconry: Archdeaconry.State;
    parish: Parish.State;
    congregation: Congregation.State;
    event: Event.State;
}

export interface Action {
    type: string;
    value?: any;
}

export const reducers = {
    archdeaconry: Archdeaconry.reducer,
    parish: Parish.reducer,
    congregation: Congregation.reducer,
    event: Event.reducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction | AppThunkAction<TAction>) => void, getState: () => State): void;
}