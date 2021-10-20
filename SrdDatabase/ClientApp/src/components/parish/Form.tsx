import { Parish } from "../../store/parish";
import { AppThunkAction } from '../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { Errors } from "../../apiHelpers";
import { Archdeaconry } from "../../store/archdeaconry";

interface Props {
    parish: Parish;
    onSubmit: () => void;
    updateParishName: (name: string) => AppThunkAction<Action>;
    updateParishArchdeaconryId: (archdeaconryId: number) => AppThunkAction<Action>;
    hasBeenChanged: boolean;
    hasBeenSaved: boolean;
    errors: Errors;
    archdeaconries: Archdeaconry[];
}

const Form = ({ parish,
    archdeaconries,
    onSubmit,
    updateParishName,
    updateParishArchdeaconryId,
    hasBeenChanged,
    hasBeenSaved,
    errors}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateParishName(event.target.value);
    }

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateParishArchdeaconryId(parseInt(event.target.value));
    }

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit();
    }

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        className="form-control"
                        type="text"
                        value={parish.name ? parish.name : ""}
                        onChange={onNameChange}
                        maxLength={50}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="archdeaconryId">Archdeaconry</label>
                    <select
                        id="archdeaconryId"
                        className="form-control"
                        value={parish.archdeaconryId}
                        onChange={onArchdeaconryIdChange}
                    >
                        {archdeaconries.map(archdeaconry =>
                            <option key={archdeaconry.id} value={archdeaconry.id}>
                                {archdeaconry.name}
                            </option>
                        )}
                    </select>
                </div>
                {Object.values(errors).length > 0 &&
                    <ul>
                    {Object.entries(errors).map(([fieldName, errorList]: [string, string[]]) =>
                        <li
                            className="error-alert"
                            key={`${fieldName}-errors`}>
                            {errorList.join(" ")}</li>
                        )}
                    </ul>
                }
                <button disabled={!hasBeenChanged} className="btn btn-primary" type="submit">Submit</button>
            </form>
            {
                    !hasBeenChanged && hasBeenSaved &&
                    <p className="save-alert">Parish Saved!</p>
            }
        </>
    );
}

export default Form;