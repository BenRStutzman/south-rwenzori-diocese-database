import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { Loan } from '../../../../models/sacco/loan';
import * as Store from '../../../../store/sacco/loan/home';
import * as SharedStore from '../../../../store/sacco/shared';
import { State } from '../../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paging from '../../../shared/Paging';
import SortButton from '../../../shared/SortButton';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingLoanIds,
    deleteLoan,
    parameters,
    searchLoans,
}: Props) => {
    const onPage = (pageNumber: number) => {
        searchLoans({ ...parameters, pageNumber });
    }

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchLoans({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (loan: Loan) => {
        deleteLoan(loan, () => { searchLoans(parameters, false); });
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
                            Date disbursed
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
                                columnName="loanType"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2">
                            Principal (UGX)
                            <SortButton
                                parameters={parameters}
                                columnName="principal"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2">
                            Term (months)
                            <SortButton
                                parameters={parameters}
                                columnName="termMonths"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.loans.map((loan: Loan) =>
                        <tr key={loan.id}>
                            <td>{loan.date ? new Date(loan.date).toLocaleDateString('en-ca') : ''}</td>
                            <td>
                                <Link to={`/sacco/member/details/${loan.memberId}`}>{loan.member}</Link>
                            </td>
                            <td>{loan.loanType}</td>
                            <td className="number-column">{loan.principal?.toLocaleString()}</td>
                            <td className="number-column">{loan.termMonths}</td>
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/sacco/loan/details/${loan.id}`}>
                                    View
                                </Link>
                                <>
                                    <Link className="btn btn-primary" to={`/sacco/loan/edit/${loan.id}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => { onDelete(loan); }}>
                                        {deletingLoanIds.includes(loan.id as number) ? <Spinner size="sm" /> : 'Delete'}
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
    (state: State) => ({ ...state.sacco.loan.home, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
