import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconry/save';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import Form from './Form';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps<{ archdeaconryId: string }>;

const Edit = ({ archdeaconryLoading,
    history,
    archdeaconry,
    setName,
    loadArchdeaconry,
    saveArchdeaconry,
    deleteArchdeaconry,
    match,
    hasBeenChanged,
    isSaving,
    errors }: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadArchdeaconry(archdeaconryId);
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveArchdeaconry(archdeaconry, history);
    }

    const onDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${archdeaconry.name} Archdeaconry?`)) {
            deleteArchdeaconry(archdeaconry.id as number, history);
        }
    }

    return archdeaconryLoading || isSaving ? <LoadingSpinner /> :
        <>
            <h1>Edit {archdeaconry.name} Archdeaconry</h1>
            <Form
                archdeaconry={archdeaconry}
                updateArchdeaconryName={setName}
                onSave={onSave}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                submitWord="Update"
            />
            <button className='btn btn-danger' type='button' onClick={onDelete}>Delete Archdeaconry</button>
        </>;
}

export default connect(
    (state: State) => state.archdeaconry.save,
    Store.actionCreators
)(Edit as any);
