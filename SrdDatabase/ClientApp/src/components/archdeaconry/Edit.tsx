import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconries/Save';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps<{ archdeaconryId: string }>;

const Edit = ({ isLoading, archdeaconry, updateArchdeaconryName, loadArchdeaconry, saveArchdeaconry, match }: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadArchdeaconry(archdeaconryId);
    };

    useEffect(loadData, []);

    return isLoading
        ? <h1>Loading...</h1>
        :
            <>
                <h1 id="tabelLabel">Edit {archdeaconry.name} Archdeaconry</h1>
                <Form
                    archdeaconry={archdeaconry}
                    updateArchdeaconryName={updateArchdeaconryName}
                    saveArchdeaconry={saveArchdeaconry} />
            </>;
}

export default connect(
    (state: State) => state.archdeaconries.save,
    Store.actionCreators
)(Edit as any);
