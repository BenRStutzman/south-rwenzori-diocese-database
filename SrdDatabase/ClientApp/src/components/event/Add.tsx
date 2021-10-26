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
    setEventEventTypeId,
    setEventCongregationId,
    setEventPersonName,
    setEventDate,
    saveEvent,
    hasBeenSaved,
    hasBeenChanged,
    errors }: Props) => {
    const loadData = () => {
        loadEventTypes();
        loadCongregations();
        resetEvent();
    };

    useEffect(loadData, []);

    const onSubmit = () => {
        saveEvent(event, history);
    }

    return eventLoading || eventTypesLoading || congregationsLoading ? <LoadingSpinner /> :
        <>
            <h1>Add Event</h1>
            <Form
                event={event}
                updateEventEventTypeId={setEventEventTypeId}
                updateEventCongregationId={setEventCongregationId}
                updateEventPersonName={setEventPersonName}
                updateEventDate={setEventDate}
                onSubmit={onSubmit}
                hasBeenSaved={hasBeenSaved}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                eventTypes={eventTypes}
                congregations={congregations}
            />
        </>;
}

export default connect(
    (state: State) => state.event.save,
    Store.actionCreators
)(Add as any);
