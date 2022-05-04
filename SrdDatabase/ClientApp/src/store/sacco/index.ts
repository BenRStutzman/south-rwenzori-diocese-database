import { combineReducers } from 'redux';
import * as Shared from './shared';
import * as Home from './home';
import * as Member from './member';
import * as Transaction from './transaction';

export interface State {
    shared: Shared.State,
    home: Home.State,
    member: Member.State,
    transaction: Transaction.State,
}

export const reducer = combineReducers({
    shared: Shared.reducer,
    home: Home.reducer,
    member: Member.reducer,
    transaction: Transaction.reducer,
});
