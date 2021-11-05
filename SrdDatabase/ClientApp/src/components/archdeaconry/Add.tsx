import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store';
import * as Store from '../../store/archdeaconry/save';
import LoadingSpinner from '../shared/LoadingSpinner';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps;

const Add = ({ archdeaconry,
    archdeaconryLoading,
    resetArchdeaconry,
    history,
    setName,
    saveArchdeaconry,
    isSaving,
    hasBeenChanged,
    errors
}: Props) => {
    const loadData = () => { resetArchdeaconry(); };

    useEffect(loadData, []);

    const onSave = () => {
        saveArchdeaconry(archdeaconry, history);
    };

    return archdeaconryLoading || isSaving ? <LoadingSpinner /> :
        <>
            <h1>Add Archdeaconry</h1>
            <Form
                archdeaconry={archdeaconry}
                updateArchdeaconryName={setName}
                onSave={onSave}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                archdeaconryExists={false}
            />
        </>;
};

export default connect(
    (state: State) => state.archdeaconry.save,
    Store.actionCreators
)(Add as any);
