import { Reducer } from 'redux';
import { Action, AppThunkAction } from '..';
import { ErrorResponse, Errors, get, post } from '../../helpers/apiHelpers';
import { Congregation } from '../../models/congregation';
import { History } from 'history';
import { loadParishes } from '../shared';
import { Parish } from '../../models/parish';
import { Archdeaconry } from '../../models/archdeaconry';

const SET_IS_LOADING = 'CONGREGATION.SET_IS_LOADING';
const SET_CONGREGATION = 'CONGREGATION.SET_CONGREGATION';
const SET_NAME = 'CONGREGATION.SET_NAME';
const SET_ARCHDEACONRY_ID = 'CONGREGATION.SET_ARCHDEACONRY_ID';
const SET_PARISH_ID = 'CONGREGATION.SET_PARISH_ID';
const SET_IS_SAVING = 'CONGREGATION.SET_IS_SAVING';
const SET_ERRORS = 'CONGREGATION.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setCongregationAction = (congregation: Congregation) => ({
    type: SET_CONGREGATION,
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

const prefillCongregation = (parishId?: number, archdeaconryId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    const backupUrl = 'parish/add';

    if (parishId) {
        get<Parish>(`api/parish/${parishId}`, backupUrl)
            .then(parish => {
                dispatch(setCongregation({
                    parishId,
                    archdeaconryId: parish.archdeaconryId,
                }));
            });
    } else if (archdeaconryId) {
        get<Archdeaconry>(`api/archdeaconry/${archdeaconryId}`, backupUrl)
            .then(() => {
                dispatch(setCongregation({
                    archdeaconryId,
                }));
            });
    } else {
        dispatch(setCongregation({}));
    }
}

const setCongregation = (congregation: Congregation): AppThunkAction<Action> => (dispatch) => {
    dispatch(setCongregationAction(congregation));
    dispatch(loadParishes(congregation.archdeaconryId));
}

const loadCongregation = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Congregation>(`api/congregation/${id}`)
        .then(congregation => {
            dispatch(setCongregation(congregation));
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
    prefillCongregation,
    loadCongregation,
    saveCongregation,
    setName,
    setParishId,
    setArchdeaconryId,
};

export interface State {
    isSaving: boolean;
    isLoading: boolean;
    congregation: Congregation;
    hasBeenChanged: boolean,
    hasBeenSaved: boolean;
    errors: Errors;
}

const initialState: State = {
    isSaving: false,
    congregation: {},
    isLoading: true,
    hasBeenChanged: false,
    hasBeenSaved: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case SET_CONGREGATION:
            return {
                ...state,
                congregation: action.value,
                isLoading: false,
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