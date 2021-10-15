import { Archdeaconry } from "../../store/archdeaconries/archdeaconry";
import { AppThunkAction } from '../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';

interface Props {
    archdeaconry: Archdeaconry;
    onSubmit: () => void;
    updateArchdeaconryName: (name: string) => AppThunkAction<Action>;
}

const Form = ({ archdeaconry, onSubmit, updateArchdeaconryName }: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateArchdeaconryName(event.target.value);
    }

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit();
    }

    return (
        <form onSubmit={onFormSubmit}>
            <label>
                Name:
                <input type="text" value={archdeaconry.name} onChange={onNameChange} />
            </label>
            <input type="submit" value="Submit"></input>
        </form>
    );
}

export default Form;