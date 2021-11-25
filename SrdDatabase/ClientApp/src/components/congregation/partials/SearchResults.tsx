import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Congregation } from '../../../store/congregation';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface Props {
    resultsLoading: boolean;
    results: Congregation[];
    deletingId?: number;
    onDelete: (congregation: Congregation) => void;
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
                    <th className="col-4">Name</th>
                    <th className="col-3">Parish</th>
                    <th className="col-3">Archdeaconry</th>
                    <th className="col-1"></th>
                    <th className="col-1"></th>
                </tr>
            </thead>
            <tbody>
                {results.map((congregation: Congregation) =>
                    <tr key={congregation.id}>
                        <td>{congregation.name}</td>
                        <td>{congregation.parish}</td>
                        <td>{congregation.archdeaconry}</td>
                        <td>
                            <Link className="btn btn-secondary" to={`/congregation/edit/${congregation.id}`}>
                                Edit
                            </Link>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => { onDelete(congregation); }}>
                                {congregation.id === deletingId ? <Spinner size="sm" /> : "Delete"}
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

export default SearchResults;
