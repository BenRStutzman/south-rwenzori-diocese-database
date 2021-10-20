import { Archdeaconry } from "../../store/archdeaconries/archdeaconry";
import { AppThunkAction } from '../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';

interface Props {
    archdeaconry: Archdeaconry;
    onSubmit: () => void;
    updateArchdeaconryName: (name: string) => AppThunkAction<Action>;
    hasBeenChanged: boolean;
    hasBeenSaved: boolean;
}

const Form = ({ archdeaconry,
    onSubmit,
    updateArchdeaconryName,
    hasBeenChanged,
    hasBeenSaved }: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateArchdeaconryName(event.target.value);
    }

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit();
    }

    return (
        <form onSubmit={onFormSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" className="form-control" type="text" value={archdeaconry.name} onChange={onNameChange} />
            </div>
            <button className="btn btn-primary" type="submit">Submit</button>
            {
                !hasBeenChanged && hasBeenSaved &&
                <p>Archdeaconry Saved!</p>
            }
        </form>
    );
}

export default Form;