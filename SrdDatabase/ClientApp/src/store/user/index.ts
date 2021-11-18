import { combineReducers } from 'redux';
import * as Save from './save';
import * as Home from './home';

export interface State {
    home?: Home.State;
    save?: Save.State;
}

export interface User {
    id?: number;
    name?: string;
    userType?: string;
    userTypeId?: number;
    username?: string;
    password?: string;
}

export interface UserType {
    id: number;
    name: string;
}

export const reducer = combineReducers({
    home: Home.reducer,
    save: Save.reducer,
});