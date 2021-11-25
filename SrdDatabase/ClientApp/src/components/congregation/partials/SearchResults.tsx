import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Parish } from '../../../store/parish';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface Props {
    parishesLoading: boolean;
    parishes: Parish[];
    deletingId?: number;
    onDelete: (archdeaconry: Parish) => void;
}

const SearchResults = ({
    parishesLoading,
    parishes,
    deletingId,
    onDelete,
}: Props) => parishesLoading ? <LoadingSpinner /> :
    !parishes.length ? <h2>No results.</h2> :
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
                {parishes.map((parish: Parish) =>
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
