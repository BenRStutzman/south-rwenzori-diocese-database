import { Archdeaconry } from "../../store/archdeaconries/archdeaconry";
import { AppThunkAction } from '../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { Errors } from "../../sharedResponses";

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
                        value={archdeaconry.name}
                        onChange={onNameChange} />
                </div>
                {Object.values(errors).length > 0 &&
                    <ul>
                    {Object.values(errors).map((errorList: string[]) =>
                        <li>{errorList.join(" ")}</li>
                    )}
                    </ul>
                }
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
            {
                    !hasBeenChanged && hasBeenSaved &&
                    <p>Archdeaconry Saved!</p>
            }
        </>
    );
}

export default Form;