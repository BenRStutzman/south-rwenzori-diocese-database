import { State } from '../../../store';
import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';
import * as Store from '../../../store/event/save';
import * as SharedStore from '../../../store/shared';
import { RouteComponentProps, withRouter } from 'react-router';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { bindActionCreators, Dispatch } from 'redux';
import { randomString } from '../../../helpers/miscellaneous';

const autoComplete = randomString();

interface OwnProps {
    isNew?: boolean;
}

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps &
    OwnProps;

const SaveForm = ({
    event,
    archdeaconries,
    parishes,
    congregations,
    eventTypes,
    saveEvent,
    setEventTypeId,
    setCongregationId,
    setArchdeaconryId,
    setParishId,
    setFirstPersonName,
    setSecondPersonName,
    loadArchdeaconries,
    loadEventTypes,
    setDate,
    hasBeenChanged,
    errors,
    isNew,
    history,
    isSaving,
    eventLoading,
    eventTypesLoading,
    congregationsLoading,
    archdeaconriesLoading,
    parishesLoading,
}: Props) => {
    const loadData = () => {
        loadArchdeaconries();
        loadEventTypes();
    };

    useEffect(loadData, []);

    const onEventTypeIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setEventTypeId(parseInt(event.target.value));
    };

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setArchdeaconryId(parseInt(event.target.value));
    }

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setParishId(parseInt(event.target.value));
    }

    const onCongregationIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCongregationId(parseInt(event.target.value));
    };

    const onFirstPersonNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstPersonName(event.target.value);
    };

    const onSecondPersonNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSecondPersonName(event.target.value);
    };

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(new Date(event.target.value));
    };

    const onSubmit = (formEvent: React.FormEvent) => {
        formEvent.preventDefault();
        saveEvent(event, history);
    };

    const involvesTwoPeople = eventTypes.find(eventType => eventType.id === event.eventTypeId)?.involvesTwoPeople;

    return eventLoading ? <LoadingSpinner /> :
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="eventTypeId">Event Type</label>
                {
                    eventTypesLoading ? <LoadingSpinner /> :
                        <select
                            id="eventTypeId"
                            className="form-control"
                            value={event.eventTypeId ?? ""}
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
                }
            </div>
            <div className="form-group">
                <label htmlFor="archdeaconryId">Archdeaconry</label>
                {
                    archdeaconriesLoading ? <LoadingSpinner /> :
                        <select
                            id="archdeaconryId"
                            className="form-control"
                            value={event.archdeaconryId ?? ""}
                            onChange={onArchdeaconryIdChange}
                            required
                        >
                            <option key={0} value="" disabled>--- select an archdeaconry ---</option>
                            {archdeaconries.map(archdeaconry =>
                                <option key={archdeaconry.id} value={archdeaconry.id}>
                                    {archdeaconry.name}
                                </option>
                            )}
                        </select>
                }
            </div>
            <div className="form-group">
                <label htmlFor="parishId">Parish</label>
                {
                    !event.archdeaconryId ? undefined
                        : <select
                            id="parishId"
                            className="form-control"
                            value={event.parishId ?? ""}
                            onChange={onParishIdChange}
                            required
                        >
                            <option key={0} value="" disabled>{
                                parishesLoading ? 'Loading...'
                                    : parishes.length === 0 ? '--- no parishes available in the selected archdeaconry ---'
                                        : '--- select a parish ---'}</option>
                            {parishes.map(parish =>
                                <option key={parish.id} value={parish.id}>
                                    {parish.name}
                                </option>
                            )}
                        </select>
                }
            </div>
            <div className="form-group">
                <label htmlFor="congregationId">Congregation</label>
                {
                    !event.parishId ? undefined
                        : <select
                            id="congregationId"
                            className="form-control"
                            value={event.congregationId ?? ""}
                            onChange={onCongregationIdChange}
                            required
                        >
                            <option key={0} value="" disabled>{
                                congregationsLoading ? 'Loading...'
                                    : congregations.length === 0 ? '--- no congregations available in the selected parish ---'
                                        : '-- - select a congregation ---'
                            }</option>
                            {congregations.map(congregation =>
                                <option key={congregation.id} value={congregation.id}>
                                    {congregation.name}
                                </option>
                            )}
                        </select>
                }
            </div>
            <div className="form-group">
                <label htmlFor="firstPersonName">{involvesTwoPeople ? 'First ' : ''} Person Name</label>
                <input
                    id="firstPersonName"
                    className="form-control"
                    type="text"
                    spellCheck={false}
                    value={event.firstPersonName ?? ""}
                    onChange={onFirstPersonNameChange}
                    autoComplete={autoComplete}
                    maxLength={50}
                    required
                />
            </div>
            {
                involvesTwoPeople &&
                <div className="form-group">
                    <label htmlFor="secondPersonName">Second Person Name</label>
                    <input
                        id="secondPersonName"
                        className="form-control"
                        type="text"
                        spellCheck={false}
                        autoComplete={autoComplete}
                        value={event.secondPersonName ?? ""}
                        onChange={onSecondPersonNameChange}
                        maxLength={50}
                        required
                    />
                </div>
            }
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    className="form-control"
                    type="date"
                    value={event.date ? new Date(event.date).toLocaleDateString('en-ca') : ''}
                    onChange={onDateChange}
                    required
                />
            </div>
            {
                Object.values(errors).length > 0 &&
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
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} event`}
            </button>
        </form>;
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    ...state.event.save,
    ...state.shared,
    ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...Store.actionCreators,
    ...SharedStore.actionCreators,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm));