import { State } from '../../../store';
import * as Store from '../../../store/congregation/home';
import * as SharedStore from '../../../store/shared';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ExpandButton from '../../shared/ExpandButton';
import SearchButtons from '../../shared/SearchButtons';
import { bindActionCreators } from 'redux';
import { randomString } from '../../../helpers/miscellaneous';

const autoCompleteString = randomString();

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchBox = ({
    resetParameters,
    archdeaconriesLoading,
    parishesLoading,
    loadArchdeaconries,
    loadParishes,
    searchCongregations,
    parameters,
    setSearchName,
    setSearchArchdeaconryId,
    setSearchParishId,
    archdeaconries,
    parishes,
    resultsLoading,
}: Props) => {
    const loadData = () => {
        resetParameters();
        loadArchdeaconries();
        loadParishes();
        searchCongregations();
    }

    useEffect(loadData, []);

    const [expanded, setExpanded] = useState(false);

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value);
    };

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchArchdeaconryId(parseInt(event.target.value));
    };

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParishId(parseInt(event.target.value));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        searchCongregations(parameters);
    };

    return <>
        <ExpandButton expanded={expanded} setExpanded={setExpanded} />
        <div hidden={!expanded} className="search-box">
            {
                archdeaconriesLoading || parishesLoading ? <LoadingSpinner /> :
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                className="form-control"
                                autoComplete={autoCompleteString}
                                type="text"
                                spellCheck={false}
                                value={parameters.name ?? ""}
                                onChange={onNameChange}
                                maxLength={50}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="parishId">Parish</label>
                                    <select
                                        id="parishId"
                                        className="form-control"
                                        value={parameters.parishId ?? ""}
                                        onChange={onParishIdChange}
                                    >
                                        <option key={0} value="">Any parish</option>
                                        {parishes.map(parish =>
                                            <option key={parish.id} value={parish.id}>
                                                {parish.name}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="archdeaconryId">Archdeaconry</label>
                                    <select
                                        id="archdeaconryId"
                                        className="form-control"
                                        value={parameters.archdeaconryId ? parameters.archdeaconryId : ""}
                                        onChange={onArchdeaconryIdChange}
                                    >
                                        <option key={0} value="">Any archdeaconry</option>
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
                            thingsBeingSearched="congregations"
                            searching={resultsLoading}
                            onClear={resetParameters}
                        />
                    </form>
            }
        </div>
    </>;
}

export default connect(
    (state: State) => ({ ...state.congregation.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchBox);