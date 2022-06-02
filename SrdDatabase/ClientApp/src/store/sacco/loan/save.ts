import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { ErrorResponse, Errors, get, post } from '../../../helpers/apiHelpers';
import { Loan, LoanToSend } from '../../../models/sacco/loan';
import { History } from 'history';
import { formattedDate } from '../../../helpers/miscellaneous';
import { Member } from '../../../models/sacco/member';

const SET_IS_LOADING = 'SACCO_LOAN.SET_IS_LOADING';
const SET_LOAN = 'SACCO_LOAN.SET_LOAN';
const SET_MEMBER_ID = 'SACCO_LOAN.SET_MEMBER_ID';
const SET_LOAN_TYPE_ID = 'SACCO_LOAN.SET_LOAN_TYPE_ID';
const SET_TERM_MONTHS = 'SACCO_LOAN.SET_TERM_MONTHS';
const SET_PRINCIPAL = 'SACCO_LOAN.SET_PRINCIPAL';
const SET_DATE = 'SACCO_LOAN.SET_DATE';
const SET_IS_SAVING = 'SACCO_LOAN.SET_IS_SAVING';
const SET_ERRORS = 'SACCO_LOAN.SET_ERRORS';

const setIsLoadingAction = () => ({
    type: SET_IS_LOADING,
});

const setLoanAction = (loan: Loan) => ({
    type: SET_LOAN,
    value: loan,
});

const setMemberIdAction = (memberId: number) => ({
    type: SET_MEMBER_ID,
    value: memberId,
});

const setLoanTypeIdAction = (loanTypeId: number) => ({
    type: SET_LOAN_TYPE_ID,
    value: loanTypeId,
});

const setTermMonthsAction = (termMonths: number) => ({
    type: SET_TERM_MONTHS,
    value: termMonths,
});

const setPrincipalAction = (principal: number) => ({
    type: SET_PRINCIPAL,
    value: principal,
});

const setDateAction = (date?: Date) => ({
    type: SET_DATE,
    value: date,
});

const setIsSavingAction = (isSaving: boolean) => ({
    type: SET_IS_SAVING,
    value: isSaving,
});

const setErrorsAction = (errors: Errors) => ({
    type: SET_ERRORS,
    value: errors,
});

const prefillLoan = (memberId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());
    const backupUrl = '/sacco/loan/add';

    const setLoanWithDate = (loan: Loan) => {
        dispatch(setLoanAction({
            ...loan,
            dateDisbursed: new Date(),
        }))
    };

    if (memberId) {
        get<Member>(`api/sacco/member/${memberId}`, backupUrl)
            .then(() => {
                setLoanWithDate({
                    memberId,
                });
            });
    } else {
        setLoanWithDate({});
    }
};

const loadLoan = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsLoadingAction());

    get<Loan>(`api/sacco/loan/${id}`, '/sacco/loan')
        .then(loan => {
            dispatch(setLoanAction(loan));
        });
};

const saveLoan = (loan: Loan, history: History): AppThunkAction<Action> => (dispatch) => {
    dispatch(setIsSavingAction(true));

    const loanToSend = {
        ...loan,
        date: formattedDate(loan.dateDisbursed),
    }

    const action = loan.id ? 'edit' : 'add';

    post<LoanToSend>(`api/sacco/loan/${action}`, loanToSend)
        .then(response => {
            if (response.ok) {
                history.push('/sacco/loan');
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

const setMemberId = (memberId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setMemberIdAction(memberId));
};

const setLoanTypeId = (loanTypeId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setLoanTypeIdAction(loanTypeId));
}

const setTermMonths = (termMonths: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setTermMonthsAction(termMonths));
};

const setPrincipal = (principal: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setPrincipalAction(principal));
};

const setDate = (date?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setDateAction(date));
};

export const actionCreators = {
    prefillLoan,
    loadLoan,
    saveLoan,
    setMemberId,
    setLoanTypeId,
    setTermMonths,
    setPrincipal,
    setDate,
};

export interface State {
    isLoading: boolean;
    loan: Loan;
    hasBeenChanged: boolean,
    isSaving: boolean,
    errors: Errors;
}

const initialState: State = {
    loan: {},
    isLoading: true,
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
        case SET_LOAN:
            return {
                ...state,
                loan: action.value,
                errors: {},
                isLoading: false,
                hasBeenChanged: false,
            };
        case SET_MEMBER_ID:
            return {
                ...state,
                loan: {
                    ...state.loan,
                    memberId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_LOAN_TYPE_ID:
            return {
                ...state,
                loan: {
                    ...state.loan,
                    loanTypeId: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_TERM_MONTHS:
            return {
                ...state,
                loan: {
                    ...state.loan,
                    termMonths: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_PRINCIPAL:
            return {
                ...state,
                loan: {
                    ...state.loan,
                    principal: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_DATE:
            return {
                ...state,
                loan: {
                    ...state.loan,
                    dateDisbursed: action.value,
                },
                hasBeenChanged: true,
            };
        case SET_IS_SAVING:
            return {
                ...state,
                isSaving: action.value,
            }
        case SET_ERRORS:
            return {
                ...state,
                errors: action.value,
            };
        default:
            return state;
    }
};