import { State } from '../../../store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { randomString } from '../../../helpers/miscellaneous';
import * as Store from '../../../store/archdeaconry/home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExpandButton from '../../shared/ExpandButton';
import SearchButtons from '../../shared/SearchButtons';

type Props =
    Store.State &
    typeof Store.actionCreators;

const autoCompleteString = randomString();

const SearchBox = ({
    searchArchdeaconries,
    parameters,
    setSearchName,
    setParameters,
    resultsLoading,
}: Props) => {
    const loadData = () => {
        setParameters();
        searchArchdeaconries();
    };

    useEffect(loadData, []);

    const [expanded, setExpanded] = useState(false);

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value);
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        searchArchdeaconries(parameters);
    };

    return (
        <>
            <ExpandButton expanded={expanded} setExpanded={setExpanded} />
            <div hidden={!expanded} className="search-box">
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
                    <SearchButtons
                        thingsBeingSearched="archdeaconries"
                        onClear={setParameters}
                        searching={resultsLoading}
                    />
                </form>
            </div>
        </>
    );
}

export default connect(
    (state: State) => state.archdeaconry.home,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch),
)(SearchBox);