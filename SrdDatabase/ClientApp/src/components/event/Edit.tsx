import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/event/save';
import * as SharedStore from '../../store/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ eventId: string }>;

const Edit = ({
    eventLoading,
    history,
    event,
    loadEvent,
    deleteEvent,
    deletingEventId,
    match,
}: Props) => {
    const loadData = () => {
        const eventId = parseInt(match.params.eventId);
        loadEvent(eventId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteEvent(event, () => { history.push('/event'); });
    };

    return eventLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Edit {event.eventType}</h1>
            <div className="float-right button-group">
                <Link className="btn btn-secondary float-right" to={`/event/details/${event.id}`}>
                    View details
                </Link>
                <button className="btn btn-danger float-right" type="button" onClick={onDelete}>
                    {event.id === deletingEventId ? <Spinner size="sm" /> : 'Delete event'}
                </button>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.event.save, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Edit as any);
