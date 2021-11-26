import { SearchParameters } from '../../../store/user/home';
import { AppThunkAction } from '../../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { randomString } from '../../../helpers/randomString';
import { UserType } from '../../../store/user';

const autoCompleteString = randomString();

interface Props {
    parameters: SearchParameters;
    userTypes: UserType[];
    setSearchName: (name: string) => AppThunkAction<Action>;
    setSearchUsername: (username: string) => AppThunkAction<Action>;
    setSearchUserTypeId: (userTypeId: number) => AppThunkAction<Action>;
    onSearch: () => void;
}

const SearchBox = ({
    userTypes,
    parameters,
    setSearchName,
    setSearchUsername,
    setSearchUserTypeId,
    onSearch,
}: Props) => {
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
        onSearch();
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
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    className="form-control"
                    autoComplete={autoCompleteString}
                    type="text"
                    spellCheck={false}
                    value={parameters.username ? parameters.username : ""}
                    onChange={onUsernameChange}
                    maxLength={50}
                />
            </div>
            <div className="form-group">
                <label htmlFor="userTypeId">User Type</label>
                <select
                    id="userTypeId"
                    className="form-control"
                    value={parameters.userTypeId ? parameters.userTypeId : ""}
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
                Search users
            </button>
        </form>
    );
}

export default SearchBox;