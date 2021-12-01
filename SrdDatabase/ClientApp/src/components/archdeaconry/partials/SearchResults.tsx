import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { atLeast } from '../../../helpers/userRole';
import { Archdeaconry } from '../../../store/archdeaconry/';
import { User } from '../../../store/user';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface Props {
    resultsLoading: boolean;
    results: Archdeaconry[];
    deletingArchdeaconryId?: number;
    onDelete: (archdeaconry: Archdeaconry) => void;
    user: User;
}

const SearchResults = ({
    resultsLoading,
    results,
    deletingArchdeaconryId,
    onDelete,
    user,
}: Props) => {
    const canEdit = atLeast.editor.includes(user.userType as string);

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

export default SearchResults;
