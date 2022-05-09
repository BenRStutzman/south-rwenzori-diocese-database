import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { ErrorResponse, Errors, get, post } from '../../../helpers/apiHelpers';
import { Member, MemberToSend } from '../../../models/sacco/member';
import { History } from 'history';
import { formattedDate } from '../../../helpers/miscellaneous';

const SET_IS_LOADING = 'SACCO_MEMBER.SET_IS_LOADING';
const SET_MEMBER = 'SACCO_MEMBER.RECEIVE_MEMBER';
const SET_NAME = 'SACCO_MEMBER.SET_NAME';
const SET_ACCOUNT_NUMBER = 'SACCO_MEMBER.SET_ACCOUNT_NUMBER';
const SET_DATE_JOINED = 'SACCO_MEMBER.SET_DATE_JOINED';
const SET_IS_SAVING = 'SACCO_MEMBER.SET_IS_SAVING';
const SET_ERRORS = 'SACCO_MEMBER.SET_ERRORS';

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

const setAccountNumberAction = (accountNumber: number) => ({
    type: SET_ACCOUNT_NUMBER,
    value: accountNumber,
});

const setDateJoinedAction = (dateJoined?: Date) => ({
    type: SET_DATE_JOINED,
    value: dateJoined,
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

const setAccountNumber = (accountNumber: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setAccountNumberAction(accountNumber));
};

const setDateJoined = (dateJoined?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDateJoinedAction(dateJoined));
};

const saveMember = (member: Member, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const memberToSend = {
        ...member,
        dateJoined: formattedDate(member.dateJoined),
    }

    const action = member.id ? 'edit' : 'add';

    post<MemberToSend>(`api/sacco/member/${action}`, memberToSend)
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
    setAccountNumber,
    setDateJoined,
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
        case SET_ACCOUNT_NUMBER:
            return {
                ...state,
                member: {
                    ...state.member,
                    accountNumber: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_DATE_JOINED:
            return {
                ...state,
                member: {
                    ...state.member,
                    dateJoined: action.value,
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
