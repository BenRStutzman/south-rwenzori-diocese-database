import { State } from '../../../store';
import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';
import * as Store from '../../../store/census/save';
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
    census,
    archdeaconries,
    parishes,
    congregations,
    saveCensus,
    setNumberOfChristians,
    setCongregationId,
    setArchdeaconryId,
    setParishId,
    loadArchdeaconries,
    setDate,
    hasBeenChanged,
    errors,
    isNew,
    history,
    isSaving,
    congregationsLoading,
    archdeaconriesLoading,
    parishesLoading,
}: Props) => {
    const [multiInput, setMultiInput] = React.useState(false);
    const [personNames, setPersonNames] = React.useState('');

    const loadData = () => {
        loadArchdeaconries();
    };

    useEffect(loadData, []);

    const onNumberOfChristiansChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNumberOfChristians(parseInt(event.target.value));
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

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(new Date(event.target.value));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        saveCensus(census, history);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="archdeaconryId">Archdeaconry</label>
                <select
                    id="archdeaconryId"
                    className="form-control"
                    value={archdeaconriesLoading ? "" : census.archdeaconryId ?? ""}
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
                    value={parishesLoading ? "" : census.parishId ?? ""}
                    onChange={onParishIdChange}
                    required
                >
                    <option key={0} value="" disabled>{
                        !census.archdeaconryId ? 'First select an archdeaconry above'
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
                <div className="form-group">
                    <label htmlFor="congregationId">Congregation</label>
                    <select
                        id="congregationId"
                        className="form-control"
                        value={congregationsLoading ? "" : census.congregationId ?? ""}
                        onChange={onCongregationIdChange}
                        required
                    >
                        <option key={0} value="" disabled>{
                            !census.parishId ? 'First select a parish above'
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
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    className="form-control"
                    type="date"
                    value={census.date ? new Date(census.date).toLocaleDateString('en-ca') : ''}
                    onChange={onDateChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="numberOfChristians">Christians</label>
                <input
                    id="numberOfChristians"
                    className="form-control"
                    type="number"
                    value={census.numberOfChristians?.toString() ?? ""}
                    onChange={onNumberOfChristiansChange}
                    autoComplete={autoComplete}
                    min={1}
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
            <button disabled={!hasBeenChanged || isSaving} className="btn btn-primary" type="submit">
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} census`}
            </button>
        </form>
    );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    ...state.census.save,
    ...state.shared,
    ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...Store.actionCreators,
    ...SharedStore.actionCreators,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm));