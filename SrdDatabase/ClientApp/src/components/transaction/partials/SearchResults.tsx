import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Transaction } from '../../../models/transaction';
import * as Store from '../../../store/transaction/home';
import * as SharedStore from '../../../store/shared';
import { State } from '../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paging from '../../shared/Paging';
import { parenthesizeAmountIfPayment } from '../../../helpers/transactionHelper';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingTransactionId,
    deleteTransaction,
    parameters,
    searchTransactions,
}: Props) => {
    const nextPage = () => {
        searchTransactions(parameters, results.pageNumber + 1);
    };

    const previousPage = () => {
        searchTransactions(parameters, results.pageNumber - 1);
    };

    const onDelete = (transaction: Transaction) => {
        deleteTransaction(transaction, () => { searchTransactions(parameters, results.pageNumber, false); });
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
                            <th className="col-2">Transaction Type</th>
                            <th className="col-3">Congregation</th>
                            <th className="col-2">Amount (UGX)</th>
                            <th className="col-2">Date</th>
                            <th className="col-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.transactions.map((transaction: Transaction) =>
                            <tr key={transaction.id}>
                                <td>{transaction.transactionType}</td>
                                <td>{transaction.congregation}</td>
                                <td className="balance-column">{parenthesizeAmountIfPayment(transaction)}</td>
                                <td>{transaction.date ? new Date(transaction.date).toLocaleDateString('en-ca') : ''}</td>
                                <td className="buttons-column">
                                    <Link className="btn btn-secondary" to={`/transaction/details/${transaction.id}`}>
                                        View
                                    </Link>
                                    <>
                                        <Link className="btn btn-primary" to={`/transaction/edit/${transaction.id}`}>
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => { onDelete(transaction); }}>
                                            {transaction.id === deletingTransactionId ? <Spinner size="sm" /> : 'Delete'}
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
    (state: State) => ({ ...state.transaction.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
