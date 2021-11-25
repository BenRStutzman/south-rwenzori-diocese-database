import { combineReducers } from 'redux';
import * as Save from './save';
import * as Home from './home';
import * as Shared from './shared';

export interface Parish {
    id?: number;
    name?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
}

export interface SearchParameters {
    name?: string;
    archdeaconryId?: number;
}

export interface State {
    home?: Home.State;
    save?: Save.State;
    shared?: Shared.State;
}

export const reducer = combineReducers({
    home: Home.reducer,
    save: Save.reducer,
    shared: Shared.reducer,
});
