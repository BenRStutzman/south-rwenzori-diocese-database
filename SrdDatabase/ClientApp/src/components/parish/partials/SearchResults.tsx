import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { atLeast } from '../../../helpers/userRole';
import { Parish } from '../../../store/parish';
import { User } from '../../../store/user';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface Props {
    resultsLoading: boolean;
    results: Parish[];
    deletingId?: number;
    onDelete: (parish: Parish) => void;
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
                                            {parish.id === deletingId ? <Spinner size="sm" /> : 'Delete'}
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
