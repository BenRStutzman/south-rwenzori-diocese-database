import React, { ChangeEvent, useEffect, useState } from 'react';
import { State } from '../../../store';
import * as Store from '../../../store/charge/home';
import * as SharedStore from '../../../store/shared';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { connect } from 'react-redux';
import SearchButtons from '../../shared/SearchButtons';
import ExpandButton from '../../shared/ExpandButton';
import { bindActionCreators } from 'redux';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchBox = ({
    searchCharges,
    parameters,
    setSearchArchdeaconryId,
    setSearchParishId,
    setSearchCongregationId,
    setSearchStartYear,
    setSearchEndYear,
    archdeaconries,
    parishes,
    congregations,
    setParameters,
    loadArchdeaconries,
    congregationsLoading,
    resultsLoading,
    archdeaconriesLoading,
    parishesLoading,
}: Props) => {
    const loadData = () => {
        loadArchdeaconries();
        setParameters();
        searchCharges();
    };

    useEffect(loadData, []);

    const [expanded, setExpanded] = useState(false);

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchArchdeaconryId(parseInt(event.target.value));
    };

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParishId(parseInt(event.target.value));
    };

    const onCongregationIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchCongregationId(parseInt(event.target.value));
    };

    const onStartYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchStartYear(parseInt(event.target.value));
    };

    const onEndYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchEndYear(parseInt(event.target.value));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        searchCharges(parameters);
    };

    const currentYear = (new Date()).getFullYear();

    const startYears = [];
    const endYears = [];

    for (let year = 2000; year <= currentYear + 10; year++) {
        startYears.push(year);
    }

    for (let year = parameters.startYear ?? 2000; year <= currentYear + 100; year++) {
        endYears.push(year);
    }

    return <>
        <ExpandButton expanded={expanded} setExpanded={setExpanded} />
        <div hidden={!expanded} className="search-box">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="archdeaconryId">Archdeaconry</label>
                            <select
                                id="archdeaconryId"
                                className="form-control"
                                value={parameters.archdeaconryId ?? ""}
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
                                value={parameters.parishId ?? ""}
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
                                value={parameters.congregationId ?? ""}
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
                            <div className="form-group">
                                <label htmlFor="startYear">Start Year</label>
                                <select
                                    id="startYear"
                                    className="form-control"
                                    value={parameters.startYear ?? ""}
                                    onChange={onStartYearChange}
                                >
                                    <option key={0} value=""></option>
                                    {
                                        startYears.map(year =>
                                            <option key={year} value={year}>{year}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="endYear">End Year</label>
                            <select
                                id="endYear"
                                className="form-control"
                                value={parameters.endYear ?? ""}
                                onChange={onEndYearChange}
                            >
                                <option key={0} value=""></option>
                                {
                                    endYears.map(year =>
                                        <option key={year} value={year}>{year}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <SearchButtons
                    searching={resultsLoading}
                    onClear={setParameters}
                    thingsBeingSearched="charges"
                />
            </form>
        </div>
    </>;
}

export default connect(
    (state: State) => ({ ...state.charge.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchBox);