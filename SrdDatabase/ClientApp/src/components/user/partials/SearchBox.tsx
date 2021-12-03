import { State } from '../../../store';
import React, { ChangeEvent, useEffect } from 'react';
import { randomString } from '../../../helpers/randomString';
import * as Store from '../../../store/user/home';
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
    userTypes,
    parameters,
    setSearchName,
    setSearchUsername,
    setSearchUserTypeId,
    searchUsers,
    loadUserTypes,
    userTypesLoading,
    resetParameters,
    resultsLoading,
}: Props) => {
    const loadData = () => {
        resetParameters();
        loadUserTypes();
        searchUsers();
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

    return userTypesLoading ? <LoadingSpinner /> :
        <form onSubmit={onSubmit} className="search-box">
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
            <div className="form-group">
                <label htmlFor="userTypeId">User Type</label>
                <select
                    id="userTypeId"
                    className="form-control"
                    value={parameters.userTypeId ?? ""}
                    onChange={onUserTypeIdChange}
                >
                    <option key={0} value="">--- select a user type ---</option>
                    {userTypes.map(userType =>
                        <option key={userType.id} value={userType.id}>
                            {userType.name}
                        </option>
                    )}
                </select>
            </div>
            <button className="btn btn-primary" type="submit">
                {resultsLoading ? <Spinner size="sm" /> : 'Search users'}
            </button>
        </form>;
}

export default connect(
    (state: State) => ({ ...state.user.home, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(SearchBox as any);