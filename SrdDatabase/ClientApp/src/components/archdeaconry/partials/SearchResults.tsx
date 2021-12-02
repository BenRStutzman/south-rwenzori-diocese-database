import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { atLeast } from '../../../helpers/userRole';
import { Archdeaconry } from '../../../store/archdeaconry/';
import LoadingSpinner from '../../shared/LoadingSpinner';
import * as Store from '../../../store/archdeaconry/home';
import * as SharedStore from '../../../store/shared';
import { State } from '../../../store';
import { connect } from 'react-redux';

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
    user,
}: Props) => {
    const canEdit = user && atLeast.editor.includes(user.userType as string);

    const onDelete = (archdeaconry: Archdeaconry) => {
        deleteArchdeaconry(archdeaconry, () => { searchArchdeaconries(parameters, false); });
    }

    return resultsLoading ? <LoadingSpinner /> :
        !results.length ? <h2>No results.</h2> :
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className={`col-${canEdit ? '9' : '11'}`}>Name</th>
                        <th className="col-1"></th>
                        {
                            canEdit &&
                            <>
                                <th className="col-1"></th>
                                <th className="col-1"></th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody>
                    {results.map((archdeaconry: Archdeaconry) =>
                        <tr key={archdeaconry.id}>
                            <td>{archdeaconry.name}</td>
                            <td>
                                <Link className="btn btn-secondary" to={`/archdeaconry/details/${archdeaconry.id}`}>
                                    View
                                </Link>
                            </td>
                            {
                                canEdit &&
                                <>
                                    <td>
                                        <Link className="btn btn-primary" to={`/archdeaconry/edit/${archdeaconry.id}`}>
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { onDelete(archdeaconry); }}>
                                            {archdeaconry.id === deletingArchdeaconryId ? <Spinner size="sm" /> : "Delete"}
                                        </button>
                                    </td>
                                </>
                            }
                        </tr>
                    )}
                </tbody>
            </table>;
}

export default connect(
    (state: State) => ({ ...state.archdeaconry.home, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(SearchResults as any);
