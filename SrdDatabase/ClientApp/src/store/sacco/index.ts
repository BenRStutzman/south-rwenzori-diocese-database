import { combineReducers } from 'redux';
import * as Shared from './shared';
import * as Home from './home';
import * as Member from './member';
import * as Transaction from './transaction';
import * as Distribution from './distribution';
import * as Loan from './loan';
import * as Installment from './installment';

export interface State {
    shared: Shared.State,
    home: Home.State,
    member: Member.State,
    transaction: Transaction.State,
    distribution: Distribution.State,
    loan: Loan.State,
    installment: Installment.State,
}

export const reducer = combineReducers({
    shared: Shared.reducer,
    home: Home.reducer,
    member: Member.reducer,
    transaction: Transaction.reducer,
    distribution: Distribution.reducer,
    loan: Loan.reducer,
    installment: Installment.reducer,
});
