import { combineReducers } from 'redux';
import * as Details from './details';

export interface State {
    details: Details.State;
}

export const reducer = combineReducers({
    details: Details.reducer,
});
