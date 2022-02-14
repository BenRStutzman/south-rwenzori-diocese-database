import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/payment/details';
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { formattedDate } from '../../helpers/miscellaneous';
import { Spinner } from 'reactstrap';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ paymentId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    history,
    deletingPaymentId,
    deletePayment,
}: Props) => {
    const loadData = () => {
        const paymentId = parseInt(match.params.paymentId);
        loadDetails(paymentId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deletePayment(details.payment, () => { history.push('/payment'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{`Payment of ${details.payment.amount} UGX`}</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/payment/edit/${details.payment.id}`}>
                        Edit payment
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {details.payment.id === deletingPaymentId ? <Spinner size="sm" /> : 'Delete payment'}
                    </button>
                </div>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="date"
                    itemValue={formattedDate(details.payment.date)}
                />
                <DetailsBox
                    itemType="receiptNumber"
                    itemValue={details.payment.receiptNumber?.toString() ?? ""}
                />
                <DetailsBox
                    baseItemType="payment"
                    itemType="congregation"
                    itemValue={details.payment.congregation}
                    itemId={details.payment.congregationId}
                />
                <DetailsBox
                    baseItemType="payment"
                    itemType="parish"
                    itemValue={details.payment.parish}
                    itemId={details.payment.parishId}
                />
                <DetailsBox
                    baseItemType="payment"
                    itemType="archdeaconry"
                    itemValue={details.payment.archdeaconry}
                    itemId={details.payment.archdeaconryId}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.payment.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);