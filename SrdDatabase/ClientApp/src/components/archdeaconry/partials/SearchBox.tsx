import { State } from '../../../store';
import React, { ChangeEvent, useEffect } from 'react';
import { randomString } from '../../../helpers/randomString';
import * as Store from '../../../store/archdeaconry/home';
import { connect } from 'react-redux';

type Props =
    Store.State &
    typeof Store.actionCreators;

const autoCompleteString = randomString();

const SearchBox = ({
    searchArchdeaconries,
    parameters,
    setSearchName,
    resetParameters,
}: Props) => {
    const loadData = () => {
        resetParameters();
        searchArchdeaconries();
    };

    useEffect(loadData, []);

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value);
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        searchArchdeaconries(parameters);
    };

    return (
        <form onSubmit={onSubmit} className="search-box">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    className="form-control"
                    autoComplete={autoCompleteString}
                    type="text"
                    spellCheck={false}
                    value={parameters.name ? parameters.name : ""}
                    onChange={onNameChange}
                    maxLength={50}
                />
            </div>
            <button className="btn btn-primary" type="submit">
                Search archdeaconries
            </button>
        </form>
    );
}

export default connect(
    (state: State) => state.archdeaconry.home,
    Store.actionCreators
)(SearchBox as any);