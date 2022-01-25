import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Payment } from '../../../models/payment';
import * as Store from '../../../store/payment/home';
import * as SharedStore from '../../../store/shared';
import { State } from '../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paging from '../../shared/Paging';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingPaymentId,
    deletePayment,
    parameters,
    searchPayments,
}: Props) => {
    const nextPage = () => {
        searchPayments(parameters, results.pageNumber + 1);
    };

    const previousPage = () => {
        searchPayments(parameters, results.pageNumber - 1);
    };

    const onDelete = (payment: Payment) => {
        deletePayment(payment, () => { searchPayments(parameters, results.pageNumber, false); });
    };

    return resultsLoading ? <LoadingSpinner /> :
        !results.totalResults ? <h2>No results.</h2> :
            <>
                <Paging
                    results={results}
                    nextPage={nextPage}
                    previousPage={previousPage}
                />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th className="col-2">Amount (UGX)</th>
                            <th className="col-3">Congregation</th>
                            <th className="col-2">Date</th>
                            <th className="col-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.payments.map((payment: Payment) =>
                            <tr key={payment.id}>
                                <td className="balance-column">{payment.amount}</td>
                                <td>
                                    <Link to={`/congregation/details/${payment.congregationId}`}>{payment.congregation}</Link>
                                </td>
                                <td>{payment.date ? new Date(payment.date).toLocaleDateString('en-ca') : ''}</td>
                                <td className="buttons-column">
                                    <Link className="btn btn-secondary" to={`/payment/details/${payment.id}`}>
                                        View
                                    </Link>
                                    <>
                                        <Link className="btn btn-primary" to={`/payment/edit/${payment.id}`}>
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => { onDelete(payment); }}>
                                            {payment.id === deletingPaymentId ? <Spinner size="sm" /> : 'Delete'}
                                        </button>
                                    </>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Paging
                    results={results}
                    nextPage={nextPage}
                    previousPage={previousPage}
                />
            </>;
}

export default connect(
    (state: State) => ({ ...state.payment.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
