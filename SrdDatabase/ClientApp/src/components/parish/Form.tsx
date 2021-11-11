import { Parish } from "../../store/parish";
import { AppThunkAction } from '../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { Errors } from "../../helpers/apiHelpers";
import { Archdeaconry } from "../../store/archdeaconry";

interface Props {
    parish: Parish;
    onSave: () => void;
    onDelete?: () => void;
    updateParishName: (name: string) => AppThunkAction<Action>;
    updateParishArchdeaconryId: (archdeaconryId: number) => AppThunkAction<Action>;
    hasBeenChanged: boolean;
    errors: Errors;
    archdeaconries: Archdeaconry[];
    parishExists: boolean;
}

const Form = ({
    parish,
    archdeaconries,
    onSave,
    onDelete,
    updateParishName,
    updateParishArchdeaconryId,
    hasBeenChanged,
    errors,
    parishExists,
}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateParishName(event.target.value);
    };

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateParishArchdeaconryId(parseInt(event.target.value));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave();
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    className="form-control"
                    type="text"
                    spellCheck={false}
                    value={parish.name ? parish.name : ""}
                    onChange={onNameChange}
                    maxLength={50}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="archdeaconryId">Archdeaconry</label>
                <select
                    id="archdeaconryId"
                    className="form-control"
                    value={parish.archdeaconryId ? parish.archdeaconryId : ""}
                    onChange={onArchdeaconryIdChange}
                    required
                >
                    <option key={0} value="" disabled>--- select an archdeaconry ---</option>
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
                        key={fieldName}>
                        {errorList.join(" ")}</li>
                    )}
                </ul>
            }
            <button disabled={!hasBeenChanged} className="btn btn-primary" type="submit">
                {parishExists ? 'Update' : 'Create'} parish
            </button>
            {
                parishExists &&
                <button className="btn btn-danger float-right" type="button" onClick={onDelete}>
                    Delete parish
                </button>
            }
        </form>
    );
}

export default Form;