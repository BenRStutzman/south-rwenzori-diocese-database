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
import { canEdit, peoplesNames } from '../../../helpers/eventHelper';
import Paging from '../../shared/Paging';
import SortButton from '../../shared/SortButton';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingEventIds,
    deleteEvent,
    currentUser,
    parameters,
    searchEvents,
}: Props) => {
    const canEditSomeEvents = currentUser && atLeast.contributor.includes(currentUser.userType);

    const onPage = (pageNumber: number) => {
        searchEvents({ ...parameters, pageNumber });
    };

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchEvents({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (event: Event) => {
        deleteEvent(event, () => { searchEvents(parameters, false); });
    };

    return (
        <>
            <Paging
                results={results}
                onPage={onPage}
            />
            {resultsLoading && <LoadingSpinner onTable />}
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="col-2">
                            Date
                            <SortButton
                                parameters={parameters}
                                columnName="date"
                                onSort={onSort}
                            />
                        </th>
                        <th className={`col-${canEditSomeEvents ? '2' : '3'}`}>
                            Location
                            <SortButton
                                parameters={parameters}
                                columnName="congregation"
                                onSort={onSort}
                            />
                        </th>
                        <th className={`col-${canEditSomeEvents ? '1' : '2'}`}>
                            Type
                            <SortButton
                                parameters={parameters}
                                columnName="eventType"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2">
                            Name(s)
                            <SortButton
                                parameters={parameters}
                                columnName="firstPersonName"
                                onSort={onSort}
                            />
                        </th>
                        <th className={`col-${canEditSomeEvents ? '3' : '1'}`}></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.events.map((event: Event) =>
                        <tr key={event.id}>
                            <td>{event.date ? new Date(event.date).toLocaleDateString('en-ca') : ''}</td>
                            <td>
                                {
                                    event.congregationId ?
                                        <Link to={`/congregation/details/${event.congregationId}`}>{event.congregation} Congregation</Link>
                                        : <Link to={`/parish/details/${event.parishId}`}>{event.parish} Parish</Link>

                                }
                            </td>
                            <td>{event.description ?? event.eventType}</td>
                            <td>{peoplesNames(event)}</td>
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/event/details/${event.id}`}>
                                    View
                                </Link>
                                {
                                    canEdit(event, currentUser) &&
                                    <>
                                        <Link className="btn btn-primary" to={`/event/edit/${event.id}`}>
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => { onDelete(event); }}>
                                            {deletingEventIds.includes(event.id as number) ? <Spinner size="sm" /> : 'Delete'}
                                        </button>
                                    </>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {!resultsLoading && !results.totalResults && <h2>No results.</h2>}
            <Paging
                results={results}
                onPage={onPage}
            />
        </>
    );
}

export default connect(
    (state: State) => ({ ...state.event.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
