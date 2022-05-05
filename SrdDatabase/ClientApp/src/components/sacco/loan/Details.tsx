import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../../store/sacco/loan/details';
import * as SharedStore from '../../../store/sacco/shared';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { formattedDate } from '../../../helpers/miscellaneous';
import { Spinner } from 'reactstrap';
import { describeLoan, describeLoanTerm } from '../../../helpers/sacco/loanHelper';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ loanId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    history,
    deletingLoanIds,
    deleteLoan,
}: Props) => {
    const loadData = () => {
        const loanId = parseInt(match.params.loanId);
        loadDetails(loanId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteLoan(details.loan, () => { history.push('/sacco/loan'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{describeLoan(details.loan)}</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/sacco/loan/edit/${details.loan.id}`}>
                        Edit loan
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingLoanIds.includes(details.loan.id as number) ? <Spinner size="sm" /> : 'Delete loan'}
                    </button>
                </div>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="dateDisbursed"
                    itemValue={formattedDate(details.loan.date)}
                />
                <DetailsBox
                    baseItemType="loan"
                    itemType="member"
                    itemValue={details.loan.member}
                    itemId={details.loan.memberId}
                    isSacco
                    altPreposition="to"
                />
                <DetailsBox
                    itemType="principal"
                    itemValue={`${details.loan.principal?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="term"
                    itemValue={describeLoanTerm(details.loan)}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.loan.details, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);