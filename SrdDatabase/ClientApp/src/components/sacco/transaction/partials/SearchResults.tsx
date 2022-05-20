import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { Transaction } from '../../../../models/sacco/transaction';
import * as Store from '../../../../store/sacco/transaction/home';
import * as SharedStore from '../../../../store/sacco/shared';
import { State } from '../../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paging from '../../../shared/Paging';
import SortButton from '../../../shared/SortButton';
import { describeTransactionAmount, describeTransactionType } from '../../../../helpers/sacco/transactionHelper';
import { formattedDate } from '../../../../helpers/miscellaneous';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingTransactionIds,
    deleteTransaction,
    parameters,
    searchTransactions,
}: Props) => {
    const onPage = (pageNumber: number) => {
        searchTransactions({ ...parameters, pageNumber });
    }

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchTransactions({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (transaction: Transaction) => {
        deleteTransaction(transaction, () => { searchTransactions(parameters, false); });
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
                            Type
                            <SortButton
                                parameters={parameters}
                                columnName="isShares"
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
                    {results.transactions.map((transaction: Transaction) =>
                        <tr key={transaction.id}>
                            <td>{formattedDate(transaction.date)}</td>
                            <td>
                                <Link to={`/sacco/member/details/${transaction.memberId}`}>{transaction.member}</Link>
                            </td>
                            <td>
                                <Link to={`/sacco/transaction/details/${transaction.id}`}>
                                    {describeTransactionType(transaction)}
                                </Link>
                            </td>
                            <td className="number-column">{describeTransactionAmount(transaction)}</td>
                            <td className="number-column">{transaction.receiptNumber}</td>
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/sacco/transaction/details/${transaction.id}`}>
                                    View
                                </Link>
                                <>
                                    <Link className="btn btn-primary" to={`/sacco/transaction/edit/${transaction.id}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => { onDelete(transaction); }}>
                                        {deletingTransactionIds.includes(transaction.id as number) ? <Spinner size="sm" /> : 'Delete'}
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
    (state: State) => ({ ...state.sacco.transaction.home, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
