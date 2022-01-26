import { State } from '../../../store';
import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';
import * as Store from '../../../store/charge/save';
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
    charge,
    archdeaconries,
    parishes,
    congregations,
    saveCharge,
    setArchdeaconryId,
    setParishId,
    setCongregationId,
    setAmountPerYear,
    loadArchdeaconries,
    setStartYear,
    setEndYear,
    hasBeenChanged,
    errors,
    isNew,
    history,
    isSaving,
    archdeaconriesLoading,
    parishesLoading,
    congregationsLoading,
}: Props) => {
    const loadData = () => {
        loadArchdeaconries();
    };

    useEffect(loadData, []);

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setArchdeaconryId(parseInt(event.target.value));
    }

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setParishId(parseInt(event.target.value));
    }

    const onCongregationIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCongregationId(parseInt(event.target.value));
    };

    const onAmountPerYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmountPerYear(parseInt(event.target.value));
    };

    const onStartYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStartYear(parseInt(event.target.value));
    };

    const onEndYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEndYear(parseInt(event.target.value));
    };

    const onSubmit = (formCharge: React.FormEvent) => {
        formCharge.preventDefault();
        saveCharge(charge, history);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="archdeaconryId">Archdeaconry</label>
                <select
                    id="archdeaconryId"
                    className="form-control"
                    value={archdeaconriesLoading ? "" : charge.archdeaconryId ?? ""}
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
                    value={parishesLoading ? "" : charge.parishId ?? ""}
                    onChange={onParishIdChange}
                    required
                >
                    <option key={0} value="" disabled>{
                        !charge.archdeaconryId ? 'First select an archdeaconry above'
                            : parishesLoading ? 'Loading...'
                                : parishes.length === 0 ? 'No parishes available in the selected archdeaconry'
                                    : '--- select a parish ---'}</option>
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
                    value={congregationsLoading ? "" : charge.congregationId ?? ""}
                    onChange={onCongregationIdChange}
                    required
                >
                    <option key={0} value="" disabled>{
                        !charge.parishId ? 'First select a parish above'
                            : congregationsLoading ? 'Loading...'
                                : congregations.length === 0 ? 'No congregations available in the selected parish'
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
                <label htmlFor="amountPerYear">Amount Per Year (UGX)</label>
                <input
                    id="amountPerYear"
                    className="form-control"
                    type="number"
                    value={charge.amountPerYear ?? ""}
                    onChange={onAmountPerYearChange}
                    autoComplete={autoComplete}
                    min={1}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="startYear">Start Year</label>
                <input
                    id="startYear"
                    className="form-control"
                    type="number"
                    value={charge.startYear ?? ""}
                    onChange={onStartYearChange}
                    autoComplete={autoComplete}
                    min={1}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="endYear">End Year</label>
                <input
                    id="endYear"
                    className="form-control"
                    type="number"
                    value={charge.endYear ?? ""}
                    onChange={onEndYearChange}
                    autoComplete={autoComplete}
                    min={1}
                />
                <p className="field-note">Leave this field blank to make the charge ongoing.</p>
            </div>
            {
                Object.values(errors).length > 0 &&
                <ul>
                    {Object.entries(errors).map(([fieldName, errorList]: [string, string[]]) =>
                        <li
                            className="error-alert"
                            key={fieldName}>
                            {errorList.join(" ")}
                        </li>
                    )}
                </ul>
            }
            <button disabled={!hasBeenChanged} className="btn btn-primary" type="submit">
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} charge`}
            </button>
        </form>
    );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    ...state.charge.save,
    ...state.shared,
    ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...Store.actionCreators,
    ...SharedStore.actionCreators,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm));