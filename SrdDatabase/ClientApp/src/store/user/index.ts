import { combineReducers } from 'redux';
import * as Save from './save';
import * as Home from './home';
import * as Details from './details';

export interface UserData {
    user: User;
    token: String;
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

export interface State {
    home?: Home.State;
    save?: Save.State;
    details?: Details.State;
}

export const reducer = combineReducers({
    home: Home.reducer,
    save: Save.reducer,
    details: Details.reducer,
});