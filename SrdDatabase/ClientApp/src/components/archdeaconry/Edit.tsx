import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconries/save';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps<{ archdeaconryId: string }>;

const Edit = ({ isLoading,
    history,
    archdeaconry,
    setArchdeaconryName,
    loadArchdeaconry,
    saveArchdeaconry,
    match,
    hasBeenSaved,
    hasBeenChanged, }: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadArchdeaconry(archdeaconryId);
    };

    useEffect(loadData, []);

    const onSubmit = () => {
        saveArchdeaconry(archdeaconry, history);
    }

    return isLoading
        ? <h1>Loading...</h1>
        :
            <>
                <h1>Edit {archdeaconry.name} Archdeaconry</h1>
                <Form
                    archdeaconry={archdeaconry}
                    updateArchdeaconryName={setArchdeaconryName}
                    onSubmit={onSubmit}
                    hasBeenChanged={hasBeenChanged}
                    hasBeenSaved={hasBeenSaved}
                />
            </>;
}

export default connect(
    (state: State) => state.archdeaconries.save,
    Store.actionCreators
)(Edit as any);
