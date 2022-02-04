import { State } from '../../../store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { randomString } from '../../../helpers/miscellaneous';
import * as Store from '../../../store/archdeaconry/home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchButtons from '../../shared/SearchButtons';

type OwnProps = {
    expanded: boolean;
};

type Props =
    OwnProps &
    Store.State &
    typeof Store.actionCreators;

const autoCompleteString = randomString();

const SearchBox = ({
    searchArchdeaconries,
    parameters,
    setSearchName,
    prefillParameters,
    resultsLoading,
    expanded,
}: Props) => {
    const loadData = () => {
        prefillParameters(true);
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
                    onClear={prefillParameters}
                    searching={resultsLoading}
                />
            </form>
        </div>
    );
}

export default connect(
    (state: State, ownProps: OwnProps) => ({ ...state.archdeaconry.home, ...ownProps }),
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch),
)(SearchBox);