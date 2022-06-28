import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { Payment } from '../../../../models/sacco/payment';
import * as Store from '../../../../store/sacco/payment/home';
import * as SharedStore from '../../../../store/sacco/shared';
import { State } from '../../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paging from '../../../shared/Paging';
import SortButton from '../../../shared/SortButton';
import { formattedDate } from '../../../../helpers/miscellaneous';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingPaymentIds,
    deletePayment,
    parameters,
    searchPayments,
}: Props) => {
    const onPage = (pageNumber: number) => {
        searchPayments({ ...parameters, pageNumber });
    }

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchPayments({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (payment: Payment) => {
        deletePayment(payment, () => { searchPayments(parameters, false); });
    };

    return (
        <>
            <Paging
                results={results}
                onPage={onPage}
            />
            {resultsLoading && <LoadingSpinner onTable />}
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="col-2">
                            Date
                            <SortButton
                                parameters={parameters}
                                columnName="date"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2">
                            Member
                            <SortButton
                                parameters={parameters}
                                columnName="member"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2">
                            Loan
                            <SortButton
                                parameters={parameters}
                                columnName="loan"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2">
                            Amount
                            <SortButton
                                parameters={parameters}
                                columnName="amount"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2">
                            Receipt #
                            <SortButton
                                parameters={parameters}
                                columnName="receiptNumber"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.payments.map((payment: Payment) =>
                        <tr key={payment.id}>
                            <td>{formattedDate(payment.date)}</td>
                            <td>
                                <Link to={`/sacco/member/details/${payment.memberId}`}>{payment.member}</Link>
                            </td>
                            <td>
                                <Link to={`/sacco/loan/details/${payment.loanId}`}>
                                    {payment.loan}
                                </Link>
                            </td>
                            <td className="number-column">{payment.amount?.toLocaleString()}</td>
                            <td className="number-column">{payment.receiptNumber}</td>
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/sacco/payment/details/${payment.id}`}>
                                    View
                                </Link>
                                <>
                                    <Link className="btn btn-primary" to={`/sacco/payment/edit/${payment.id}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => { onDelete(payment); }}>
                                        {deletingPaymentIds.includes(payment.id as number) ? <Spinner size="sm" /> : 'Delete'}
                                    </button>
                                </>
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
            {!resultsLoading && !results.totalResults && <h2>No results.</h2>}
            <Paging
                results={results}
                onPage={onPage}
            />
        </>
    );
}

export default connect(
    (state: State) => ({ ...state.sacco.payment.home, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
