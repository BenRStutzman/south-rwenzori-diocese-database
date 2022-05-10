import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { get, post } from '../../../helpers/apiHelpers';
import { Loan, LoanType } from '../../../models/sacco/loan';
import { LoanInstallment } from '../../../models/sacco/loanInstallment';
import { Member } from '../../../models/sacco/member';
import { Transaction } from '../../../models/sacco/transaction';

const REQUEST_MEMBERS = 'SACCO.REQUEST_MEMBERS';
const RECEIVE_MEMBERS = 'SACCO.RECEIVE_MEMBERS';
const REQUEST_LOAN_TYPES = 'SACCO.REQUEST_LOAN_TYPES';
const RECEIVE_LOAN_TYPES = 'SACCO.RECEIVE_LOAN_TYPES';
const REQUEST_LOANS = 'SACCO.REQUEST_LOANS';
const RECEIVE_LOANS = 'SACCO.RECEIVE_LOANS';
const SET_DELETING_MEMBER_ID = 'SACCO.SET_DELETING_MEMBER_ID';
const SET_DELETING_TRANSACTION_ID = 'SACCO.SET_DELETING_TRANSACTION_ID';
const SET_DELETING_LOAN_ID = 'SACCO.SET_DELETING_LOAN_ID';
const SET_DELETING_LOAN_INSTALLMENT_ID = 'SACCO.SET_DELETING_LOAN_INSTALLMENT_ID';

const requestMembersAction = () => ({
    type: REQUEST_MEMBERS,
});

const receiveMembersAction = (members: Member[]) => ({
    type: RECEIVE_MEMBERS,
    value: members,
});

const requestLoansAction = () => ({
    type: REQUEST_LOANS,
});

const receiveLoansAction = (loans: Loan[]) => ({
    type: RECEIVE_LOANS,
    value: loans,
});

const requestLoanTypesAction = () => ({
    type: REQUEST_LOAN_TYPES,
});

const receiveLoanTypesAction = (loanTypes: LoanType[]) => ({
    type: RECEIVE_LOAN_TYPES,
    value: loanTypes,
});

const setDeletingMemberIdAction = (memberId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_MEMBER_ID,
    value: { memberId, isDeleting },
});

const setDeletingTransactionIdAction = (transactionId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_TRANSACTION_ID,
    value: { transactionId, isDeleting },
});

const setDeletingLoanIdAction = (loanId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_LOAN_ID,
    value: { loanId, isDeleting },
});

const setDeletingLoanInstallmentIdAction = (loanInstallmentId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_LOAN_INSTALLMENT_ID,
    value: { loanInstallmentId, isDeleting },
});

const loadMembers = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestMembersAction());

    get<Member[]>('api/sacco/member/all')
        .then(members => {
            dispatch(receiveMembersAction(members));
        });
};

const loadLoans = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestLoansAction());

    get<Loan[]>('api/sacco/loan/all')
        .then(loans => {
            dispatch(receiveLoansAction(loans));
        });
};

const loadLoanTypes = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestLoanTypesAction());

    get<LoanType[]>('api/sacco/loan/types')
        .then(loanTypes => {
            dispatch(receiveLoanTypesAction(loanTypes));
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

const deleteLoan = (loan: Loan, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete this loan for ${loan.member}?`)) {
            dispatch(setDeletingLoanIdAction(loan.id));

            post<{ id: number }>('api/sacco/loan/delete', { id: loan.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingLoanIdAction(loan.id, false));
                        alert(errorMessage);
                    });
                });
        }
    };

const deleteLoanInstallment = (loanInstallment: LoanInstallment, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete this loan installment for ${loanInstallment.member}?`)) {
            dispatch(setDeletingLoanInstallmentIdAction(loanInstallment.id));

            post<{ id: number }>('api/sacco/loanInstallment/delete', { id: loanInstallment.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingLoanInstallmentIdAction(loanInstallment.id, false));
                        alert(errorMessage);
                    });
                });
        }
    };

export const actionCreators = {
    loadMembers,
    loadLoanTypes,
    loadLoans,
    deleteMember,
    deleteTransaction,
    deleteLoan,
    deleteLoanInstallment,
};

export interface State {
    members: Member[];
    membersLoading: boolean;
    loanTypes: LoanType[];
    loanTypesLoading: boolean;
    loans: Loan[];
    loansLoading: boolean;
    deletingMemberIds: number[];
    deletingTransactionIds: number[];
    deletingLoanIds: number[];
    deletingLoanInstallmentIds: number[];
}

const initialState: State = {
    members: [],
    membersLoading: true,
    loanTypes: [],
    loanTypesLoading: true,
    loans: [],
    loansLoading: true,
    deletingMemberIds: [],
    deletingTransactionIds: [],
    deletingLoanIds: [],
    deletingLoanInstallmentIds: [],
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
        case REQUEST_LOANS:
            return {
                ...state,
                loansLoading: true,
            };
        case RECEIVE_LOANS:
            return {
                ...state,
                loans: action.value,
                loansLoading: false,
            };
        case REQUEST_LOAN_TYPES:
            return {
                ...state,
                loanTypesLoading: true,
            };
        case RECEIVE_LOAN_TYPES:
            return {
                ...state,
                loanTypes: action.value,
                loanTypesLoading: false,
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
        case SET_DELETING_LOAN_ID:
            return {
                ...state,
                deletingLoanIds: action.value.isDeleting
                    ? [...state.deletingLoanIds, action.value.loanId]
                    : state.deletingLoanIds.filter(id => id != action.value.loanId),
            };
         case SET_DELETING_LOAN_INSTALLMENT_ID:
            return {
                ...state,
                deletingLoanInstallmentIds: action.value.isDeleting
                    ? [...state.deletingLoanInstallmentIds, action.value.loanInstallmentId]
                    : state.deletingLoanInstallmentIds.filter(id => id != action.value.loanInstallmentId),
            };
        default:
            return state;
    }
};
