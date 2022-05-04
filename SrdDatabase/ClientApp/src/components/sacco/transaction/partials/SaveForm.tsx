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
        setIsShares(Boolean(event.target.value));
    }

    const onIsContributionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsContribution(Boolean(event.target.value));
    };

    const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value));
    };

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(convertDateChange(event));
    };

    const onReceiptNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setReceiptNumber(parseInt(event.target.value));
    }

    const onSubmit = (formTransaction: React.FormEvent) => {
        formTransaction.preventDefault();
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
                            {`${member.id} - ${member.name}`}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="isShares">Shares?</label>
                <input
                    id="isShares"
                    type="checkbox"
                    className="form-control"
                    checked={transaction.isShares ?? false}
                    onChange={onIsSharesChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="isContribution">Contribution?</label>
                <input
                    id="isContribution"
                    type="checkbox"
                    className="form-control"
                    checked={transaction.isContribution ?? false}
                    onChange={onIsContributionChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="amount">Amount (UGX)</label>
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