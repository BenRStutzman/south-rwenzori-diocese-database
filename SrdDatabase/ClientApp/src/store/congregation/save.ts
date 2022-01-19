import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Congregation } from '../../models/congregation';
import { History } from 'history';
import { loadCongregations, loadParishes } from '../shared';
import { Parish } from '../../models/parish';
import { Archdeaconry } from '../../models/archdeaconry';

const REQUEST_CONGREGATION = 'CONGREGATION.REQUEST_CONGREGATION';
const RECEIVE_CONGREGATION = 'CONGREGATION.RECEIVE_CONGREGATION';
const SET_NAME = 'CONGREGATION.SET_NAME';
const SET_ARCHDEACONRY_ID = 'CONGREGATION.SET_ARCHDEACONRY_ID';
const SET_PARISH_ID = 'CONGREGATION.SET_PARISH_ID';
const SET_IS_SAVING = 'CONGREGATION.SET_IS_SAVING';
const SET_ERRORS = 'CONGREGATION.SET_ERRORS';

const requestCongregationAction = () => ({
    type: REQUEST_CONGREGATION,
});

const receiveCongregationAction = (congregation: Congregation) => ({
    type: RECEIVE_CONGREGATION,
    value: congregation,
});

const setNameAction = (name: string) => ({
    type: SET_NAME,
    value: name,
});

const setArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const setParishIdAction = (parishId?: number) => ({
    type: SET_PARISH_ID,
    value: parishId,
});

const setIsSavingAction = (isSaving: boolean) => ({
    type: SET_IS_SAVING,
    value: isSaving,
});

const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
})

const resetCongregation = (parishId?: number, archdeaconryId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestCongregationAction());

    if (parishId) {
        get<Parish>(`api/parish/${parishId}`)
            .then(parish => {
                dispatch(receiveCongregation({
                    parishId: parish.id,
                    archdeaconryId: parish.archdeaconryId,
                }));
            });
    } else if (archdeaconryId) {
        get<Archdeaconry>(`api/archdeaconry/${archdeaconryId}`)
            .then(archdeaconry => {
                dispatch(receiveCongregation({
                    archdeaconryId: archdeaconry.id,
                }));
            });
    } else {
        dispatch(receiveCongregation({}));
    }
}

const receiveCongregation = (congregation: Congregation): AppThunkAction<Action> => (dispatch) => {
    dispatch(receiveCongregationAction(congregation));
    dispatch(loadParishes(congregation.archdeaconryId));
    dispatch(loadCongregations(congregation.parishId));
}

const loadCongregation = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestCongregationAction());

    get<Congregation>(`api/congregation/${id}`)
        .then(congregation => {
            dispatch(receiveCongregation(congregation));
        });
}

const setName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setNameAction(name));
};

const setArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(loadParishes(archdeaconryId));
    dispatch(setArchdeaconryIdAction(archdeaconryId));
    dispatch(setParishId(undefined));
}

const setParishId = (parishId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParishIdAction(parishId));
};

const saveCongregation = (congregation: Congregation, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const action = congregation.id ? 'edit' : 'add';

    post<Congregation>(`api/congregation/${action}`, congregation)
        .then(response => {
            if (response.ok) {
                history.push('/congregation');
            } else {
                throw response.json();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorResponse: ErrorResponse) => {
                dispatch(setErrorsAction(errorResponse.errors));
            });
        }).finally(() => {
            dispatch(setIsSavingAction(false));
        });
};

export const actionCreators = {
    resetCongregation,
    loadCongregation,
    saveCongregation,
    setName,
    setParishId,
    setArchdeaconryId,
};

export interface State {
    isSaving: boolean;
    congregationLoading: boolean;
    congregation: Congregation;
    hasBeenChanged: boolean,
    hasBeenSaved: boolean;
    errors: Errors;
}

const initialState: State = {
    isSaving: false,
    congregation: {},
    congregationLoading: true,
    hasBeenChanged: false,
    hasBeenSaved: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_CONGREGATION:
            return {
                ...state,
                congregationLoading: true,
            };
        case RECEIVE_CONGREGATION:
            return {
                ...state,
                congregation: action.value,
                congregationLoading: false,
                hasBeenChanged: false,
                errors: {},
            };
        case SET_NAME:
            return {
                ...state,
                congregation: {
                    ...state.congregation,
                    name: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_ARCHDEACONRY_ID:
            return {
                ...state,
                congregation: {
                    ...state.congregation,
                    archdeaconryId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_PARISH_ID:
            return {
                ...state,
                congregation: {
                    ...state.congregation,
                    parishId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_IS_SAVING:
            return {
                ...state,
                isSaving: action.value,
            };
        case SET_ERRORS:
            return {
                ...state,
                errors: action.value,
            };
        default:
            return state;
    }
};