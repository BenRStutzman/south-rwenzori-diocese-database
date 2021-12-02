import { State } from '../../../store';
import * as React from 'react';
import * as Store from '../../../store/congregation/save';
import * as SharedStore from '../../../store/shared';
import { connect } from 'react-redux';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { ChangeEvent, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface OwnProps {
    submitWord: string;
}

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps &
    OwnProps;

const SaveForm = ({
    isSaving,
    congregation,
    parishes,
    saveCongregation,
    setName,
    setParishId,
    hasBeenChanged,
    errors,
    submitWord,
    loadParishes,
    congregationLoading,
    parishesLoading,
    history,
}: Props) => {
    const loadData = () => {
        loadParishes();
    };

    useEffect(loadData, []);
        
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setParishId(parseInt(event.target.value));
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        saveCongregation(congregation, history);
    }

    return congregationLoading || parishesLoading || isSaving ? <LoadingSpinner /> :
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
                {submitWord} congregation
            </button>
        </form>;
}

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    ...state.congregation.save,
    ...state.shared,
    ...ownProps
});

const mapDispatchToProps = {
    ...Store.actionCreators,
    ...SharedStore.actionCreators
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm as any));