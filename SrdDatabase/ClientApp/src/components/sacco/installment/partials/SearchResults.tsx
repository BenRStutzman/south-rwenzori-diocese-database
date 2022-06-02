﻿import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { Installment } from '../../../../models/sacco/installment';
import * as Store from '../../../../store/sacco/installment/home';
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
    deletingInstallmentIds,
    deleteInstallment,
    parameters,
    searchInstallments,
}: Props) => {
    const onPage = (pageNumber: number) => {
        searchInstallments({ ...parameters, pageNumber });
    }

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchInstallments({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (installment: Installment) => {
        deleteInstallment(installment, () => { searchInstallments(parameters, false); });
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
                            Amount (UGX)
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
                    {results.installments.map((installment: Installment) =>
                        <tr key={installment.id}>
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
                            <td className="number-column">{installment.principal?.toLocaleString()}</td>
                            <td className="number-column">{installment.receiptNumber}</td>
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/sacco/installment/details/${installment.id}`}>
                                    View
                                </Link>
                                <>
                                    <Link className="btn btn-primary" to={`/sacco/installment/edit/${installment.id}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => { onDelete(installment); }}>
                                        {deletingInstallmentIds.includes(installment.id as number) ? <Spinner size="sm" /> : 'Delete'}
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
    (state: State) => ({ ...state.sacco.installment.home, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
