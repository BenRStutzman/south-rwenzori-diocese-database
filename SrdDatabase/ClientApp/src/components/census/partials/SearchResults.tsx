import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Census } from '../../../models/census';
import { atLeast } from '../../../helpers/userHelper';
import * as Store from '../../..../../../store/census/home';
import * as SharedStore from '../../../store/shared';
import { State } from '../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { canEdit } from '../../../helpers/censusHelper';
import Paging from '../../shared/Paging';
import SortButton from '../../shared/SortButton';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingCensusIds,
    deleteCensus,
    currentUser,
    parameters,
    searchCensuses,
}: Props) => {
    const canEditSomeCensuses = currentUser && atLeast.contributor.includes(currentUser.userType);

    const onPage = (pageNumber: number) => {
        searchCensuses({ ...parameters, pageNumber });
    };

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchCensuses({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (census: Census) => {
        deleteCensus(census, () => { searchCensuses(parameters, false); });
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
                        <th className={`col-${canEditSomeCensuses ? '6' : '5'}`}>
                            Congregation
                            <SortButton
                                parameters={parameters}
                                columnName="congregation"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2">
                            Christians
                            <SortButton
                                parameters={parameters}
                                columnName="numberOfChristians"
                                onSort={onSort}
                            />
                        </th>
                        <th className={`col-${canEditSomeCensuses ? '2' : '1'}`}></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.censuses.map((census: Census) =>
                        <tr key={census.id}>
                            <td>{census.date ? new Date(census.date).toLocaleDateString('en-ca') : ''}</td>
                            <td>
                                <Link to={`/congregation/details/${census.congregationId}`}>{census.congregation}</Link>
                            </td>
                            <td className="number-column">{census.numberOfChristians?.toLocaleString()}</td>
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/census/details/${census.id}`}>
                                    View
                                </Link>
                                {
                                    canEdit(census, currentUser) &&
                                    <>
                                        <Link className="btn btn-primary" to={`/census/edit/${census.id}`}>
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => { onDelete(census); }}>
                                            {deletingCensusIds.includes(census.id as number) ? <Spinner size="sm" /> : 'Delete'}
                                        </button>
                                    </>
                                }
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
    (state: State) => ({ ...state.census.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
