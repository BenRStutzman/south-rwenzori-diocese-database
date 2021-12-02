import * as Store from '../../../store/archdeaconry/save';
import React, { ChangeEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Spinner } from 'reactstrap';

interface OwnProps {
    submitWord: string;
}

type Props =
    Store.State &
    typeof Store.actionCreators &
    RouteComponentProps &
    OwnProps;

const SaveForm = ({
    submitWord,
    archdeaconry,
    saveArchdeaconry,
    setName,
    hasBeenChanged,
    errors,
    history,
    archdeaconryLoading,
    isSaving,
}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        saveArchdeaconry(archdeaconry, history);
    };

    return archdeaconryLoading ? <LoadingSpinner /> :
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
                {isSaving ? <Spinner size="sm" /> : `${submitWord} archdeaconry`}
            </button>
        </form>;
}

export default connect(
    (state: State, ownProps: OwnProps) => ({ ...state.archdeaconry.save, ...ownProps }),
    Store.actionCreators
)(withRouter(SaveForm as any));