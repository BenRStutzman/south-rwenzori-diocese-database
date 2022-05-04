import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { get, post } from '../../../helpers/apiHelpers';
import { Member } from '../../../models/sacco/member';
import { Transaction } from '../../../models/sacco/transaction';

const REQUEST_MEMBERS = 'REQUEST_MEMBERS';
const RECEIVE_MEMBERS = 'RECEIVE_MEMBERS';
const SET_DELETING_MEMBER_ID = 'SET_DELETING_MEMBER_ID';
const SET_DELETING_TRANSACTION_ID = 'SET_DELETING_TRANSACTION_ID';

const requestMembersAction = () => ({
    type: REQUEST_MEMBERS,
});

const receiveMembersAction = (members: Member[]) => ({
    type: RECEIVE_MEMBERS,
    value: members,
});

const setDeletingMemberIdAction = (memberId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_MEMBER_ID,
    value: { memberId, isDeleting },
});

const setDeletingTransactionIdAction = (transactionId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_TRANSACTION_ID,
    value: { transactionId, isDeleting },
});

const loadMembers = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestMembersAction());

    get<Member[]>('api/sacco/member/all')
        .then(members => {
            dispatch(receiveMembersAction(members));
        });
};

const deleteMember = (member: Member, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete the member ${member.name}?`)) {
            dispatch(setDeletingMemberIdAction(member.id));

            post<{ id: number }>('api/sacco/member/delete', { id: member.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingMemberIdAction(member.id, false));
                        alert(errorMessage);
                    });
                });
        }
    };

const deleteTransaction = (transaction: Transaction, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete this transaction for ${transaction.member}?`)) {
            dispatch(setDeletingTransactionIdAction(transaction.id));

            post<{ id: number }>('api/sacco/transaction/delete', { id: transaction.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingTransactionIdAction(transaction.id, false));
                        alert(errorMessage);
                    });
                });
        }
    };

export const actionCreators = {
    loadMembers,
    deleteMember,
    deleteTransaction,
};

export interface State {
    members: Member[];
    membersLoading: boolean;
    deletingMemberIds: number[];
    deletingTransactionIds: number[];
}

const initialState: State = {
    members: [],
    membersLoading: true,
    deletingMemberIds: [],
    deletingTransactionIds: [],
}

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_MEMBERS:
            return {
                ...state,
                membersLoading: true,
            };
        case RECEIVE_MEMBERS:
            return {
                ...state,
                members: action.value,
                membersLoading: false,
            };
        case SET_DELETING_MEMBER_ID:
            return {
                ...state,
                deletingMemberIds: action.value.isDeleting
                    ? [...state.deletingMemberIds, action.value.memberId]
                    : state.deletingMemberIds.filter(id => id != action.value.memberId),
            };
        case SET_DELETING_TRANSACTION_ID:
            return {
                ...state,
                deletingTransactionIds: action.value.isDeleting
                    ? [...state.deletingTransactionIds, action.value.transactionId]
                    : state.deletingTransactionIds.filter(id => id != action.value.transactionId),
            };
        default:
            return state;
    }
};
