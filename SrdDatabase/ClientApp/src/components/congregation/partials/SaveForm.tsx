import { Congregation } from "../../../store/congregation/shared";
import { AppThunkAction } from '../../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { Errors } from "../../../helpers/apiHelpers";
import { Parish } from "../../../store/parish/shared";

interface Props {
    congregation: Congregation;
    onSave: () => void;
    onDelete?: () => void;
    updateCongregationName: (name: string) => AppThunkAction<Action>;
    updateCongregationParishId: (parishId: number) => AppThunkAction<Action>;
    hasBeenChanged: boolean;
    errors: Errors;
    parishes: Parish[];
    congregationExists: boolean;
}

const SaveForm = ({
    congregation,
    parishes,
    onSave,
    onDelete,
    updateCongregationName,
    updateCongregationParishId,
    hasBeenChanged,
    errors,
    congregationExists,
}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateCongregationName(event.target.value);
    }

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateCongregationParishId(parseInt(event.target.value));
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
                    spellCheck={false}
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
                        key={fieldName}>
                        {errorList.join(" ")}</li>
                    )}
                </ul>
            }
            <button disabled={!hasBeenChanged} className="btn btn-primary" type="submit">
                {congregationExists ? 'Update' : 'Create'} congregation
            </button>
            {
                congregationExists &&
                <button className="btn btn-danger float-right" type="button" onClick={onDelete}>
                    Delete congregation
                </button>
            }
        </form>
    );
}

export default SaveForm;