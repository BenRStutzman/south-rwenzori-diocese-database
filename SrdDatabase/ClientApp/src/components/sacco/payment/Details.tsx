import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../../store/sacco/payment/details';
import * as SharedStore from '../../../store/sacco/shared';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { formattedDate } from '../../../helpers/miscellaneous';
import { Spinner } from 'reactstrap';
import { describePayment } from '../../../helpers/sacco/paymentHelper';

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
    deletingPaymentIds,
    deletePayment,
}: Props) => {
    const loadData = () => {
        const paymentId = parseInt(match.params.paymentId);
        loadDetails(paymentId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deletePayment(details.payment, () => { history.push('/sacco/payment'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{describePayment(details.payment)}</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/sacco/payment/edit/${details.payment.id}`}>
                        Edit payment
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingPaymentIds.includes(details.payment.id as number) ? <Spinner size="sm" /> : 'Delete payment'}
                    </button>
                </div>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="date"
                    itemValue={formattedDate(details.payment.date)}
                />
                <DetailsBox
                    baseItemType="payment"
                    itemType="member"
                    itemValue={details.payment.member}
                    itemId={details.payment.memberId}
                    isSacco
                    altPreposition="by"
                />
                <DetailsBox
                    baseItemType="payment"
                    itemType="loan"
                    itemValue={details.payment.loan}
                    itemId={details.payment.loanId}
                    isSacco
                    altPreposition="for"
                />
                <DetailsBox
                    itemType="receiptNumber"
                    itemValue={details.payment.receiptNumber?.toString() ?? "Not set"}
                />
                <DetailsBox
                    itemType="principal"
                    itemValue={details.payment.principal?.toLocaleString()}
                />
                <DetailsBox
                    itemType="interest"
                    itemValue={details.payment.interest?.toLocaleString()}
                />
                <DetailsBox
                    itemType="finePaid"
                    itemValue={details.payment.finePaid?.toLocaleString()}
                />
                <DetailsBox
                    itemType="fineIncurred"
                    itemValue={details.payment.fineIncurred?.toLocaleString()}
                />
                <DetailsBox
                    itemType="createdBy"
                    itemValue={details.payment.createdBy}
                />
                <DetailsBox
                    itemType="lastUpdatedBy"
                    itemValue={details.payment.updatedBy}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.payment.details, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);