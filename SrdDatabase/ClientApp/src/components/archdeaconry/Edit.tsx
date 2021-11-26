import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconry/save';
import * as SharedStore from '../../store/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ archdeaconryId: string }>;

const Edit = ({ archdeaconryLoading,
    history,
    archdeaconry,
    setName,
    loadArchdeaconry,
    saveArchdeaconry,
    deleteArchdeaconry,
    deletingArchdeaconryId,
    match,
    hasBeenChanged,
    isSaving,
    errors
}: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadArchdeaconry(archdeaconryId);
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveArchdeaconry(archdeaconry, history);
    };

    const onDelete = () => {
        deleteArchdeaconry(archdeaconry, () => history.push('/archdeaconry'));
    };

    return archdeaconryLoading || isSaving || deletingArchdeaconryId ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Edit {archdeaconry.name} Archdeaconry</h1>
            <Link className="btn btn-secondary float-right" to={`/archdeaconry/details/${archdeaconry.id}`}>
                View details
            </Link>
            <SaveForm
                archdeaconry={archdeaconry}
                setName={setName}
                onSave={onSave}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                archdeaconryExists={true}
                onDelete={onDelete}
            />
        </>;
}

export default connect(
    (state: State) => ({ ...state.archdeaconry.save, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Edit as any);
