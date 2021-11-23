import { SearchParameters } from "../../store/archdeaconry";
import { AppThunkAction } from '../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';

interface Props {
    onSearch: () => void;
    parameters: SearchParameters;
    updateName: (name: string) => AppThunkAction<Action>;
}

const Search = ({
    onSearch,
    parameters,
    updateName,
}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateName(event.target.value);
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch();
    };

    return (
        <form autoComplete="123123" onSubmit={onSubmit} className="search-box">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    className="form-control"
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

export default Search;