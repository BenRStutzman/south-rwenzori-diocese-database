import { combineReducers } from 'redux';
import * as Shared from './shared';
import * as Home from './home';
import * as Member from './member';
import * as Transaction from './transaction';
import * as Dividend from './dividend';
import * as Loan from './loan';
import * as Installment from './installment';

export interface State {
    shared: Shared.State,
    home: Home.State,
    member: Member.State,
    transaction: Transaction.State,
    dividend: Dividend.State,
    loan: Loan.State,
    installment: Installment.State,
}

export const reducer = combineReducers({
    shared: Shared.reducer,
    home: Home.reducer,
    member: Member.reducer,
    transaction: Transaction.reducer,
    dividend: Dividend.reducer,
    loan: Loan.reducer,
    installment: Installment.reducer,
});
