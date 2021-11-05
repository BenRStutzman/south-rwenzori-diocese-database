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
    setPersonName,
    setCongregationId,
    setEventTypeId,
    setDate,
    loadEvent,
    loadCongregations,
    loadEventTypes,
    saveEvent,
    deleteEvent,
    match,
    isSaving,
    hasBeenChanged,
    errors }: Props) => {
    const loadData = () => {
        loadEventTypes();
        loadCongregations();
        const eventId = parseInt(match.params.eventId);
        loadEvent(eventId);
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveEvent(event, history);
    };

    const onDelete = () => {
        if (window.confirm(`Are you sure you want to delete this ${event.eventType} event?`)) {
            deleteEvent(event.id as number, history);
        }
    };

    return eventLoading || eventTypesLoading || congregationsLoading || isSaving
        ? <LoadingSpinner /> :
        <>
            <h1>Edit {event.eventType}</h1>
            <Form
                event={event}
                eventTypes={eventTypes}
                congregations={congregations}
                setPersonName={setPersonName}
                setCongregationId={setCongregationId}
                setEventTypeId={setEventTypeId}
                setDate={setDate}
                onSave={onSave}
                onDelete={onDelete}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                eventExists={true}
            />
        </>;
}

export default connect(
    (state: State) => state.event.save,
    Store.actionCreators
)(Edit as any);
