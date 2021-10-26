import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/parish/save';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import Form from './Form';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props =
    Store.State
    & typeof Store.actionCreators
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
    match,
    isSaving,
    hasBeenChanged,
    errors }: Props) => {
    const loadData = () => {
        loadArchdeaconries();
        const parishId = parseInt(match.params.parishId);
        loadParish(parishId);
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveParish(parish, history);
    }

    return parishLoading || archdeaconriesLoading || isSaving ? <LoadingSpinner /> :
        <>
            <h1>Edit {parish.name} Parish</h1>
            <Form
                parish={parish}
                archdeaconries={archdeaconries}
                updateParishName={setParishName}
                updateParishArchdeaconryId={setParishArchdeaconryId}
                onSave={onSave}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                submitWord="Update"
            />
        </>;
}

export default connect(
    (state: State) => state.parish.save,
    Store.actionCreators
)(Edit as any);
