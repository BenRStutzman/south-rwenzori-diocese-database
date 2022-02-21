import { State } from '../../../store';
import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';
import * as Store from '../../../store/event/save';
import * as SharedStore from '../../../store/shared';
import { RouteComponentProps, withRouter } from 'react-router';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
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
    setDescription,
    loadArchdeaconries,
    loadEventTypes,
    setDate,
    hasBeenChanged,
    errors,
    isNew,
    history,
    isSaving,
    eventTypesLoading,
    congregationsLoading,
    archdeaconriesLoading,
    parishesLoading,
}: Props) => {
    const [multiInput, setMultiInput] = React.useState(false);
    const [personNames, setPersonNames] = React.useState('');

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

    const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const onPersonNamesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPersonNames(event.target.value);
    }

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(new Date(event.target.value));
    };

    const onSubmit = (formEvent: React.FormEvent) => {
        formEvent.preventDefault();

        const eventToSave = {
            ...event,
            parishId: associatedWithParish ? event.parishId : undefined,
            congregationId: associatedWithParish ? undefined : event.congregationId,
            description: involvesDescription ? event.description : undefined,
            personNames: allowMultiInput && multiInput ?
                personNames
                    .trim()
                    .split(/\s*\n+\s*/)
                    .filter(name => name.length) : undefined,
            firstPersonName: involvesFirstPerson ? event.firstPersonName : undefined,
            secondPersonName: involvesSecondPerson ? event.secondPersonName : undefined,
        }

        saveEvent(eventToSave, history);
    };

    const eventType = eventTypes.find(eventType => eventType.id === event.eventTypeId);

    const associatedWithParish = eventType?.associatedWithParish;
    const involvesDescription = eventType?.involvesDescription;
    const involvesFirstPerson = eventType?.involvesFirstPerson;
    const involvesSecondPerson = eventType?.involvesSecondPerson;

    const allowMultiInput = isNew && involvesFirstPerson && !involvesSecondPerson;

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="eventTypeId">Event Type</label>
                <select
                    id="eventTypeId"
                    className="form-control"
                    value={eventTypesLoading ? "" : event.eventTypeId ?? ""}
                    onChange={onEventTypeIdChange}
                    required
                >
                    <option key={0} value="" disabled>
                        {eventTypesLoading ? 'Loading...' : '--- select an event type ---'}
                    </option>
                    {eventTypes.map(eventType =>
                        <option key={eventType.id} value={eventType.id}>
                            {eventType.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="archdeaconryId">Archdeaconry</label>
                <select
                    id="archdeaconryId"
                    className="form-control"
                    value={archdeaconriesLoading ? "" : event.archdeaconryId ?? ""}
                    onChange={onArchdeaconryIdChange}
                    required
                >
                    <option key={0} value="" disabled>
                        {archdeaconriesLoading ? 'Loading...' : '--- select an archdeaconry ---'}
                    </option>
                    {archdeaconries.map(archdeaconry =>
                        <option key={archdeaconry.id} value={archdeaconry.id}>
                            {archdeaconry.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="parishId">Parish</label>
                <select
                    id="parishId"
                    className="form-control"
                    value={parishesLoading ? "" : event.parishId ?? ""}
                    onChange={onParishIdChange}
                    required
                >
                    <option key={0} value="" disabled>{
                        !event.archdeaconryId ? 'First select an archdeaconry above'
                            : parishesLoading ? 'Loading...'
                                : parishes.length === 0 ? 'No parishes available in the selected archdeaconry'
                                    : '--- select a parish ---'
                    }</option>
                    {parishes.map(parish =>
                        <option key={parish.id} value={parish.id}>
                            {parish.name}
                        </option>
                    )}
                </select>
            </div>
            {
                !associatedWithParish &&
                <div className="form-group">
                    <label htmlFor="congregationId">Congregation</label>
                    <select
                        id="congregationId"
                        className="form-control"
                        value={congregationsLoading ? "" : event.congregationId ?? ""}
                        onChange={onCongregationIdChange}
                        required
                    >
                        <option key={0} value="" disabled>{
                            !event.parishId ? 'First select a parish above'
                                : congregationsLoading ? 'Loading...'
                                    : congregations.length === 0 ? '--- no congregations available in the selected parish ---'
                                        : '-- - select a congregation ---'
                        }</option>
                        {congregations.map(congregation =>
                            <option key={congregation.id} value={congregation.id}>
                                {congregation.name}
                            </option>
                        )}
                    </select>
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
                involvesDescription &&
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        className="form-control"
                        type="text"
                        spellCheck={false}
                        autoComplete={autoComplete}
                        value={event.description ?? ""}
                        onChange={onDescriptionChange}
                        maxLength={50}
                        required
                    />
                </div>
            }
            {
                allowMultiInput &&
                <>
                    <input
                        id="multiInput"
                        type="checkbox"
                        checked={multiInput}
                        onChange={() => { setMultiInput(!multiInput) }}
                    />
                    <label htmlFor="multiInput">Create events for multiple people with the same details</label>
                    <p className="field-note">(for example, if many people were confirmed together on the same day)</p>
                </>
            }
            {
                allowMultiInput && multiInput ?
                    <div className="form-group">
                        <label htmlFor="personNames">Person Names</label>
                        <p className="field-note no-bottom-margin">Enter each name on a separate line.</p>
                        <textarea
                            id="personNames"
                            rows={5}
                            className="form-control"
                            spellCheck={false}
                            value={personNames ?? ""}
                            onChange={onPersonNamesChange}
                            autoComplete={autoComplete}
                            required
                        />
                    </div>
                    : involvesFirstPerson &&
                    <div className="form-group">
                        <label htmlFor="firstPersonName">{involvesSecondPerson ? 'First ' : ''} Person Name</label>
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
            }
            {
                involvesSecondPerson &&
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
            <button disabled={!hasBeenChanged || isSaving} className="btn btn-primary" type="submit">
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} event`}
            </button>
        </form>
    );
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