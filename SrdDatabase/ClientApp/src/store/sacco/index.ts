import { combineReducers } from 'redux';
import * as Home from './home';
import * as Member from './member';

export interface State {
    home: Home.State,
    member: Member.State,
}

export const reducer = combineReducers({
    home: Home.reducer,
    member: Member.reducer,
});
