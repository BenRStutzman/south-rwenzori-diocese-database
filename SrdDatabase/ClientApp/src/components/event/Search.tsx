import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/event/search';
import { Event } from '../../store/event';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

type Props = Store.State & typeof Store.actionCreators & RouteComponentProps;

const Search = ({ events, history, loadEvents, deleteEvent }: Props) => {
    const loadData = () => { loadEvents() };

    useEffect(loadData, []);

    const addEvent = () => history.push(`/event/add`);

    const editEvent = (eventId: number) => history.push(`/event/edit/${eventId}`);

    return (
        <>
            <h1 className="page-title">Events</h1>
            <button className="btn btn-primary float-right" onClick={addEvent}>Add new</button>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="col-2">Event Type</th>
                        <th className="col-2">Congregation</th>
                        <th className="col-2">Person Name</th>
                        <th className="col-2">Date</th>
                        <th className="col-1"></th>
                        <th className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event: Event) =>
                        <tr key={event.id}>
                            <td>{event.eventType}</td>
                            <td>{event.parish}</td>
                            <td>{event.personName}</td>
                            <td>{event.date}</td>
                            <td>
                                <button className="btn btn-secondary"onClick={() => { editEvent(event.id as number); }}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger"onClick={() => { deleteEvent(event.id as number); }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}    

export default connect(
    (state: State) => state.event.home,
    Store.actionCreators
)(Search as any);
