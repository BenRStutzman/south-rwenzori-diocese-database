import { combineReducers } from 'redux';
import * as Save from './save';
import * as Home from './home';

export interface Congregation {
    id?: number;
    name?: string;
    parishId?: number;
    parish?: string;
    archdeaconry?: string;
}

export interface State {
    home?: Home.State;
    save?: Save.State;
}

export const reducer = combineReducers({
    home: Home.reducer,
    save: Save.reducer,
});
