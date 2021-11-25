import { SearchParameters } from '../../../store/parish/home';
import { AppThunkAction } from '../../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { randomString } from '../../../helpers/randomString';
import { Archdeaconry } from '../../../store/archdeaconry';

const autoCompleteString = randomString();

interface Props {
    onSearch: () => void;
    parameters: SearchParameters;
    updateName: (name: string) => AppThunkAction<Action>;
    updateArchdeaconryId: (archdeaconryId: number) => AppThunkAction<Action>;
    archdeaconries: Archdeaconry[];
}

const SearchBox = ({
    onSearch,
    parameters,
    updateName,
    updateArchdeaconryId,
    archdeaconries,
}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateName(event.target.value);
    };

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateArchdeaconryId(parseInt(event.target.value));
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
                    <label htmlFor="archdeaconryId">Archdeaconry</label>
                    <select
                        id="archdeaconryId"
                        className="form-control"
                        value={parameters.archdeaconryId ? parameters.archdeaconryId : ""}
                        onChange={onArchdeaconryIdChange}
                    >
                        <option key={0} value="">--- select an archdeaconry ---</option>
                        {archdeaconries.map(archdeaconry =>
                            <option key={archdeaconry.id} value={archdeaconry.id}>
                                {archdeaconry.name}
                            </option>
                        )}
                    </select>
                </div>
            </div>
            <button className="btn btn-primary" type="submit">
                Search parishes
            </button>
        </form>
    );
}

export default SearchBox;