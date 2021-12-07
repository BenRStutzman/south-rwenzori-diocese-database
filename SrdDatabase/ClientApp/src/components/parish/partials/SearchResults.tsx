import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { atLeast } from '../../../helpers/userRole';
import { Parish } from '../../../store/parish';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import * as Store from '../../../store/parish/home';
import * as SharedStore from '../../../store/shared';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

    const onDelete = (parish: Parish) => {
        deleteParish(parish, () => { searchParishes(parameters, false); });
    }

    return resultsLoading ? <LoadingSpinner /> :
        !results.length ? <h2>No results.</h2> :
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className={`col-${canEdit ? '5' : '6'}`}>Name</th>
                        <th className={`col-${canEdit ? '4' : '5'}`}>Archdeaconry</th>
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
                    {results.map((parish: Parish) =>
                        <tr key={parish.id}>
                            <td>{parish.name}</td>
                            <td>{parish.archdeaconry}</td>
                            <td>
                                <Link className="btn btn-secondary" to={`/parish/details/${parish.id}`}>
                                    View
                                </Link>
                            </td>
                            {
                                canEdit &&
                                <>
                                    <td>
                                        <Link className="btn btn-primary" to={`/parish/edit/${parish.id}`}>
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { onDelete(parish); }}>
                                            {parish.id === deletingParishId ? <Spinner size="sm" /> : 'Delete'}
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
    (state: State) => ({ ...state.parish.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
