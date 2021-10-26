import { Archdeaconry } from "../../store/archdeaconry";
import { AppThunkAction } from '../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { Errors } from "../../apiHelpers";

interface Props {
    archdeaconry: Archdeaconry;
    onSave: () => void;
    updateArchdeaconryName: (name: string) => AppThunkAction<Action>;
    hasBeenChanged: boolean;
    submitWord: string;
    errors: Errors;
}

const Form = (
    {
        archdeaconry,
        onSave,
        updateArchdeaconryName,
        hasBeenChanged,
        errors,
        submitWord,
    }: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateArchdeaconryName(event.target.value);
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave();
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    className="form-control"
                    type="text"
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
            <button disabled={!hasBeenChanged} className="btn btn-primary" type="submit">{submitWord} Archdeaconry</button>
        </form>
    );
}

export default Form;