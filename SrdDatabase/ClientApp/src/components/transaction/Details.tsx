import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/transaction/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { formattedDate } from '../../helpers/miscellaneous';
import { parenthesizeAmountIfPayment } from '../../helpers/transactionHelper';

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
}: Props) => {
    const loadData = () => {
        const transactionId = parseInt(match.params.transactionId);
        loadDetails(transactionId);
    };

    React.useEffect(loadData, []);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">
                {`${details.transaction.isPayment ? 'Payment from' : 'Charge to'} ${details.transaction.congregation} Congregation`}
            </h1>
            <Link className="btn btn-primary float-right" to={`/transaction/edit/${details.transaction.id}`}>
                Edit transaction
            </Link>
            <div className="details-boxes">
                <DetailsBox
                    itemType="amount (UGX)"
                    itemValue={parenthesizeAmountIfPayment(details.transaction)}
                />
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