﻿import { combineReducers } from 'redux';
import * as Save from './save';
import * as Home from './home';
import * as Details from './details';

export interface State {
    home: Home.State;
    save: Save.State;
    details: Details.State;
}

export const reducer = combineReducers({
    home: Home.reducer,
    save: Save.reducer,
    details: Details.reducer,
});