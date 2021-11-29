import { combineReducers } from 'redux';
import * as Save from './save';
import * as Home from './home';
import * as Details from './details';

export interface Event {
    id?: number;
    eventTypeId?: number;
    eventType?: string;
    congregationId?: number;
    congregation?: string;
    parishId?: number;
    parish?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
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
    details?: Details.State;
}

export const reducer = combineReducers({
    home: Home.reducer,
    save: Save.reducer,
    details: Details.reducer,
});
