import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Event } from '../../../store/event';
import { atLeast } from '../../../helpers/userRole';
import * as Store from '../../../store/event/home';
import * as SharedStore from '../../../store/shared';
import { State } from '../../../store';
import { connect } from 'react-redux';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingEventId,
    deleteEvent,
    user,
    parameters,
    searchEvents,
}: Props) => {
    const canEdit = user && atLeast.editor.includes(user.userType as string);

    const onDelete = (event: Event) => {
        deleteEvent(event, () => { searchEvents(parameters, false); });
    };

    return resultsLoading ? <LoadingSpinner /> :
        !results.length ? <h2>No results.</h2> :
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className={`col-${canEdit ? '1' : '2'}`}>Event Type</th>
                        <th className={`col-${canEdit ? '2' : '3'}`}>Congregation</th>
                        <th className="col-2">First Person Name</th>
                        <th className="col-2">Second Person Name</th>
                        <th className="col-2">Date</th>
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
                    {results.map((event: Event) =>
                        <tr key={event.id}>
                            <td>{event.eventType}</td>
                            <td>{event.congregation}</td>
                            <td>{event.firstPersonName}</td>
                            <td>{event.secondPersonName}</td>
                            <td>{new Date(event.date as Date).toLocaleDateString('en-ca')}</td>
                            <td>
                                <Link className="btn btn-secondary" to={`/event/details/${event.id}`}>
                                    View
                                </Link>
                            </td>
                            {
                                canEdit &&
                                <>
                                    <td>
                                        <Link className="btn btn-primary" to={`/event/edit/${event.id}`}>
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { onDelete(event); }}>
                                            {event.id === deletingEventId ? <Spinner size="sm" /> : 'Delete'}
                                        </button>
                                    </td>
                                </>
                            }
                        </tr>
                    )}
                </tbody>
            </table>;
}

export default connect(
    (state: State) => ({ ...state.event.home, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(SearchResults as any);
