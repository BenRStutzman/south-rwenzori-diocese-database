import { combineReducers } from 'redux';
import * as Save from './Save';
import * as View from './View';

export interface State {
    view?: View.State;
    save?: Save.State;
}

export interface Archdeaconry {
    id?: number;
    name?: string;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducer = combineReducers({
    view: View.reducer,
    save: Save.reducer,
});
