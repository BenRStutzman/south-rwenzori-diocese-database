﻿import { Archdeaconry } from "../../store/archdeaconry";
import { AppThunkAction } from '../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { Errors } from "../../apiHelpers";

interface Props {
    archdeaconry: Archdeaconry;
    onSubmit: () => void;
    updateArchdeaconryName: (name: string) => AppThunkAction<Action>;
    hasBeenChanged: boolean;
    hasBeenSaved: boolean;
    errors: Errors;
}

const Form = ({ archdeaconry,
    onSubmit,
    updateArchdeaconryName,
    hasBeenChanged,
    hasBeenSaved,
    errors}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateArchdeaconryName(event.target.value);
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
                            key={`${fieldName}-errors`}>
                            {errorList.join(" ")}</li>
                        )}
                    </ul>
                }
                <button disabled={!hasBeenChanged} className="btn btn-primary" type="submit">Submit</button>
            </form>
            {
                    !hasBeenChanged && hasBeenSaved &&
                    <p className="save-alert">Archdeaconry Saved!</p>
            }
        </>
    );
}

export default Form;