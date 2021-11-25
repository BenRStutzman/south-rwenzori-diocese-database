import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Archdeaconry } from '../../../store/archdeaconry/';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface Props {
    resultsLoading: boolean;
    results: Archdeaconry[];
    deletingId?: number;
    onDelete: (archdeaconry: Archdeaconry) => void;
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
                    <th className="col-10">Name</th>
                    <th className="col-1"></th>
                    <th className="col-1"></th>
                </tr>
            </thead>
            <tbody>
                {results.map((archdeaconry: Archdeaconry) =>
                    <tr key={archdeaconry.id}>
                        <td>{archdeaconry.name}</td>
                        <td>
                            <Link className="btn btn-secondary" to={`/archdeaconry/edit/${archdeaconry.id}`}>
                                Edit
                            </Link>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => { onDelete(archdeaconry); }}>
                                {archdeaconry.id === deletingId ? <Spinner size="sm" /> : "Delete"}
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

export default SearchResults;
