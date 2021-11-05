import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/event/home';
import { Event } from '../../store/event';
import { useEffect } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';

type Props = Store.State & typeof Store.actionCreators;

const Home = ({
    eventsLoading,
    events,
    loadEvents,
    deleteEvent }: Props) => {
    const loadData = () => { loadEvents() };

    useEffect(loadData, []);

    const onDelete = (event: Event) => {
        if (window.confirm(`Are you sure you want to delete this ${event.eventType} event?`)) {
            deleteEvent(event.id as number);
        }
    }

    return eventsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Events</h1>
            <Link className="btn btn-primary float-right" to="/event/add">Add new</Link>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="col-2">Event Type</th>
                        <th className="col-2">Congregation</th>
                        <th className="col-3">Person Name</th>
                        <th className="col-1">Date</th>
                        <th className="col-1"></th>
                        <th className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event: Event) =>
                        <tr key={event.id}>
                            <td>{event.eventType}</td>
                            <td>{event.congregation}</td>
                            <td>{event.personName}</td>
                            <td>{new Date(event.date as Date).toLocaleDateString('en-ca')}</td>
                            <td>
                                <Link className="btn btn-secondary" to={`/event/edit/${event.id}`}>
                                    Edit
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => { onDelete(event); }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>;
}    

export default connect(
    (state: State) => state.event.home,
    Store.actionCreators
)(Home as any);
