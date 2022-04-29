import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { ErrorResponse, Errors, get, post } from '../../../helpers/apiHelpers';
import { Member } from '../../../models/sacco/member';
import { History } from 'history';

const SET_IS_LOADING = 'MEMBER.SET_IS_LOADING';
const SET_MEMBER = 'MEMBER.RECEIVE_MEMBER';
const SET_NAME = 'MEMBER.SET_NAME';
const SET_IS_SAVING = 'MEMBER.SET_IS_SAVING';
const SET_ERRORS = 'MEMBER.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setMemberAction = (member: Member) => ({
    type: SET_MEMBER,
    value: member,
});

const setNameAction = (name: string) => ({
    type: SET_NAME,
    value: name,
});

const setIsSavingAction = (isSaving: boolean) => ({
    type: SET_IS_SAVING,
    value: isSaving,
});

const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
});

const setMember = (member: Member): AppThunkAction<Action> => (dispatch) => {
    dispatch(setMemberAction(member));
};

const prefillMember = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(setMember({}));
};

const loadMember = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Member>(`api/sacco/member/${id}`, '/sacco/member')
        .then(member => {
            dispatch(setMember(member));
        });
}

const setName = (name: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setNameAction(name));
};

const saveMember = (member: Member, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const action = member.id ? 'edit' : 'add';

    post<Member>(`api/sacco/member/${action}`, member)
        .then(response => {
            if (response.ok) {
                history.push('/sacco/member');
            } else {
                throw response.json();
            }
        }).catch(errorPromise => {
            errorPromise.then((errorResponse: ErrorResponse) => {
                dispatch(setErrorsAction(errorResponse.errors));
            });
        }).finally(() => {
            dispatch(setIsSavingAction(false))
        });
};

export const actionCreators = {
    prefillMember,
    loadMember,
    setName,
    saveMember,
};

export interface State {
    isLoading: boolean;
    member: Member;
    hasBeenChanged: boolean,
    isSaving: boolean;
    errors: Errors;
}

const initialState: State = {
    isLoading: true,
    member: {},
    hasBeenChanged: false,
    isSaving: false,
    errors: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case SET_MEMBER:
            return {
                ...state,
                isLoading: false,
                member: action.value,
                hasBeenChanged: false,
                errors: {},
            };
        case SET_NAME:
            return {
                ...state,
                member: {
                    ...state.member,
                    name: action.value,
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
