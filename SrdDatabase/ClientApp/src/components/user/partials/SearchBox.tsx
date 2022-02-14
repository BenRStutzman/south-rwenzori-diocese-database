import { State } from '../../../store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { randomString } from '../../../helpers/miscellaneous';
import * as Store from '../../../store/user/home';
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
    userTypes,
    parameters,
    setSearchName,
    setSearchUsername,
    setSearchUserTypeId,
    searchUsers,
    loadUserTypes,
    userTypesLoading,
    prefillParameters,
    resultsLoading,
    expanded,
}: Props) => {
    const loadData = () => {
        loadUserTypes();
        prefillParameters(true);
    };

    useEffect(loadData, []);

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value);
    };

    const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchUsername(event.target.value);
    };

    const onUserTypeIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchUserTypeId(parseInt(event.target.value));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        searchUsers(parameters);
    };

    return (
        <div hidden={!expanded} className="search-box">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="userTypeId">User Type</label>
                    <select
                        id="userTypeId"
                        className="form-control"
                        value={userTypesLoading ? "" : parameters.userTypeId ?? ""}
                        onChange={onUserTypeIdChange}
                    >
                        <option key={0} value="">
                            {userTypesLoading ? 'Loading...' : 'Any user type'}
                        </option>
                        {userTypes.map(userType =>
                            <option key={userType.id} value={userType.id}>
                                {userType.name}
                            </option>
                        )}
                    </select>
                </div>
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
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                className="form-control"
                                autoComplete={autoComplete}
                                type="text"
                                spellCheck={false}
                                value={parameters.username ?? ""}
                                onChange={onUsernameChange}
                                maxLength={50}
                            />
                        </div>
                    </div>
                </div>
                <SearchButtons
                    searching={resultsLoading}
                    thingsBeingSearched="users"
                    onClear={() => { prefillParameters(); }}
                />
            </form>
        </div>
    );
};

export default connect(
    (state: State, ownProps: OwnProps) => ({
        ...state.user.home,
        ...state.shared,
        ...ownProps,
    }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchBox);