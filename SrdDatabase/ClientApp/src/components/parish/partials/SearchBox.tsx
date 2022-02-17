import { State } from '../../../store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { randomString, useQueryParams } from '../../../helpers/miscellaneous';
import * as Store from '../../../store/parish/home';
import * as SharedStore from '../../../store/shared';
import { connect } from 'react-redux';
import SearchButtons from '../../shared/SearchButtons';
import { bindActionCreators } from 'redux';

const autoComplete = randomString();

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
    searchParishes,
    parameters,
    setSearchName,
    setSearchArchdeaconryId,
    archdeaconries,
    loadArchdeaconries,
    archdeaconriesLoading,
    prefillParameters,
    resultsLoading,
    expanded,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        loadArchdeaconries();

        const archdeaconryIdString = queryParams.get('archdeaconryId');
        const archdeaconryId = archdeaconryIdString ? parseInt(archdeaconryIdString) : undefined;

        prefillParameters(archdeaconryId, true);
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

    return (
        <div hidden={!expanded} className="search-box">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                className="form-control"
                                autoComplete={autoComplete}
                                type="text"
                                spellCheck={false}
                                value={parameters.name ?? ""}
                                onChange={onNameChange}
                                maxLength={50}
                            />
                        </div>
                    </div>
                    <div className="col-6">
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
                </div>
                <SearchButtons
                    thingsBeingSearched="parishes"
                    onClear={() => { prefillParameters(); }}
                />
            </form>
        </div>
    );
};

export default connect(
    (state: State, ownProps: OwnProps) => ({
        ...state.parish.home,
        ...state.shared,
        ...ownProps,
    }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchBox);