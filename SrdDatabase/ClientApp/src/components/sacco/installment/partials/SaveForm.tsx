import { State } from '../../../../store';
import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';
import * as Store from '../../../../store/sacco/installment/save';
import * as SharedStore from '../../../../store/sacco/shared';
import { RouteComponentProps, withRouter } from 'react-router';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { convertDateChange, formattedDate, randomString } from '../../../../helpers/miscellaneous';
import { describeLoan } from '../../../../helpers/sacco/loanHelper';

const autoComplete = randomString();

interface OwnProps {
    isNew?: boolean;
}

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps &
    OwnProps;

const SaveForm = ({
    installment,
    members,
    loans,
    saveInstallment,
    setMemberId,
    setLoanId,
    setAmount,
    setReceiptNumber,
    loadMembers,
    setDate,
    hasBeenChanged,
    errors,
    isNew,
    history,
    isSaving,
    membersLoading,
    loansLoading,
}: Props) => {
    const loadData = () => {
        loadMembers();
    };

    useEffect(loadData, []);

    const onMemberIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setMemberId(parseInt(event.target.value));
    }

    const onLoanIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setLoanId(parseInt(event.target.value));
    }

    const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value));
    };

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(convertDateChange(event));
    };

    const onReceiptNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setReceiptNumber(parseInt(event.target.value));
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        saveInstallment(installment, history);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="memberId">Member</label>
                <select
                    id="memberId"
                    className="form-control"
                    value={membersLoading ? "" : installment.memberId ?? ""}
                    onChange={onMemberIdChange}
                    required
                >
                    <option key={0} value="" disabled>
                        {membersLoading ? 'Loading...' : '--- select a member ---'}
                    </option>
                    {members.map(member =>
                        <option key={member.id} value={member.id}>
                            {`${member.accountNumber} - ${member.name}`}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="loanId">Loan</label>
                <select
                    id="loanId"
                    className="form-control"
                    value={loansLoading ? "" : installment.loanId ?? ""}
                    onChange={onLoanIdChange}
                    required
                >
                    <option key={0} value="" disabled>{
                        !installment.memberId ? 'First select a member above'
                            : loansLoading ? 'Loading...'
                                : loans.length === 0 ? 'No loans available for the selected member'
                                    : '--- select a loan ---'
                    }</option>
                    {loans.map(loan =>
                        <option key={loan.id} value={loan.id}>
                            {describeLoan(loan, false, true)}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="amount">Amount (UGX)</label>
                <input
                    id="amount"
                    className="form-control"
                    type="number"
                    value={installment.amount?.toString() ?? ""}
                    onChange={onAmountChange}
                    autoComplete={autoComplete}
                    min={1}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    className="form-control"
                    type="date"
                    value={installment.date ? new Date(installment.date).toLocaleDateString('en-ca') : ''}
                    onChange={onDateChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="receiptNumber">Receipt Number</label>
                <input
                    id="receiptNumber"
                    className="form-control"
                    type="number"
                    value={installment.receiptNumber?.toString() ?? ""}
                    onChange={onReceiptNumberChange}
                    autoComplete={autoComplete}
                    min={1}
                />
            </div>
            {
                Object.values(errors).length > 0 &&
                <ul>
                    {Object.entries(errors).map(([fieldName, errorList]: [string, string[]]) =>
                        <li
                            className="error-alert"
                            key={fieldName}>
                            {errorList.join(" ")}
                        </li>
                    )}
                </ul>
            }
            <button disabled={!hasBeenChanged || isSaving} className="btn btn-primary" type="submit">
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} installment`}
            </button>
        </form>
    );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    ...state.sacco.installment.save,
    ...state.sacco.shared,
    ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...Store.actionCreators,
    ...SharedStore.actionCreators,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm));