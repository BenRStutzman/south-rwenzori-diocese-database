import { Archdeaconry } from "../../store/archdeaconry";
import { AppThunkAction } from '../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { Errors } from "../../helpers/apiHelpers";

interface Props {
    archdeaconry: Archdeaconry;
    onSave: () => void;
    onDelete?: () => void;
    updateArchdeaconryName: (name: string) => AppThunkAction<Action>;
    hasBeenChanged: boolean;
    archdeaconryExists: boolean;
    errors: Errors;
}

const Form = ({
    archdeaconry,
    onSave,
    updateArchdeaconryName,
    hasBeenChanged,
    errors,
    archdeaconryExists,
    onDelete
}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateArchdeaconryName(event.target.value);
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
                    value={archdeaconry.name ? archdeaconry.name : ""}
                    onChange={onNameChange}
                    required
                    maxLength={50}
                />
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
                {archdeaconryExists ? "Update" : "Create"} archdeaconry
            </button>
            {
                archdeaconryExists &&
                <button className='btn btn-danger float-right' type="button" onClick={onDelete}>
                    Delete archdeaconry
                </button>
            }
        </form>
    );
}

export default Form;