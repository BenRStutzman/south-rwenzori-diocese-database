﻿import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { atLeast } from '../../../helpers/userHelper';
import { Parish } from '../../../models/parish';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import * as Store from '../../../store/parish/home';
import * as SharedStore from '../../../store/shared';
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
    deleteParish,
    deletingParishIds,
    resultsLoading,
    results,
    currentUser,
    searchParishes,
    parameters,
}: Props) => {
    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType as string);
    const canViewBalance = currentUser && atLeast.accountant.includes(currentUser.userType);

    const onPage = (pageNumber: number) => {
        searchParishes({ ...parameters, pageNumber });
    };

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchParishes({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (parish: Parish) => {
        deleteParish(parish, () => { searchParishes(parameters, false); });
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
                        <th className={`col-${canEdit ? '3' : canViewBalance ? '4' : '5'}`}>
                            Name
                            <SortButton
                                parameters={parameters}
                                columnName="name"
                                onSort={onSort}
                            />
                        </th>
                        <th className={`col-${canEdit ? '2' : canViewBalance ? '3' : '4'}`}>
                            Archdeaconry
                            <SortButton
                                parameters={parameters}
                                columnName="archdeaconry"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2">
                            # of Christians
                            <SortButton
                                parameters={parameters}
                                columnName="numberOfChristians"
                                onSort={onSort}
                            />
                        </th>
                        {
                            canViewBalance &&
                            <th className="col-2">
                                Balance (UGX)
                                <SortButton
                                    parameters={parameters}
                                    columnName="balance"
                                    onSort={onSort}
                                />
                            </th>
                        }
                        <th className={`col-${canEdit ? '3' : '1'}`}></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.parishes.map((parish: Parish) =>
                        <tr key={parish.id}>
                            <td>{parish.name}</td>
                            <td>
                                <Link to={`/archdeaconry/details/${parish.archdeaconryId}`}>{parish.archdeaconry}</Link>
                            </td>
                            <td>{parish.numberOfChristians}</td>
                            {
                                canViewBalance &&
                                <td className="money-column">{parenthesizeIfNegative(parish.balance as number)}</td>
                            }
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/parish/details/${parish.id}`}>
                                    View
                                </Link>
                                {
                                    canEdit &&
                                    <>
                                        <Link className="btn btn-primary" to={`/parish/edit/${parish.id}`}>
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => { onDelete(parish); }}>
                                            {deletingParishIds.includes(parish.id as number) ? <Spinner size="sm" /> : 'Delete'}
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
    (state: State) => ({ ...state.parish.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
