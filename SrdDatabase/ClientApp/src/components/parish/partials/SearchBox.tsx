import { State } from '../../../store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { randomString, useQueryParams } from '../../../helpers/miscellaneous';
import * as Store from '../../../store/parish/home';
import * as SharedStore from '../../../store/shared';
import { connect } from 'react-redux';
import ExpandButton from '../../shared/ExpandButton';
import SearchButtons from '../../shared/SearchButtons';
import { bindActionCreators } from 'redux';

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
    setParameters,
    resultsLoading,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        loadArchdeaconries();

        const archdeaconryIdString = queryParams.get('archdeaconryId');
        const archdeaconryId = archdeaconryIdString ? parseInt(archdeaconryIdString) : undefined;

        setParameters(archdeaconryId, true);
    };

    useEffect(loadData, []);

    const [expanded, setExpanded] = useState(false);

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

    return <>
        <ExpandButton expanded={expanded} setExpanded={setExpanded} />
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
                </div>
                <SearchButtons
                    searching={resultsLoading}
                    thingsBeingSearched="parishes"
                    onClear={setParameters}
                />
            </form>
        </div>
    </>;
};

export default connect(
    (state: State) => ({ ...state.parish.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchBox);