import React, { ChangeEvent, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import { randomString } from '../../../helpers/randomString';
import { State } from '../../../store';
import * as Store from '../../../store/event/home';
import * as SharedStore from '../../../store/shared';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { connect } from 'react-redux';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const autoCompleteString = randomString();

const SearchBox = ({
    searchEvents,
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
    resetParameters,
    loadCongregations,
    loadEventTypes,
    loadArchdeaconries,
    loadParishes,
    congregationsLoading,
    eventTypesLoading,
    resultsLoading,
    archdeaconriesLoading,
    parishesLoading,
}: Props) => {
    const loadData = () => {
        resetParameters();
        loadArchdeaconries();
        loadParishes();
        loadCongregations();
        loadEventTypes();
        searchEvents();
    };

    useEffect(loadData, []);

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
        searchEvents(parameters);
    };

    return congregationsLoading || eventTypesLoading || archdeaconriesLoading || parishesLoading
        ? <LoadingSpinner /> :
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
                {resultsLoading ? <Spinner size="sm" /> : 'Search events'}
            </button>
        </form>;
}

export default connect(
    (state: State) => ({ ...state.event.home, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(SearchBox as any);