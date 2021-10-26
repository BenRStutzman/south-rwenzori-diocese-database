import { combineReducers } from 'redux';
import * as Save from './save';
import * as Home from './home';

export interface State {
    home?: Home.State;
    save?: Save.State;
}

export interface Archdeaconry {
    id?: number;
    name?: string;
}

export const reducer = combineReducers({
    home: Home.reducer,
    save: Save.reducer,
});
