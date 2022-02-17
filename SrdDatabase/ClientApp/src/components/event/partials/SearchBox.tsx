import React, { ChangeEvent, useEffect, useState } from 'react';
import { randomString, useQueryParams } from '../../../helpers/miscellaneous';
import { State } from '../../../store';
import * as Store from '../../../store/event/home';
import * as SharedStore from '../../../store/shared';
import { connect } from 'react-redux';
import SearchButtons from '../../shared/SearchButtons';
import { bindActionCreators } from 'redux';

type OwnProps = {
    expanded: boolean;
}

type Props =
    OwnProps &
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
    prefillParameters,
    loadEventTypes,
    loadArchdeaconries,
    congregationsLoading,
    eventTypesLoading,
    resultsLoading,
    archdeaconriesLoading,
    expanded,
    parishesLoading,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        loadArchdeaconries();
        loadEventTypes();

        var congregationIdString = queryParams.get('congregationId');
        const congregationId = congregationIdString ? parseInt(congregationIdString) : undefined;

        var parishIdString = queryParams.get('parishId');
        const parishId = parishIdString ? parseInt(parishIdString) : undefined;

        var archdeaconryIdString = queryParams.get('archdeaconryId');
        const archdeaconryId = archdeaconryIdString ? parseInt(archdeaconryIdString) : undefined;

        prefillParameters(congregationId, parishId, archdeaconryId, true);
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
        searchEvents(parameters, true);
    };

    return (
        <div hidden={!expanded} className="search-box">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="eventTypeId">Event Type</label>
                            <select
                                id="eventTypeId"
                                className="form-control"
                                value={eventTypesLoading ? "" : parameters.eventTypeId ?? ""}
                                onChange={onEventTypeIdChange}
                            >
                                <option key={0} value="">
                                    {eventTypesLoading ? 'Loading...' : 'Any event type'}
                                </option>
                                {eventTypes.map(eventType =>
                                    <option key={eventType.id} value={eventType.id}>
                                        {eventType.name}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="personName">Person Name</label>
                            <input
                                id="personName"
                                className="form-control"
                                autoComplete={autoCompleteString}
                                type="text"
                                spellCheck={false}
                                value={parameters.personName ?? ""}
                                onChange={onPersonNameChange}
                                maxLength={50}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="archdeaconryId">Archdeaconry</label>
                            <select
                                id="archdeaconryId"
                                className="form-control"
                                value={archdeaconriesLoading ? "" : parameters.archdeaconryId ?? ""}
                                onChange={onArchdeaconryIdChange}
                            >
                                <option key={0} value="">
                                    {archdeaconriesLoading ? 'Loading...' : 'Any archdeaconry'}
                                </option>
                                {archdeaconries.map(archdeaconry =>
                                    <option key={archdeaconry.id} value={archdeaconry.id}>
                                        {archdeaconry.name}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="parishId">Parish</label>
                            <select
                                id="parishId"
                                className="form-control"
                                value={parishesLoading ? "" : parameters.parishId ?? ""}
                                onChange={onParishIdChange}
                            >
                                <option key={0} value="">
                                    {parishesLoading ? 'Loading...' : 'Any parish'}
                                </option>
                                {parishes.map(parish =>
                                    <option key={parish.id} value={parish.id}>
                                        {parish.name}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="congregationId">Congregation</label>
                            <select
                                id="congregationId"
                                className="form-control"
                                value={congregationsLoading ? "" : parameters.congregationId ?? ""}
                                onChange={onCongregationIdChange}
                            >
                                <option key={0} value="">
                                    {congregationsLoading ? 'Loading...' : 'Any congregation'}
                                </option>
                                {congregations.map(congregation =>
                                    <option key={congregation.id} value={congregation.id}>
                                        {congregation.name}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                                id="startDate"
                                className="form-control"
                                type="date"
                                value={parameters.startDate?.toLocaleDateString('en-ca') ?? ""}
                                onChange={onStartDateChange}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <input
                                id="endDate"
                                className="form-control"
                                type="date"
                                value={parameters.endDate?.toLocaleDateString('en-ca') ?? ""}
                                onChange={onEndDateChange}
                            />
                        </div>
                    </div>
                </div>
                <SearchButtons
                    searching={resultsLoading}
                    onClear={() => { prefillParameters(); }}
                    thingsBeingSearched="events"
                />
            </form>
        </div>
    );
}

export default connect(
    (state: State, ownProps: OwnProps) => ({
        ...state.event.home,
        ...state.shared,
        ...ownProps,
    }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchBox);