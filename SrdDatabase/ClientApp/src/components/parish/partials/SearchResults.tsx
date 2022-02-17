import React from 'react';
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

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    deleteParish,
    deletingParishId,
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
    }

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
                    {
                        canEdit ?
                            <tr>
                                <th className="col-4">Name</th>
                                <th className="col-3">Archdeaconry</th>
                                <th className="col-2">Balance (UGX)</th>
                                <th className="col-3"></th>
                            </tr>
                            : canViewBalance ?
                                <tr>
                                    <th className="col-5">Name</th>
                                    <th className="col-4">Archdeaconry</th>
                                    <th className="col-2">Balance (UGX)</th>
                                    <th className="col-1"></th>
                                </tr>
                                :
                                <tr>
                                    <th className="col-6">Name</th>
                                    <th className="col-5">Archdeaconry</th>
                                    <th className="col-1"></th>
                                </tr>
                    }
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.parishes.map((parish: Parish) =>
                        <tr key={parish.id}>
                            <td>{parish.name}</td>
                            <td>
                                <Link to={`/archdeaconry/details/${parish.archdeaconryId}`}>{parish.archdeaconry}</Link>
                            </td>
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
                                            {parish.id === deletingParishId ? <Spinner size="sm" /> : 'Delete'}
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
