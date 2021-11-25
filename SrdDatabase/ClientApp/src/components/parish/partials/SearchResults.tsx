import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Parish } from '../../../store/parish';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface Props {
    resultsLoading: boolean;
    results: Parish[];
    deletingId?: number;
    onDelete: (parish: Parish) => void;
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
                    <th className="col-5">Name</th>
                    <th className="col-5">Archdeaconry</th>
                    <th className="col-1"></th>
                    <th className="col-1"></th>
                </tr>
            </thead>
            <tbody>
                {results.map((parish: Parish) =>
                    <tr key={parish.id}>
                        <td>{parish.name}</td>
                        <td>{parish.archdeaconry}</td>
                        <td>
                            <Link className="btn btn-secondary" to={`/parish/edit/${parish.id}`}>
                                Edit
                            </Link>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => { onDelete(parish); }}>
                                {parish.id === deletingId ? <Spinner size="sm" /> : 'Delete'}
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

export default SearchResults;
