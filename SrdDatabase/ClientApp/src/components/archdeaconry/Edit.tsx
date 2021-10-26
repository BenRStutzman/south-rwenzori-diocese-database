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
    match,
    hasBeenChanged,
    errors }: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadArchdeaconry(archdeaconryId);
    };

    useEffect(loadData, []);

    const onSubmit = () => {
        saveArchdeaconry(archdeaconry, history);
    }

    return archdeaconryLoading ? <LoadingSpinner /> :
        <>
            <h1>Edit {archdeaconry.name} Archdeaconry</h1>
            <Form
                archdeaconry={archdeaconry}
                updateArchdeaconryName={setName}
                onSubmit={onSubmit}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
            />
        </>;
}

export default connect(
    (state: State) => state.archdeaconry.save,
    Store.actionCreators
)(Edit as any);
