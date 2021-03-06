import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/payment/save';
import * as SharedStore from '../../store/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ paymentId: string }>;

const Edit = ({
    isLoading,
    history,
    payment,
    loadPayment,
    deletePayment,
    deletingPaymentIds,
    match,
}: Props) => {
    const loadData = () => {
        const paymentId = parseInt(match.params.paymentId);
        loadPayment(paymentId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deletePayment(payment, () => { history.push('/payment'); });
    };

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{`Edit payment of ${payment.amount} UGX`}</h1>
                <div className="float-right button-group">
                    <Link className="btn btn-secondary" to={`/payment/details/${payment.id}`}>
                        View details
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingPaymentIds.includes(payment.id as number) ? <Spinner size="sm" /> : 'Delete payment'}
                    </button>
                </div>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.payment.save, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
