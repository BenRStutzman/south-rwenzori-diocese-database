import { Event, EventType } from "../../store/event";
import { AppThunkAction } from '../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { Errors } from "../../apiHelpers";
import { Congregation } from "../../store/congregation";

interface Props {
    event: Event;
    onSave: () => void;
    onDelete?: () => void;
    setEventTypeId: (eventTypeId: number) => AppThunkAction<Action>;
    setCongregationId: (parishId: number) => AppThunkAction<Action>;
    setPersonName: (personName: string) => AppThunkAction<Action>;
    setDate: (date: Date) => AppThunkAction<Action>;
    hasBeenChanged: boolean;
    errors: Errors;
    eventTypes: EventType[];
    congregations: Congregation[];
    eventExists: boolean;
}

const Form = ({
    event,
    congregations,
    eventTypes,
    onSave,
    onDelete,
    setEventTypeId,
    setCongregationId,
    setPersonName,
    setDate,
    hasBeenChanged,
    errors,
    eventExists,
}: Props) => {
    const onEventTypeIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setEventTypeId(parseInt(event.target.value));
    };

    const onCongregationIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCongregationId(parseInt(event.target.value));
    };

    const onPersonNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPersonName(event.target.value);
    };

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(new Date(event.target.value));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave();
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="eventTypeId">Event Type</label>
                <select
                    id="eventTypeId"
                    className="form-control"
                    value={event.eventTypeId ? event.eventTypeId : ""}
                    onChange={onEventTypeIdChange}
                    required
                >
                    <option key={0} value="" disabled>--- select an event type ---</option>
                    {eventTypes.map(eventType =>
                        <option key={eventType.id} value={eventType.id}>
                            {eventType.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="congregationId">Congregation</label>
                <select
                    id="congregationId"
                    className="form-control"
                    value={event.congregationId ? event.congregationId : ""}
                    onChange={onCongregationIdChange}
                    required
                >
                    <option key={0} value="" disabled>--- select a congregation ---</option>
                    {congregations.map(congregation =>
                        <option key={congregation.id} value={congregation.id}>
                            {congregation.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="personName">Person Name</label>
                <input
                    id="personName"
                    className="form-control"
                    type="text"
                    spellCheck={false}
                    value={event.personName ? event.personName : ""}
                    onChange={onPersonNameChange}
                    maxLength={50}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    className="form-control"
                    type="date"
                    value={new Date(event.date).toLocaleDateString('en-ca')}
                    onChange={onDateChange}
                    required
                />
            </div>
            {Object.values(errors).length > 0 &&
                <ul>
                    {Object.entries(errors).map(([fieldName, errorList]: [string, string[]]) =>
                        <li
                            className="error-alert"
                            key={fieldName}>
                            {errorList.join(" ")}</li>
                    )}
                </ul>
            }
            <button disabled={!hasBeenChanged} className="btn btn-primary" type="submit">
                {eventExists ? "Update" : "Create"} event
            </button>
            {
                eventExists &&
                <button className="btn btn-danger float-right" type="button" onClick={onDelete}>
                    Delete event
                </button>
            }
        </form>
    );
}

export default Form;