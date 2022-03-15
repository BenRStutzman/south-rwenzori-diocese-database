import React, { ChangeEvent, useEffect } from 'react';
import { convertDateChange, useQueryParams } from '../../../helpers/miscellaneous';
import { State } from '../../../store';
import * as Store from '../../../store/report';
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

const SearchBox = ({
    loadReport,
    parameters,
    setArchdeaconryId,
    setParishId,
    setCongregationId,
    setStartDate,
    setEndDate,
    archdeaconries,
    parishes,
    congregations,
    prefillParameters,
    loadArchdeaconries,
    congregationsLoading,
    parishesLoading,
    archdeaconriesLoading,
    expanded,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        loadArchdeaconries();

        var generateReportString = queryParams.get('generateReport');
        const generateReport = Boolean(generateReportString);

        var congregationIdString = queryParams.get('congregationId');
        const congregationId = congregationIdString ? parseInt(congregationIdString) : undefined;

        var parishIdString = queryParams.get('parishId');
        const parishId = parishIdString ? parseInt(parishIdString) : undefined;

        var archdeaconryIdString = queryParams.get('archdeaconryId');
        const archdeaconryId = archdeaconryIdString ? parseInt(archdeaconryIdString) : undefined;

        const today = new Date();
        const startOfThisYear = new Date(today.getFullYear(), 0);

        prefillParameters(congregationId, parishId, archdeaconryId, startOfThisYear, today, generateReport);
    };

    useEffect(loadData, []);

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setArchdeaconryId(parseInt(event.target.value));
    };

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setParishId(parseInt(event.target.value));
    };

    const onCongregationIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCongregationId(parseInt(event.target.value));
    };

    const onStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStartDate(convertDateChange(event));
    };

    const onEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEndDate(convertDateChange(event));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        loadReport(parameters);
    };

    return (
        <div hidden={!expanded} className="search-box">
            <form onSubmit={onSubmit}>
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
                                    {archdeaconriesLoading ? 'Loading...' : 'All archdeaconries'}
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
                                    {parishesLoading ? 'Loading...' : 'All parishes'}
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
                                    {congregationsLoading ? 'Loading...' : 'All congregations'}
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
                    onClear={() => { prefillParameters(); }}
                    altSearchText="Generate report"
                    altClearText="Clear parameters"
                />
            </form>
        </div>
    );
}

export default connect(
    (state: State, ownProps: OwnProps) => ({
        ...state.report,
        ...state.shared,
        ...ownProps,
    }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchBox);