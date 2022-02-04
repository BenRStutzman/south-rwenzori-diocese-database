import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/event/save';
import * as SharedStore from '../../store/shared';
import { Redirect, RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { canEdit, peoplesNames } from '../../helpers/eventHelper';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ eventId: string }>;

const Edit = ({
    isLoading,
    history,
    event,
    loadEvent,
    deleteEvent,
    deletingEventId,
    match,
    currentUser,
}: Props) => {
    const loadData = () => {
        const eventId = parseInt(match.params.eventId);
        loadEvent(eventId);
    };

    // Make sure we're checking the current event,
    // not a past event left over in state, when deciding whether to redirect.
    const eventIsCurrent = parseInt(match.params.eventId) === event.id;

    useEffect(loadData, []);

    const onDelete = () => {
        deleteEvent(event, () => { history.push('/event'); });
    };

    return isLoading ? <LoadingSpinner fullPage /> :
        eventIsCurrent && !canEdit(event, currentUser) ? <Redirect to='/' /> :
            <>
                <div className="page-heading">
                    <h1>Edit {event.eventType} of {peoplesNames(event)}</h1>
                    <div className="float-right button-group">
                        <Link className="btn btn-secondary" to={`/event/details/${event.id}`}>
                            View details
                        </Link>
                        <button className="btn btn-danger" type="button" onClick={onDelete}>
                            {event.id === deletingEventId ? <Spinner size="sm" /> : 'Delete event'}
                        </button>
                    </div>
                </div>
                <SaveForm />
            </>;
}

export default connect(
    (state: State) => ({ ...state.event.save, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
