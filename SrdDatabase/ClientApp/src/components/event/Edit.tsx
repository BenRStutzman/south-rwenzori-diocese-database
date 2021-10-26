import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/event/save';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import Form from './Form';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps<{ eventId: string }>;

const Edit = ({
    eventLoading,
    eventTypesLoading,
    congregationsLoading,
    history,
    event,
    congregations,
    eventTypes,
    setEventPersonName,
    setEventCongregationId,
    setEventEventTypeId,
    setEventDate,
    loadEvent,
    loadCongregations,
    loadEventTypes,
    saveEvent,
    match,
    hasBeenSaved,
    hasBeenChanged,
    errors }: Props) => {
    const loadData = () => {
        loadEventTypes();
        loadCongregations();
        const eventId = parseInt(match.params.eventId);
        loadEvent(eventId);
    };

    useEffect(loadData, []);

    const onSubmit = () => {
        saveEvent(event, history);
    }

    return eventLoading || eventTypesLoading || congregationsLoading ? <LoadingSpinner /> :
        <>
            <h1>Edit {event.eventType}</h1>
            <Form
                event={event}
                eventTypes={eventTypes}
                congregations={congregations}
                updateEventPersonName={setEventPersonName}
                updateEventCongregationId={setEventCongregationId}
                updateEventEventTypeId={setEventEventTypeId}
                updateEventDate={setEventDate}
                onSubmit={onSubmit}
                hasBeenChanged={hasBeenChanged}
                hasBeenSaved={hasBeenSaved}
                errors={errors}
            />
        </>;
}

export default connect(
    (state: State) => state.event.save,
    Store.actionCreators
)(Edit as any);
