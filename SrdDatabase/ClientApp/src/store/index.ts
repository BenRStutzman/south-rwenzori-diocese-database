import * as Login from './login';
import * as Home from './home';
import * as User from './user';
import * as Archdeaconry from './archdeaconry';
import * as Parish from './parish';
import * as Congregation from './congregation';
import * as Event from './event';
import * as Payment from './payment';
import * as Quota from './quota';
import * as Census from './census';
import * as Shared from './shared';

export interface Action {
    type: string;
    value?: any;
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction | AppThunkAction<TAction>) => void, getState: () => State): void;
}

export interface State {
    home: Home.State;
    login: Login.State;
    user: User.State;
    archdeaconry: Archdeaconry.State;
    parish: Parish.State;
    congregation: Congregation.State;
    event: Event.State;
    payment: Payment.State;
    quota: Quota.State;
    census: Census.State;
    shared: Shared.State;
}

export const reducers = {
    home: Home.reducer,
    login: Login.reducer,
    user: User.reducer,
    archdeaconry: Archdeaconry.reducer,
    parish: Parish.reducer,
    congregation: Congregation.reducer,
    event: Event.reducer,
    payment: Payment.reducer,
    quota: Quota.reducer,
    census: Census.reducer,
    shared: Shared.reducer,
};