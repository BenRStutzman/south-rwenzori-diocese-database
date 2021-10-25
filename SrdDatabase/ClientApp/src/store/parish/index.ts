﻿import { combineReducers } from 'redux';
import * as Save from './save';
import * as Home from './search';

export interface State {
    home?: Home.State;
    save?: Save.State;
}

export interface Parish {
    id?: number;
    name?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
}

export const reducer = combineReducers({
    home: Home.reducer,
    save: Save.reducer,
});