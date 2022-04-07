import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { atLeast } from '../../../helpers/userHelper';
import { Archdeaconry } from '../../../models/archdeaconry';
import LoadingSpinner from '../../shared/LoadingSpinner';
import * as Store from '../../../store/archdeaconry/home';
import * as SharedStore from '../../../store/shared';
import { State } from '../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paging from '../../shared/Paging';
import { parenthesizeIfNegative } from '../../../helpers/miscellaneous';
import SortButton from '../../shared/SortButton';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    parameters,
    results,
    deletingArchdeaconryIds,
    deleteArchdeaconry,
    searchArchdeaconries,
    currentUser,
}: Props) => {
    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType);
    const canViewTransactions = currentUser && atLeast.accountant.includes(currentUser.userType);

    const onPage = (pageNumber: number) => {
        searchArchdeaconries({ ...parameters, pageNumber });
    };

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchArchdeaconries({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (archdeaconry: Archdeaconry) => {
        deleteArchdeaconry(archdeaconry, () => { searchArchdeaconries(parameters, false); });
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
                        <th className={`col-${canEdit ? '4' : canViewTransactions ? '5' : '9'}`}>
                            Name
                            <SortButton
                                parameters={parameters}
                                columnName="name"
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
                        {
                            canViewTransactions &&
                            <>
                                <th className='col-2'>
                                    {new Date().getFullYear()} Quota
                                    <SortButton
                                        parameters={parameters}
                                        columnName="quota"
                                        onSort={onSort}
                                    />
                                </th>
                                <th className='col-2'>
                                    Balance
                                    <SortButton
                                        parameters={parameters}
                                        columnName="balance"
                                        onSort={onSort}
                                    />
                                </th>
                            </>
                        }
                        <th className={`col-${canEdit ? '2' : '1'}`}></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.archdeaconries.map((archdeaconry: Archdeaconry) =>
                        <tr key={archdeaconry.id}>
                            <td>
                                <Link to={`/archdeaconry/details/${archdeaconry.id}`}>{archdeaconry.name}</Link>
                            </td>
                            <td className="number-column">{archdeaconry.numberOfChristians}</td>
                            {
                                canViewTransactions &&
                                <>
                                    <td className="number-column">{archdeaconry.quota}</td>
                                    <td className="number-column">{parenthesizeIfNegative(archdeaconry.balance as number)}</td>
                                </>
                            }
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/archdeaconry/details/${archdeaconry.id}`}>
                                    View
                                </Link>
                                {
                                    canEdit &&
                                    <>
                                        <Link className="btn btn-primary" to={`/archdeaconry/edit/${archdeaconry.id}`}>
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => { onDelete(archdeaconry); }}>
                                            {deletingArchdeaconryIds.includes(archdeaconry.id as number) ? <Spinner size="sm" /> : "Delete"}
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
    (state: State) => ({ ...state.archdeaconry.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
