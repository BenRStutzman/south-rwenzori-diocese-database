﻿import { State } from '../../../store';
import React, { ChangeEvent, useEffect } from 'react';
import { randomString } from '../../../helpers/randomString';
import * as Store from '../../../store/parish/home';
import * as SharedStore from '../../../store/shared';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import LoadingSpinner from '../../shared/LoadingSpinner';

const autoComplete = randomString();

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchBox = ({
    searchParishes,
    parameters,
    setSearchName,
    setSearchArchdeaconryId,
    archdeaconries,
    loadArchdeaconries,
    archdeaconriesLoading,
    resetParameters,
    resultsLoading,
}: Props) => {
    const loadData = () => {
        resetParameters();
        loadArchdeaconries();
        searchParishes();
    };

    useEffect(loadData, []);

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value);
    };

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchArchdeaconryId(parseInt(event.target.value));
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        searchParishes(parameters);
    };

    return archdeaconriesLoading ? <LoadingSpinner /> :
        <form onSubmit={onSubmit} className="search-box">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    className="form-control"
                    autoComplete={autoComplete}
                    type="text"
                    spellCheck={false}
                    value={parameters.name ? parameters.name : ""}
                    onChange={onNameChange}
                    maxLength={50}
                />
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
            <button className="btn btn-primary" type="submit">
                {resultsLoading ? <Spinner size="sm" /> : 'Search parishes'}
            </button>
        </form>;
}

export default connect(
    (state: State) => ({ ...state.parish.home, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(SearchBox as any);