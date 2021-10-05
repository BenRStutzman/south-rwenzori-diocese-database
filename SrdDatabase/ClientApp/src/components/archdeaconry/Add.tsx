import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconries/Save';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators

const Add = ({ archdeaconry, updateArchdeaconryName, saveArchdeaconry }: Props) =>
    <>
        <h1 id="tabelLabel">Add Archdeaconry</h1>
        <Form
            archdeaconry={archdeaconry}
            updateArchdeaconryName={updateArchdeaconryName}
            saveArchdeaconry={saveArchdeaconry} />
    </>;

export default connect(
    (state: State) => state.archdeaconries.save,
    Store.actionCreators
)(Add as any);
