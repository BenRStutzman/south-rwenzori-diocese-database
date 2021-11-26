import { combineReducers } from 'redux';
import * as Save from './save';
import * as Home from './home';

export interface Event {
    id?: number;
    eventTypeId?: number;
    eventType?: string;
    congregationId?: number;
    congregation?: string;
    firstPersonName?: string;
    secondPersonName?: string;
    date: Date;
}

export interface EventType {
    id: number;
    name: string;
    involvesTwoPeople: boolean;
}

export interface State {
    home?: Home.State;
    save?: Save.State;
}

export const reducer = combineReducers({
    home: Home.reducer,
    save: Save.reducer,
});
