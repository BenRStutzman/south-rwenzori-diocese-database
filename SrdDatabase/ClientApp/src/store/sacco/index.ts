import { combineReducers } from 'redux';
import * as Member from './member';

export interface State {
    member: Member.State,
}

export const reducer = combineReducers({
    member: Member.reducer,
});
