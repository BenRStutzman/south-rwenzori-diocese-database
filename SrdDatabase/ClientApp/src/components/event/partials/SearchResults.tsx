import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Event } from '../../../store/event';

interface Props {
    resultsLoading: boolean;
    results: Event[];
    deletingId?: number;
    onDelete: (event: Event) => void;
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
                    <th className="col-1">Event Type</th>
                    <th className="col-1">Congregation</th>
                    <th className="col-2">First Person Name</th>
                    <th className="col-2">Second Person Name</th>
                    <th className="col-1">Date</th>
                    <th className="col-1">Details</th>
                    <th className="col-1"></th>
                    <th className="col-1"></th>
                </tr>
            </thead>
            <tbody>
                {results.map((event: Event) =>
                    <tr key={event.id}>
                        <td>{event.eventType}</td>
                        <td>{event.congregation}</td>
                        <td>{event.firstPersonName}</td>
                        <td>{event.secondPersonName}</td>
                        <td>{new Date(event.date).toLocaleDateString('en-ca')}</td>
                        <td>
                            <Link className="btn btn-secondary" to={`/event/details/${event.id}`}>
                                View
                            </Link>
                        </td>
                        <td>
                            <Link className="btn btn-primary" to={`/event/edit/${event.id}`}>
                                Edit
                            </Link>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => { onDelete(event); }}>
                                {event.id === deletingId ? <Spinner size="sm" /> : 'Delete'}
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

export default SearchResults;
