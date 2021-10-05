import { Archdeaconry } from "../../store/archdeaconries/Archdeaconry";
import { AppThunkAction } from '../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';

interface Props {
    archdeaconry: Archdeaconry;
    saveArchdeaconry: (archdeaconry: Archdeaconry) => AppThunkAction<Action>;
    updateArchdeaconryName: (name: string) => AppThunkAction<Action>;
}

const Form = ({ archdeaconry, saveArchdeaconry, updateArchdeaconryName }: Props) => {
    const onSubmit = () => {
        saveArchdeaconry(archdeaconry as Archdeaconry);
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateArchdeaconryName(event.target.value);
    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                Name:
                <input type="text" value={archdeaconry.name} onChange={onNameChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default Form;