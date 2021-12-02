import { State } from '../../../store';
import React, { ChangeEvent, useEffect } from 'react';
import * as Store from '../../../store/parish/save';
import * as SharedStore from '../../../store/shared';
import { RouteComponentProps, withRouter } from 'react-router';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { connect } from 'react-redux';

interface OwnProps {
    submitWord: string;
};

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps &
    OwnProps;

const SaveForm = ({
    loadArchdeaconries,
    archdeaconriesLoading,
    parish,
    parishLoading,
    isSaving,
    archdeaconries,
    saveParish,
    setName,
    setArchdeaconryId,
    hasBeenChanged,
    errors,
    submitWord,
    history,
}: Props) => {
    const loadData = () => {
        loadArchdeaconries();
    };

    useEffect(loadData, []);

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setArchdeaconryId(parseInt(event.target.value));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        saveParish(parish, history);
    };

    return parishLoading || archdeaconriesLoading ? <LoadingSpinner /> :
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    className="form-control"
                    type="text"
                    spellCheck={false}
                    value={parish.name ? parish.name : ""}
                    onChange={onNameChange}
                    maxLength={50}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="archdeaconryId">Archdeaconry</label>
                <select
                    id="archdeaconryId"
                    className="form-control"
                    value={parish.archdeaconryId ? parish.archdeaconryId : ""}
                    onChange={onArchdeaconryIdChange}
                    required
                >
                    <option key={0} value="" disabled>--- select an archdeaconry ---</option>
                    {archdeaconries.map(archdeaconry =>
                        <option key={archdeaconry.id} value={archdeaconry.id}>
                            {archdeaconry.name}
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
                {isSaving ? <Spinner size="sm" /> : `${submitWord} parish`}
            </button>
        </form>;
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    ...state.parish.save,
    ...state.shared,
    ...ownProps,
});

const mapDispatchToProps = {
    ...Store.actionCreators,
    ...SharedStore.actionCreators,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm as any));