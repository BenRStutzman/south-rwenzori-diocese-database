import * as Archdeaconry from './archdeaconry';
import * as Parish from './parish';

export interface State {
    archdeaconry: Archdeaconry.State;
    parish: Parish.State;
}

export interface Action {
    type: string;
    value?: any;
}

export const reducers = {
    archdeaconry: Archdeaconry.reducer,
    parish: Parish.reducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction | AppThunkAction<TAction>) => void, getState: () => State): void;
}