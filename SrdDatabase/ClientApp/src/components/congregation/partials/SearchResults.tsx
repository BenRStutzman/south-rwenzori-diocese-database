import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { atLeast } from '../../../helpers/userRole';
import { Congregation } from '../../../store/congregation';
import { User } from '../../../store/user';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface Props {
    resultsLoading: boolean;
    results: Congregation[];
    deletingId?: number;
    onDelete: (congregation: Congregation) => void;
    user: User;
}

const SearchResults = ({
    resultsLoading,
    results,
    deletingId,
    onDelete,
    user,
}: Props) => {
    const canEdit = atLeast.editor.includes(user.userType as string);

    return resultsLoading ? <LoadingSpinner /> :
        !results.length ? <h2>No results.</h2> :
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className={`col-${canEdit ? '5' : '6'}`}>Name</th>
                        <th className={`col-${canEdit ? '4' : '5'}`}>Parish</th>
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
                    {results.map((congregation: Congregation) =>
                        <tr key={congregation.id}>
                            <td>{congregation.name}</td>
                            <td>{congregation.parish}</td>
                            <td>
                                <Link className="btn btn-secondary" to={`/congregation/details/${congregation.id}`}>
                                    View
                                </Link>
                            </td>
                            {
                                canEdit &&
                                <>
                                    <td>
                                        <Link className="btn btn-primary" to={`/congregation/edit/${congregation.id}`}>
                                            Edit
                                        </Link>
                                     </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { onDelete(congregation); }}>
                                            {congregation.id === deletingId ? <Spinner size="sm" /> : "Delete"}
                                        </button>
                                    </td>
                                </>
                            }
                        </tr>
                    )}
                </tbody>
            </table>
};

export default SearchResults;
