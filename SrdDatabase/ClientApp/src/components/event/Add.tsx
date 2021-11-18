import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store';
import * as Store from '../../store/event/save';
import LoadingSpinner from '../shared/LoadingSpinner';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps;

const Add = ({
    event,
    eventLoading,
    eventTypesLoading,
    congregationsLoading,
    congregations,
    loadCongregations,
    eventTypes,
    loadEventTypes,
    resetEvent,
    history,
    setEventTypeId,
    setCongregationId,
    setFirstPersonName,
    setSecondPersonName,
    setDate,
    saveEvent,
    hasBeenChanged,
    isSaving,
    errors
}: Props) => {
    const loadData = () => {
        loadEventTypes();
        loadCongregations();
        resetEvent();
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveEvent(event, history);
    }

    return eventLoading || eventTypesLoading || congregationsLoading || isSaving
        ? <LoadingSpinner /> :
        <>
            <h1>Add Event</h1>
            <Form
                event={event}
                setEventTypeId={setEventTypeId}
                setCongregationId={setCongregationId}
                setFirstPersonName={setFirstPersonName}
                setSecondPersonName={setSecondPersonName}
                setDate={setDate}
                onSave={onSave}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                eventTypes={eventTypes}
                congregations={congregations}
                eventExists={false}
            />
        </>;
}

export default connect(
    (state: State) => state.event.save,
    Store.actionCreators
)(Add as any);
