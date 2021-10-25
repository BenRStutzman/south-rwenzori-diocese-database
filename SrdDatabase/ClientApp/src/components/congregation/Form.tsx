﻿import { Congregation } from "../../store/congregation";
import { AppThunkAction } from '../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { Errors } from "../../apiHelpers";
import { Parish } from "../../store/parish";

interface Props {
    congregation: Congregation;
    onSubmit: () => void;
    updateCongregationName: (name: string) => AppThunkAction<Action>;
    updateCongregationParishId: (parishId: number) => AppThunkAction<Action>;
    hasBeenChanged: boolean;
    hasBeenSaved: boolean;
    errors: Errors;
    parishes: Parish[];
}

const Form = ({ congregation,
    parishes,
    onSubmit,
    updateCongregationName,
    updateCongregationParishId,
    hasBeenChanged,
    hasBeenSaved,
    errors}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateCongregationName(event.target.value);
    }

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateCongregationParishId(parseInt(event.target.value));
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
                        value={congregation.name ? congregation.name : ""}
                        onChange={onNameChange}
                        maxLength={50}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="parishId">Parish</label>
                    <select
                        id="parishId"
                        className="form-control"
                        value={congregation.parishId ? congregation.parishId : ""}
                        onChange={onParishIdChange}
                        required
                    >
                        <option key={0} value="" disabled>--- select a parish ---</option>
                        {parishes.map(parish =>
                            <option key={parish.id} value={parish.id}>
                                {parish.name}
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
                <p className="save-alert">Congregation Saved!</p>
            }
        </>
    );
}

export default Form;