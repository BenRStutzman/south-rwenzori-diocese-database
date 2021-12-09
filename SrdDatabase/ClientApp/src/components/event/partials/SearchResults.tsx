import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Event } from '../../../models/event';
import { atLeast } from '../../../helpers/userHelper';
import * as Store from '../../../store/event/home';
import * as SharedStore from '../../../store/shared';
import { State } from '../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { peoplesNames } from '../../../helpers/eventHelper';
import Paging from '../../shared/Paging';

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
    currentUser,
    parameters,
    searchEvents,
}: Props) => {
    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType as string);

    const nextPage = () => {
        searchEvents(parameters, results.pageNumber + 1);
    };

    const previousPage = () => {
        searchEvents(parameters, results.pageNumber - 1);
    };

    const onDelete = (event: Event) => {
        deleteEvent(event, () => { searchEvents(parameters, results.pageNumber, false); });
    };

    return resultsLoading ? <LoadingSpinner /> :
        !results.totalResults ? <h2>No results.</h2> :
            <>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th className={`col-${canEdit ? '1' : '2'}`}>Event Type</th>
                            <th className="col-4">Name(s)</th>
                            <th className={`col-${canEdit ? '2' : '3'}`}>Congregation</th>
                            <th className="col-2">Date</th>
                            <th className={`col-${canEdit ? '1' : '3'}`}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.events.map((event: Event) =>
                            <tr key={event.id}>
                                <td>{event.eventType}</td>
                                <td>{peoplesNames(event)}</td>
                                <td>{event.congregation}</td>
                                <td>{event.date ? new Date(event.date).toLocaleDateString('en-ca') : ''}</td>
                                <td className="buttons-column">
                                    <Link className="btn btn-secondary" to={`/event/details/${event.id}`}>
                                        View
                                    </Link>
                                    {
                                        canEdit &&
                                        <>
                                            <Link className="btn btn-primary" to={`/event/edit/${event.id}`}>
                                                Edit
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => { onDelete(event); }}>
                                                {event.id === deletingEventId ? <Spinner size="sm" /> : 'Delete'}
                                            </button>
                                        </>
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Paging
                    results={results}
                    nextPage={nextPage}
                    previousPage={previousPage}
                />
            </>;
}

export default connect(
    (state: State) => ({ ...state.event.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
