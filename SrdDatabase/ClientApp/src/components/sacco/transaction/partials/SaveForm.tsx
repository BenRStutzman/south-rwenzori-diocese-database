import { State } from '../../../../store';
import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';
import * as Store from '../../../../store/sacco/transaction/save';
import * as SharedStore from '../../../../store/sacco/shared';
import { RouteComponentProps, withRouter } from 'react-router';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { convertDateChange, randomString } from '../../../../helpers/miscellaneous';

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
    transaction,
    members,
    saveTransaction,
    setMemberId,
    setIsShares,
    setIsContribution,
    setAmount,
    setReceiptNumber,
    setNotes,
    loadMembers,
    setDate,
    hasBeenChanged,
    errors,
    isNew,
    history,
    isSaving,
    membersLoading,
}: Props) => {
    const loadData = () => {
        loadMembers();
    };

    useEffect(loadData, []);

    const onMemberIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setMemberId(parseInt(event.target.value));
    }

    const onIsSharesChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsShares(event.target.value === 'shares');
    }

    const onIsContributionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsContribution(event.target.value === 'contribution');
    };

    const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value));
    };

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(convertDateChange(event));
    };

    const onReceiptNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setReceiptNumber(parseInt(event.target.value));
    };

    const onNotesChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNotes(event.target.value);
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        saveTransaction(transaction, history);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="memberId">Member</label>
                <select
                    id="memberId"
                    className="form-control"
                    value={membersLoading ? "" : transaction.memberId ?? ""}
                    onChange={onMemberIdChange}
                    required
                >
                    <option key={0} value="" disabled>
                        {membersLoading ? 'Loading...' : '--- select a member ---'}
                    </option>
                    {members.map(member =>
                        <option key={member.id} value={member.id}>
                            {member.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <input
                    name="isShares"
                    id="shares"
                    type="radio"
                    value="shares"
                    onChange={onIsSharesChange}
                    checked={transaction.isShares ?? false}
                />
                <label htmlFor="shares">Shares</label>
                <input
                    name="isShares"
                    id="savings"
                    type="radio"
                    value="savings"
                    onChange={onIsSharesChange}
                    checked={transaction.isShares === false}
                />
                <label htmlFor="savings">Savings</label>
            </div>
            <div className="form-group">
                <input
                    id="contribution"
                    type="radio"
                    value="contribution"
                    onChange={onIsContributionChange}
                    checked={transaction.isContribution ?? false}
                />
                <label htmlFor="contribution">{transaction.isShares ? 'Purchase' : 'Contribution'}</label>
                <input
                    id="withdrawal"
                    type="radio"
                    value="withdrawal"
                    onChange={onIsContributionChange}
                    checked={transaction.isContribution === false}
                />
                <label htmlFor="withdrawal">{transaction.isShares ? 'Sale' : 'Withdrawal'}</label>
            </div>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    className="form-control"
                    type="date"
                    value={transaction.date ? new Date(transaction.date).toLocaleDateString('en-ca') : ''}
                    onChange={onDateChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="amount">{transaction.isShares ? 'Number of shares' : 'Amount (UGX)'}</label>
                <input
                    id="amount"
                    className="form-control"
                    type="number"
                    value={transaction.amount?.toString() ?? ""}
                    onChange={onAmountChange}
                    autoComplete={autoComplete}
                    min={1}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="receiptNumber">Receipt Number</label>
                <input
                    id="receiptNumber"
                    className="form-control"
                    type="number"
                    value={transaction.receiptNumber?.toString() ?? ""}
                    onChange={onReceiptNumberChange}
                    autoComplete={autoComplete}
                    min={1}
                />
            </div>
            <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <input
                    id="notes"
                    className="form-control"
                    type="string"
                    value={transaction.notes ?? ""}
                    onChange={onNotesChange}
                    autoComplete={autoComplete}
                    maxLength={50}
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
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} transaction`}
            </button>
        </form>
    );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    ...state.sacco.transaction.save,
    ...state.sacco.shared,
    ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...Store.actionCreators,
    ...SharedStore.actionCreators,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm));