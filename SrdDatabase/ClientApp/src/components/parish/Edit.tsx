import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/parish/save';
import * as SharedStore from '../../store/parish/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import Form from './Form';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ parishId: string }>;

const Edit = ({
    parishLoading,
    archdeaconriesLoading,
    history,
    parish,
    archdeaconries,
    setParishName,
    setParishArchdeaconryId,
    loadParish,
    loadArchdeaconries,
    saveParish,
    deleteParish,
    match,
    isSaving,
    hasBeenChanged,
    errors
}: Props) => {
    const loadData = () => {
        loadArchdeaconries();
        const parishId = parseInt(match.params.parishId);
        loadParish(parishId);
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveParish(parish, history);
    };

    const onDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${parish.name} Parish?`)) {
            deleteParish(parish.id as number, history);
        }
    };

    return parishLoading || archdeaconriesLoading || isSaving ? <LoadingSpinner /> :
        <>
            <h1>Edit {parish.name} Parish</h1>
            <Form
                parish={parish}
                archdeaconries={archdeaconries}
                updateParishName={setParishName}
                updateParishArchdeaconryId={setParishArchdeaconryId}
                onSave={onSave}
                onDelete={onDelete}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                parishExists={true}
            />
        </>;
}

export default connect(
    (state: State) => ({ ...state.parish.save, ...state.parish.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Edit as any);
