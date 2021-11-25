import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Archdeaconry } from '../../../store/archdeaconry/';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface Props {
    archdeaconriesLoading: boolean;
    archdeaconries: Archdeaconry[];
    deletingId?: number;
    onDelete: (archdeaconry: Archdeaconry) => void;
}

const SearchResults = ({
    archdeaconriesLoading,
    archdeaconries,
    deletingId,
    onDelete,
}: Props) => archdeaconriesLoading ? <LoadingSpinner /> :
    !archdeaconries.length ? <h2>No results.</h2> :
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th className="col-10">Name</th>
                    <th className="col-1"></th>
                    <th className="col-1"></th>
                </tr>
            </thead>
            <tbody>
                {archdeaconries.map((archdeaconry: Archdeaconry) =>
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
