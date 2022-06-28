import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { get, post } from '../../../helpers/apiHelpers';
import { Loan, LoanParameters, LoanResults, LoanType } from '../../../models/sacco/loan';
import { Member } from '../../../models/sacco/member';
import { Transaction } from '../../../models/sacco/transaction';
import { Distribution } from '../../../models/sacco/distribution';
import { formattedDate } from '../../../helpers/miscellaneous';
import { Payment } from '../../../models/sacco/payment';

const REQUEST_MEMBERS = 'SACCO.REQUEST_MEMBERS';
const RECEIVE_MEMBERS = 'SACCO.RECEIVE_MEMBERS';
const REQUEST_LOAN_TYPES = 'SACCO.REQUEST_LOAN_TYPES';
const RECEIVE_LOAN_TYPES = 'SACCO.RECEIVE_LOAN_TYPES';
const REQUEST_LOANS = 'SACCO.REQUEST_LOANS';
const RECEIVE_LOANS = 'SACCO.RECEIVE_LOANS';
const SET_DELETING_MEMBER_ID = 'SACCO.SET_DELETING_MEMBER_ID';
const SET_DELETING_TRANSACTION_ID = 'SACCO.SET_DELETING_TRANSACTION_ID';
const SET_DELETING_DISTRIBUTION_ID = 'SACCO.SET_DELETING_DISTRIBUTION_ID';
const SET_DELETING_LOAN_ID = 'SACCO.SET_DELETING_LOAN_ID';
const SET_DELETING_PAYMENT_ID = 'SACCO.SET_DELETING_PAYMENT_ID';

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

const setDeletingDistributionIdAction = (distributionId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_DISTRIBUTION_ID,
    value: { distributionId, isDeleting },
});

const setDeletingLoanIdAction = (loanId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_LOAN_ID,
    value: { loanId, isDeleting },
});

const setDeletingPaymentIdAction = (paymentId?: number, isDeleting: boolean = true) => ({
    type: SET_DELETING_LOAN_ID,
    value: { paymentId, isDeleting },
});

const loadMembers = (): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestMembersAction());

    get<Member[]>('api/sacco/member/all')
        .then(members => {
            dispatch(receiveMembersAction(members));
        });
};

export const loadLoans = (memberId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestLoansAction());

    if (memberId) {
        post<LoanParameters>('api/sacco/loan/search', { memberId })
            .then(response => response.json() as Promise<LoanResults>)
            .then(results => {
                dispatch(receiveLoansAction(results.loans));
            });
    } else {
        dispatch(receiveLoansAction([]));
    }
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

const deleteDistribution = (distribution: Distribution, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete this distribution for ${formattedDate(distribution.date)}?`)) {
            dispatch(setDeletingDistributionIdAction(distribution.id));

            post<{ id: number }>('api/sacco/distribution/delete', { id: distribution.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingDistributionIdAction(distribution.id, false));
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

const deletePayment = (payment: Payment, onSuccess: () => void):
    AppThunkAction<Action> => (dispatch) => {
        if (window.confirm(`Are you sure you want to delete this payment for ${payment.member}?`)) {
            dispatch(setDeletingPaymentIdAction(payment.id));

            post<{ id: number }>('api/sacco/payment/delete', { id: payment.id as number })
                .then(response => {
                    if (response.ok) {
                        onSuccess();
                    } else {
                        throw response.text();
                    }
                }).catch(errorPromise => {
                    errorPromise.then((errorMessage: string) => {
                        dispatch(setDeletingPaymentIdAction(payment.id, false));
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
    deleteDistribution,
    deleteLoan,
    deletePayment,
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
    deletingDistributionIds: number[];
    deletingLoanIds: number[];
    deletingPaymentIds: number[];
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
    deletingDistributionIds: [],
    deletingLoanIds: [],
    deletingPaymentIds: [],
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
        case SET_DELETING_DISTRIBUTION_ID:
            return {
                ...state,
                deletingDistributionIds: action.value.isDeleting
                    ? [...state.deletingDistributionIds, action.value.distributionId]
                    : state.deletingDistributionIds.filter(id => id != action.value.distributionId),
            };
        case SET_DELETING_LOAN_ID:
            return {
                ...state,
                deletingLoanIds: action.value.isDeleting
                    ? [...state.deletingLoanIds, action.value.loanId]
                    : state.deletingLoanIds.filter(id => id != action.value.loanId),
            };
         case SET_DELETING_PAYMENT_ID:
            return {
                ...state,
                deletingPaymentIds: action.value.isDeleting
                    ? [...state.deletingPaymentIds, action.value.paymentId]
                    : state.deletingPaymentIds.filter(id => id != action.value.paymentId),
            };
        default:
            return state;
    }
};
