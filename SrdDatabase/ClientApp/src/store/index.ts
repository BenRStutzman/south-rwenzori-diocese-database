import * as Login from './login';
import * as User from './user';
import * as Archdeaconry from './archdeaconry';
import * as Parish from './parish';
import * as Congregation from './congregation';
import * as Event from './event';
import * as Shared from './shared';

export interface Action {
    type: string;
    value?: any;
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction | AppThunkAction<TAction>) => void, getState: () => State): void;
}

export interface State {
    login: Login.State;
    user: User.State;
    archdeaconry: Archdeaconry.State;
    parish: Parish.State;
    congregation: Congregation.State;
    event: Event.State;
    shared: Shared.State;
}

export const reducers = {
    login: Login.reducer,
    user: User.reducer,
    archdeaconry: Archdeaconry.reducer,
    parish: Parish.reducer,
    congregation: Congregation.reducer,
    event: Event.reducer,
    shared: Shared.reducer,
};