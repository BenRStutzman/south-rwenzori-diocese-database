import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store';
import * as Store from '../../store/archdeaconries/save';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps;

const Add = ({ archdeaconry,
    resetArchdeaconry,
    history,
    setArchdeaconryName,
    saveArchdeaconry,
    hasBeenSaved,
    hasBeenChanged }: Props) => {
    const loadData = () => { resetArchdeaconry(); };

    useEffect(loadData, []);

    const onSubmit = () => {
        saveArchdeaconry(archdeaconry, history);
    }

    return (
        <>
            <h1>Add Archdeaconry</h1>
            <Form
                archdeaconry={archdeaconry}
                updateArchdeaconryName={setArchdeaconryName}
                onSubmit={onSubmit}
                hasBeenSaved={hasBeenSaved}
                hasBeenChanged={hasBeenChanged}
            />
        </>
    );
}

export default connect(
    (state: State) => state.archdeaconries.save,
    Store.actionCreators
)(Add as any);
