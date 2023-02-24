import { State } from '../../../store';
import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';
import * as Store from '../../../store/census/save';
import * as SharedStore from '../../../store/shared';
import { RouteComponentProps, withRouter } from 'react-router';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { convertDateChange, formattedDate, randomString } from '../../../helpers/miscellaneous';

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
    setMales0To12,
    setMales13To17,
    setMales18To35,
    setMales36AndAbove,
    setFemales0To12,
    setFemales13To17,
    setFemales18To35,
    setFemales36AndAbove,
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
    const loadData = () => {
        loadArchdeaconries();
    };

    useEffect(loadData, []);

    const onMales0To12Change = (event: ChangeEvent<HTMLInputElement>) => {
        setMales0To12(parseInt(event.target.value));
    };

    const onMales13To17Change = (event: ChangeEvent<HTMLInputElement>) => {
        setMales13To17(parseInt(event.target.value));
    };

    const onMales18To35Change = (event: ChangeEvent<HTMLInputElement>) => {
        setMales18To35(parseInt(event.target.value));
    };

    const onMales36AndAboveChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMales36AndAbove(parseInt(event.target.value));
    };

    const onFemales0To12Change = (event: ChangeEvent<HTMLInputElement>) => {
        setFemales0To12(parseInt(event.target.value));
    };

    const onFemales13To17Change = (event: ChangeEvent<HTMLInputElement>) => {
        setFemales13To17(parseInt(event.target.value));
    };

    const onFemales18To35Change = (event: ChangeEvent<HTMLInputElement>) => {
        setFemales18To35(parseInt(event.target.value));
    };

    const onFemales36AndAboveChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFemales36AndAbove(parseInt(event.target.value));
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
        setDate(convertDateChange(event));
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
                                    : '--- select a congregation ---'
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
                    value={formattedDate(census.date)}
                    onChange={onDateChange}
                    required
                />
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="males0To12">Males 0-12</label>
                        <input
                            id="males0To12"
                            className="form-control"
                            type="number"
                            value={census.males0To12?.toString() ?? ""}
                            onChange={onMales0To12Change}
                            autoComplete={autoComplete}
                            min={1}
                            required
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="females0To12">Females 0-12</label>
                        <input
                            id="females0To12"
                            className="form-control"
                            type="number"
                            value={census.females0To12?.toString() ?? ""}
                            onChange={onFemales0To12Change}
                            autoComplete={autoComplete}
                            min={1}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="males13To17">Males 13-17</label>
                        <input
                            id="males13To17"
                            className="form-control"
                            type="number"
                            value={census.males13To17?.toString() ?? ""}
                            onChange={onMales13To17Change}
                            autoComplete={autoComplete}
                            min={1}
                            required
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="females13To17">Females 13-17</label>
                        <input
                            id="females13To17"
                            className="form-control"
                            type="number"
                            value={census.females13To17?.toString() ?? ""}
                            onChange={onFemales13To17Change}
                            autoComplete={autoComplete}
                            min={1}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">

                    <div className="form-group">
                        <label htmlFor="males0To12">Males 18-35</label>
                        <input
                            id="males18To35"
                            className="form-control"
                            type="number"
                            value={census.males18To35?.toString() ?? ""}
                            onChange={onMales18To35Change}
                            autoComplete={autoComplete}
                            min={1}
                            required
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="females0To12">Females 18-35</label>
                        <input
                            id="females18To35"
                            className="form-control"
                            type="number"
                            value={census.females18To35?.toString() ?? ""}
                            onChange={onFemales18To35Change}
                            autoComplete={autoComplete}
                            min={1}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="males36AndAbove">Males 36+</label>
                        <input
                            id="males36AndAbove"
                            className="form-control"
                            type="number"
                            value={census.males36AndAbove?.toString() ?? ""}
                            onChange={onMales36AndAboveChange}
                            autoComplete={autoComplete}
                            min={1}
                            required
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="females36AndAbove">Females 36+</label>
                        <input
                            id="females36AndAbove"
                            className="form-control"
                            type="number"
                            value={census.females36AndAbove?.toString() ?? ""}
                            onChange={onFemales36AndAboveChange}
                            autoComplete={autoComplete}
                            min={1}
                            required
                        />
                    </div>
                </div>
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