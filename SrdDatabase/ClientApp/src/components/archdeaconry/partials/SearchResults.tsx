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

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    parameters,
    results,
    deletingArchdeaconryId,
    deleteArchdeaconry,
    searchArchdeaconries,
    currentUser,
}: Props) => {
    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType);
    const canViewBalance = currentUser && atLeast.accountant.includes(currentUser.userType);

    const onPage = (pageNumber: number) => {
        searchArchdeaconries({ ...parameters, pageNumber });
    };

    const onDelete = (archdeaconry: Archdeaconry) => {
        deleteArchdeaconry(archdeaconry, () => { searchArchdeaconries(parameters, false); });
    };

    return resultsLoading ? <LoadingSpinner /> :
        !results.totalResults ? <h2>No results.</h2> :
            <>
                <Paging
                    resultsLoading={resultsLoading}
                    results={results}
                    onPage={onPage}
                />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        {
                            canEdit ?
                                <tr>
                                    <th className="col-7">Name</th>
                                    <th className="col-2">Balance (UGX)</th>
                                    <th className="col-3"></th>
                                </tr>
                                : canViewBalance ?
                                    <tr>
                                        <th className="col-9">Name</th>
                                        <th className="col-2">Balance (UGX)</th>
                                        <th className="col-1"></th>
                                    </tr>
                                    :
                                    <tr>
                                        <th className="col-11">Name</th>
                                        <th className="col-1"></th>
                                    </tr>
                        }
                    </thead>
                    <tbody>
                        {results.archdeaconries.map((archdeaconry: Archdeaconry) =>
                            <tr key={archdeaconry.id}>
                                <td>{archdeaconry.name}</td>
                                {
                                    canViewBalance &&
                                    <td className="money-column">{parenthesizeIfNegative(archdeaconry.balance as number)}</td>
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
                                                {archdeaconry.id === deletingArchdeaconryId ? <Spinner size="sm" /> : "Delete"}
                                            </button>
                                        </>
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Paging
                    resultsLoading={resultsLoading}
                    results={results}
                    onPage={onPage}
                />
            </>;
}

export default connect(
    (state: State) => ({ ...state.archdeaconry.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
