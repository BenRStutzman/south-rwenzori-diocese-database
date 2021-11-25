import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Congregation } from '../../../store/congregation';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface Props {
    congregationsLoading: boolean;
    congregations: Congregation[];
    deletingId?: number;
    onDelete: (congregation: Congregation) => void;
}

const SearchResults = ({
    congregationsLoading,
    congregations,
    deletingId,
    onDelete,
}: Props) => congregationsLoading ? <LoadingSpinner /> :
    !congregations.length ? <h2>No results.</h2> :
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th className="col-5">Name</th>
                    <th className="col-5">Parish</th>
                    <th className="col-1"></th>
                    <th className="col-1"></th>
                </tr>
            </thead>
            <tbody>
                {congregations.map((congregation: Congregation) =>
                    <tr key={congregation.id}>
                        <td>{congregation.name}</td>
                        <td>{congregation.parish}</td>
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
