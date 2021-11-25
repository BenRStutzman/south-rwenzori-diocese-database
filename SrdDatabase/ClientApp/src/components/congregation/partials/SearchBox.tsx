import { SearchParameters } from '../../../store/congregation/home';
import { AppThunkAction } from '../../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { randomString } from '../../../helpers/randomString';
import { Parish } from '../../../store/parish';
import { Archdeaconry } from '../../../store/archdeaconry';

const autoCompleteString = randomString();

interface Props {
    parameters: SearchParameters;
    archdeaconries: Archdeaconry[];
    parishes: Parish[];
    updateName: (name: string) => AppThunkAction<Action>;
    updateArchdeaconryId: (archdeaconryId: number) => AppThunkAction<Action>;
    updateParishId: (parishId: number) => AppThunkAction<Action>;
    onSearch: () => void;
}

const SearchBox = ({
    onSearch,
    parameters,
    updateName,
    updateArchdeaconryId,
    updateParishId,
    archdeaconries,
    parishes,
}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateName(event.target.value);
    };

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateArchdeaconryId(parseInt(event.target.value));
    };

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateParishId(parseInt(event.target.value));
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
                <label htmlFor="parishId">Parish</label>
                <select
                    id="parishId"
                    className="form-control"
                    value={parameters.parishId ? parameters.parishId : ""}
                    onChange={onParishIdChange}
                >
                    <option key={0} value="">--- select a parish ---</option>
                    {parishes.map(parish =>
                        <option key={parish.id} value={parish.id}>
                            {parish.name}
                        </option>
                    )}
                </select>
            </div>
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
            <button className="btn btn-primary" type="submit">
                Search congregations
            </button>
        </form>
    );
}

export default SearchBox;