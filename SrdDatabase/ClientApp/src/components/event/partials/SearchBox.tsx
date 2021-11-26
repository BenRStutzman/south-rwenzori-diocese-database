﻿import { SearchParameters } from '../../../store/event/home';
import { AppThunkAction } from '../../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { randomString } from '../../../helpers/randomString';
import { Parish } from '../../../store/parish';
import { Archdeaconry } from '../../../store/archdeaconry';
import { Congregation } from '../../../store/congregation';
import { EventType } from '../../../store/event';

const autoCompleteString = randomString();

interface Props {
    parameters: SearchParameters;
    archdeaconries: Archdeaconry[];
    parishes: Parish[];
    congregations: Congregation[];
    eventTypes: EventType[];
    setSearchPersonName: (personName: string) => AppThunkAction<Action>;
    setSearchArchdeaconryId: (archdeaconryId: number) => AppThunkAction<Action>;
    setSearchParishId: (parishId: number) => AppThunkAction<Action>;
    setSearchCongregationId: (congregationId: number) => AppThunkAction<Action>;
    setSearchEventTypeId: (eventTypeId: number) => AppThunkAction<Action>;
    setSearchStartDate: (startDate: Date) => AppThunkAction<Action>;
    setSearchEndDate: (endDate: Date) => AppThunkAction<Action>;
    onSearch: () => void;
}

const SearchBox = ({
    onSearch,
    parameters,
    setSearchPersonName,
    setSearchArchdeaconryId,
    setSearchParishId,
    setSearchCongregationId,
    setSearchEventTypeId,
    setSearchStartDate,
    setSearchEndDate,
    archdeaconries,
    parishes,
    congregations,
    eventTypes,
}: Props) => {
    const onPersonNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchPersonName(event.target.value);
    };

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchArchdeaconryId(parseInt(event.target.value));
    };

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParishId(parseInt(event.target.value));
    };

    const onCongregationIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchCongregationId(parseInt(event.target.value));
    };

    const onEventTypeIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchEventTypeId(parseInt(event.target.value));
    };

    const onStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchStartDate(new Date(event.target.value));
    };

    const onEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchEndDate(new Date(event.target.value));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch();
    };

    return (
        <form onSubmit={onSubmit} className="search-box">
            <div className="form-group">
                <label htmlFor="personName">Person Name</label>
                <input
                    id="personName"
                    className="form-control"
                    autoComplete={autoCompleteString}
                    type="text"
                    spellCheck={false}
                    value={parameters.personName ? parameters.personName : ""}
                    onChange={onPersonNameChange}
                    maxLength={50}
                />
            </div>
            <div className="form-group">
                <label htmlFor="eventTypeId">Event Type</label>
                <select
                    id="eventTypeId"
                    className="form-control"
                    value={parameters.eventTypeId ? parameters.eventTypeId : ""}
                    onChange={onEventTypeIdChange}
                >
                    <option key={0} value="">--- select an event type ---</option>
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
                    value={parameters.congregationId ? parameters.congregationId : ""}
                    onChange={onCongregationIdChange}
                >
                    <option key={0} value="">--- select a congregation ---</option>
                    {congregations.map(congregation =>
                        <option key={congregation.id} value={congregation.id}>
                            {congregation.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="parishId">Parish</label>
                <select
                    id="parishId"
                    className="form-control"
                    value={parameters.parishId ? parameters.parishId : ""}
                    onChange={onParishIdChange}
                >
                    <option key={0} value="">--- select a parish ---</option>
                    {parishes.map(parish =>
                        <option key={parish.id} value={parish.id}>
                            {parish.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="archdeaconryId">Archdeaconry</label>
                <select
                    id="archdeaconryId"
                    className="form-control"
                    value={parameters.archdeaconryId ? parameters.archdeaconryId : ""}
                    onChange={onArchdeaconryIdChange}
                >
                    <option key={0} value="">--- select an archdeaconry ---</option>
                    {archdeaconries.map(archdeaconry =>
                        <option key={archdeaconry.id} value={archdeaconry.id}>
                            {archdeaconry.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                    id="startDate"
                    className="form-control"
                    type="date"
                    value={parameters.startDate ? new Date(parameters.startDate).toLocaleDateString('en-ca') : ""}
                    onChange={onStartDateChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                    id="endDate"
                    className="form-control"
                    type="date"
                    value={parameters.endDate ? new Date(parameters.endDate).toLocaleDateString('en-ca') : ""}
                    onChange={onEndDateChange}
                />
            </div>
            <button className="btn btn-primary" type="submit">
                Search events
            </button>
        </form>
    );
}

export default SearchBox;