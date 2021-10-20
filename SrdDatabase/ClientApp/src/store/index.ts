import * as Archdeaconry from './archdeaconry/archdeaconry';

export interface State {
    archdeaconry: Archdeaconry.State;
}

export interface Action {
    type: string;
    value?: any;
}

export const reducers = {
    archdeaconry: Archdeaconry.reducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction | AppThunkAction<TAction>) => void, getState: () => State): void;
}