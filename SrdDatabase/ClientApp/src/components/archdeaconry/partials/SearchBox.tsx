import { SearchParameters } from '../../../store/archdeaconry';
import { AppThunkAction } from '../../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { randomString } from '../../../helpers/randomString';

const autoCompleteString = randomString();

interface Props {
    onSearch: () => void;
    parameters: SearchParameters;
    setSearchName: (name: string) => AppThunkAction<Action>;
}

const SearchBox = ({
    onSearch,
    parameters,
    setSearchName,
}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value);
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
            <button className="btn btn-primary" type="submit">
                Search archdeaconries
            </button>
        </form>
    );
}

export default SearchBox;