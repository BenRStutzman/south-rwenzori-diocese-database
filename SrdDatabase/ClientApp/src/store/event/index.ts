import { combineReducers } from 'redux';
import * as Save from './save';
import * as Home from './search';

export interface State {
    home?: Home.State;
    save?: Save.State;
}

export interface Event {
    id?: number;
    eventTypeId?: number;
    eventType?: string;
    congregationId?: number;
    congregation?: string;
    parish?: string;
    archdeaconry?: string;
    personName?: string;
    date?: Date;
}

export interface EventType {
    id: number;
    name: string;
}

export const reducer = combineReducers({
    home: Home.reducer,
    save: Save.reducer,
});
