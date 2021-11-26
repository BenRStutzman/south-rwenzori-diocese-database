import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { User } from '../../../store/user';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface Props {
    resultsLoading: boolean;
    results: User[];
    deletingId?: number;
    onDelete: (user: User) => void;
}

const SearchResults = ({
    resultsLoading,
    results,
    deletingId,
    onDelete,
}: Props) => resultsLoading ? <LoadingSpinner /> :
    !results.length ? <h2>No results.</h2> :
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th className="col-2">Name</th>
                    <th className="col-3">Username</th>
                    <th className="col-2">User Type</th>
                    <th className="col-1"></th>
                    <th className="col-1"></th>
                </tr>
            </thead>
            <tbody>
                {results.map((user: User) =>
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.userType}</td>
                        <td>
                            <Link className="btn btn-secondary" to={`/user/edit/${user.id}`}>
                                Edit
                            </Link>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => { onDelete(user); }}>
                                {user.id === deletingId ? <Spinner size="sm" /> : 'Delete'}
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

export default SearchResults;
