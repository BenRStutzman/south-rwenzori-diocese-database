import { combineReducers } from 'redux';
import * as Shared from './shared';
import * as Home from './home';
import * as Member from './member';
import * as Transaction from './transaction';
import * as Loan from './loan';

export interface State {
    shared: Shared.State,
    home: Home.State,
    member: Member.State,
    transaction: Transaction.State,
    loan: Loan.State,
}

export const reducer = combineReducers({
    shared: Shared.reducer,
    home: Home.reducer,
    member: Member.reducer,
    transaction: Transaction.reducer,
    loan: Loan.reducer,
});
