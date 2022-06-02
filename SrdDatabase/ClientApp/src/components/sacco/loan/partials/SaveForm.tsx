import { State } from '../../../../store';
import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';
import * as Store from '../../../../store/sacco/loan/save';
import * as SharedStore from '../../../../store/sacco/shared';
import { RouteComponentProps, withRouter } from 'react-router';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { convertDateChange, formattedDate, randomString } from '../../../../helpers/miscellaneous';

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
    loan,
    members,
    loanTypes,
    saveLoan,
    setMemberId,
    setLoanTypeId,
    setTermMonths,
    setPrincipal,
    loadMembers,
    loadLoanTypes,
    setDateDisbursed,
    hasBeenChanged,
    errors,
    isNew,
    history,
    isSaving,
    membersLoading,
    loanTypesLoading,
}: Props) => {
    const loadData = () => {
        loadMembers();
        loadLoanTypes();
    };

    useEffect(loadData, []);

    const onMemberIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setMemberId(parseInt(event.target.value));
    }

    const onLoanTypeIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setLoanTypeId(parseInt(event.target.value));
    }

    const onTermMonthsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTermMonths(parseInt(event.target.value));
    };

    const onPrincipalChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrincipal(parseInt(event.target.value));
    };

    const onDateDisbursedChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDateDisbursed(convertDateChange(event));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        saveLoan(loan, history);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="memberId">Member</label>
                <select
                    id="memberId"
                    className="form-control"
                    value={membersLoading ? "" : loan.memberId ?? ""}
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
                <label htmlFor="loanTypeId">Loan Type</label>
                <select
                    id="loanTypeId"
                    className="form-control"
                    value={loanTypesLoading ? "" : loan.loanTypeId ?? ""}
                    onChange={onLoanTypeIdChange}
                    required
                >
                    <option key={0} value="" disabled>
                        {loanTypesLoading ? 'Loading...' : '--- select a loan type ---'}
                    </option>
                    {loanTypes.map(loanType =>
                        <option key={loanType.id} value={loanType.id}>
                            {loanType.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="principal">Principal (UGX)</label>
                <input
                    id="principal"
                    className="form-control"
                    type="number"
                    value={loan.principal?.toString() ?? ""}
                    onChange={onPrincipalChange}
                    autoComplete={autoComplete}
                    min={1}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="termMonths">Term (months)</label>
                <input
                    id="termMonths"
                    className="form-control"
                    type="number"
                    value={loan.termMonths?.toString() ?? ""}
                    onChange={onTermMonthsChange}
                    autoComplete={autoComplete}
                    min={1}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date Disbursed</label>
                <input
                    id="dateDisbursed"
                    className="form-control"
                    type="dateDisbursed"
                    value={formattedDate(loan.dateDisbursed)}
                    onChange={onDateDisbursedChange}
                    required
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
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} loan`}
            </button>
        </form>
    );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    ...state.sacco.loan.save,
    ...state.sacco.shared,
    ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...Store.actionCreators,
    ...SharedStore.actionCreators,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm));