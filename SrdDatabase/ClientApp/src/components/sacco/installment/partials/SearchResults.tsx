import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { Installment } from '../../../../models/sacco/installment';
import * as Store from '../../../../store/sacco/installment/home';
import { State } from '../../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paging from '../../../shared/Paging';
import SortButton from '../../../shared/SortButton';
import { formattedDate } from '../../../../helpers/miscellaneous';

type Props =
    Store.State &
    typeof Store.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    parameters,
    searchInstallments,
}: Props) => {
    const onPage = (pageNumber: number) => {
        searchInstallments({ ...parameters, pageNumber });
    }

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchInstallments({ ...parameters, sortColumn, sortDescending });
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
                            Date due
                            <SortButton
                                parameters={parameters}
                                columnName="dateDue"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2">
                            Date paid
                            <SortButton
                                parameters={parameters}
                                columnName="datePaid"
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
                            Total due (UGX)
                            <SortButton
                                parameters={parameters}
                                columnName="totalDue"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.installments.map((installment: Installment) =>
                        <tr key={installment.id}>
                            <td>{formattedDate(installment.dateDue)}</td>
                            <td>{formattedDate(installment.datePaid)}</td>
                            <td>
                                <Link to={`/sacco/member/details/${installment.memberId}`}>
                                    {installment.member}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/sacco/loan/details/${installment.loanId}`}>
                                    {installment.loan}
                                </Link>
                            </td>
                            <td className="number-column">{installment.totalDue?.toLocaleString()}</td>
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/sacco/installment/details/${installment.id}`}>
                                    View
                                </Link>
                                <Link className="btn btn-primary" to={`/sacco/installment/edit/${installment.id}`}>
                                    Edit
                                </Link>
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
    (state: State) => state.sacco.installment.home,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(SearchResults);
