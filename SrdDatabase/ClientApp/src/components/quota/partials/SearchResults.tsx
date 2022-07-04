import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Quota } from '../../../models/quota';
import * as Store from '../../../store/quota/home';
import * as SharedStore from '../../../store/shared';
import { State } from '../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paging from '../../shared/Paging';
import SortButton from '../../shared/SortButton';
import { formattedDates } from '../../../helpers/quotaHelper';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingQuotaIds,
    deleteQuota,
    parameters,
    searchQuotas,
}: Props) => {
    const onPage = (pageNumber: number) => {
        searchQuotas({ ...parameters, pageNumber });
    };

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchQuotas({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (quota: Quota) => {
        deleteQuota(quota, () => { searchQuotas(parameters, false); });
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
                            Year(s)
                            <SortButton
                                parameters={parameters}
                                columnName="years"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-5">
                            Congregation
                            <SortButton
                                parameters={parameters}
                                columnName="congregation"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-3">
                            Amount Per Year (UGX)
                            <SortButton
                                parameters={parameters}
                                columnName="amountPerYear"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.quotas.map((quota: Quota) =>
                        <tr key={quota.id}>
                            <td>{formattedDates(quota)}</td>
                            <td>
                                <Link to={`/congregation/details/${quota.congregationId}`}>{quota.congregation}</Link>
                            </td>
                            <td className="number-column">{quota.amountPerYear?.toLocaleString()}</td>
                            <td>
                                <div className="buttons-column">
                                    <Link className="btn btn-secondary" to={`/quota/details/${quota.id}`}>
                                        View
                                    </Link>
                                    <Link className="btn btn-primary" to={`/quota/edit/${quota.id}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => { onDelete(quota); }}>
                                        {deletingQuotaIds.includes(quota.id as number) ? <Spinner size="sm" /> : 'Delete'}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
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
    (state: State) => ({ ...state.quota.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
