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
    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType as string);

    const nextPage = () => {
        searchArchdeaconries(parameters, results.pageNumber + 1);
    };

    const previousPage = () => {
        searchArchdeaconries(parameters, results.pageNumber - 1);
    };

    const onDelete = (archdeaconry: Archdeaconry) => {
        deleteArchdeaconry(archdeaconry, () => { searchArchdeaconries(parameters, results.pageNumber, false); });
    };

    return resultsLoading ? <LoadingSpinner /> :
        !results.totalResults ? <h2>No results.</h2> :
            <>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th className={`col-${canEdit ? '9' : '11'}`}>Name</th>
                            <th className={`col-${canEdit ? '3' : '1'}`}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.archdeaconries.map((archdeaconry: Archdeaconry) =>
                            <tr key={archdeaconry.id}>
                                <td>{archdeaconry.name}</td>
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
                    results={results}
                    nextPage={nextPage}
                    previousPage={previousPage}
                />
            </>;
}

export default connect(
    (state: State) => ({ ...state.archdeaconry.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
