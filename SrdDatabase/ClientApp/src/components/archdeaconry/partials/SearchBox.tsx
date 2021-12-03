import { State } from '../../../store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { randomString } from '../../../helpers/randomString';
import * as Store from '../../../store/archdeaconry/home';
import { connect } from 'react-redux';
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
    resetParameters,
    resultsLoading,
}: Props) => {
    const loadData = () => {
        resetParameters();
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
            <form hidden={!expanded} onSubmit={onSubmit} className="search-box">
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
                    onClear={() => { resetParameters(); }}
                    searching={resultsLoading}
                />
            </form>
        </>
    );
}

export default connect(
    (state: State) => state.archdeaconry.home,
    Store.actionCreators
)(SearchBox as any);