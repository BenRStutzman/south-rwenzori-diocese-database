import * as Store from '../../../store/archdeaconry/save';
import * as React from 'react';
import { FormEvent, ChangeEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';

interface OwnProps {
    isNew?: boolean;
}

type Props =
    Store.State &
    typeof Store.actionCreators &
    RouteComponentProps &
    OwnProps;

const SaveForm = ({
    isNew,
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

    const onSubmit = (event: FormEvent) => {
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
                    value={archdeaconry.name ?? ""}
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
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} archdeaconry`}
            </button>
        </form>;
}

export default connect(
    (state: State, ownProps: OwnProps) => ({ ...state.archdeaconry.save, ...ownProps }),
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(withRouter(SaveForm));