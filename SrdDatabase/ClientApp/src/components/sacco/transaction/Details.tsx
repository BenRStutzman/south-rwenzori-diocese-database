import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../../store/sacco/transaction/details';
import * as SharedStore from '../../../store/sacco/shared';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { formattedDate } from '../../../helpers/miscellaneous';
import { Spinner } from 'reactstrap';
import { describeTransaction } from '../../../helpers/sacco/transactionHelper';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ transactionId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    history,
    deletingTransactionIds,
    deleteTransaction,
}: Props) => {
    const loadData = () => {
        const transactionId = parseInt(match.params.transactionId);
        loadDetails(transactionId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteTransaction(details.transaction, () => { history.push('/sacco/transaction'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{describeTransaction(details.transaction)}</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/sacco/transaction/edit/${details.transaction.id}`}>
                        Edit transaction
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingTransactionIds.includes(details.transaction.id as number) ? <Spinner size="sm" /> : 'Delete transaction'}
                    </button>
                </div>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="date"
                    itemValue={formattedDate(details.transaction.date)}
                />
                <DetailsBox
                    itemType="receiptNumber"
                    itemValue={details.transaction.receiptNumber?.toString() ?? "Not set"}
                />
                <DetailsBox
                    baseItemType="transaction"
                    itemType="member"
                    itemValue={details.transaction.member}
                    itemId={details.transaction.memberId}
                    isSacco
                />
                <DetailsBox
                    baseItemType="transaction"
                    itemType="isShares"
                    itemValue={details.transaction.isShares ? 'Yes' : 'No'}
                />
                <DetailsBox
                    baseItemType="transaction"
                    itemType="isContribution"
                    itemValue={details.transaction.isContribution ? 'Yes' : 'No'}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.transaction.details, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);