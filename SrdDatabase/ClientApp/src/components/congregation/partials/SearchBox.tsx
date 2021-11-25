import { SearchParameters } from "../../../store/congregation/home";
import { AppThunkAction } from '../../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { randomString } from "../../../helpers/randomString";
import { Parish } from "../../../store/parish/shared";

const autoCompleteString = randomString();

interface Props {
    onSearch: () => void;
    parameters: SearchParameters;
    updateName: (name: string) => AppThunkAction<Action>;
    updateParishId: (parishId: number) => AppThunkAction<Action>;
    archdeaconries: Parish[];
}

const SearchBox = ({
    onSearch,
    parameters,
    updateName,
    updateParishId,
    archdeaconries,
}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateName(event.target.value);
    };

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateParishId(parseInt(event.target.value));
    }

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
                <div className="form-group">
                    <label htmlFor="parishId">Parish</label>
                    <select
                        id="parishId"
                        className="form-control"
                        value={parameters.parishId ? parameters.parishId : ""}
                        onChange={onParishIdChange}
                    >
                        <option key={0} value="">--- select an parish ---</option>
                        {archdeaconries.map(parish =>
                            <option key={parish.id} value={parish.id}>
                                {parish.name}
                            </option>
                        )}
                    </select>
                </div>
            </div>
            <button className="btn btn-primary" type="submit">
                Search congregations
            </button>
        </form>
    );
}

export default SearchBox;