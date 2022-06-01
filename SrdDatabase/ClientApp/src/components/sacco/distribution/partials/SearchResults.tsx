import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { Distribution } from '../../../../models/sacco/distribution';
import * as Store from '../../../../store/sacco/distribution/home';
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
    deletingDistributionIds,
    deleteDistribution,
    parameters,
    searchDistributions,
}: Props) => {
    const onPage = (pageNumber: number) => {
        searchDistributions({ ...parameters, pageNumber });
    }

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchDistributions({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (distribution: Distribution) => {
        deleteDistribution(distribution, () => { searchDistributions(parameters, false); });
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
                        <th className="col-8">
                            Percentage
                            <SortButton
                                parameters={parameters}
                                columnName="member"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.distributions.map((distribution: Distribution) =>
                        <tr key={distribution.id}>
                            <td>{formattedDate(distribution.date)}</td>
                            <td className="number-column">{distribution.dividendPercentage}</td>
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/sacco/distribution/details/${distribution.id}`}>
                                    View
                                </Link>
                                <>
                                    <Link className="btn btn-primary" to={`/sacco/distribution/edit/${distribution.id}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => { onDelete(distribution); }}>
                                        {deletingDistributionIds.includes(distribution.id as number) ? <Spinner size="sm" /> : 'Delete'}
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
    (state: State) => ({ ...state.sacco.distribution.home, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
