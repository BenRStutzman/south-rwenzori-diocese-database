import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/charge/detailsmport * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { formattedDate } from '../../helpers/miscellaneous';
import { describeTransaction, parenthesizeAmountIfPayment } from '../../helpers/transactionHelper';
import { Spinner } from 'reactstrap';

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
    deletingTransactionId,
    deleteTransaction,
}: Props) => {
    const loadData = () => {
        const transactionId = parseInt(match.params.transactionId);
        loadDetails(transactionId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteTransaction(details.transaction, () => { history.push('/transaction'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1 className="page-title">{describeTransaction(details.transaction)}</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/transaction/edit/${details.transaction.id}`}>
                        Edit transaction
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {details.transaction.id === deletingTransactionId ? <Spinner size="sm" /> : 'Delete transaction'}
                    </button>
                </div>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="date"
                    itemValue={formattedDate(details.transaction)}
                />
                <DetailsBox
                    itemType="congregation"
                    itemValue={details.transaction.congregation}
                    itemId={details.transaction.congregationId}
                />
                <DetailsBox
                    itemType="parish"
                    itemValue={details.transaction.parish}
                    itemId={details.transaction.parishId}
                />
                <DetailsBox
                    itemType="archdeaconry"
                    itemValue={details.transaction.archdeaconry}
                    itemId={details.transaction.archdeaconryId}
                 />
            </div>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.transaction.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);