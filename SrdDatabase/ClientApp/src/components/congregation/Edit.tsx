import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/congregation/save';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import Form from './Form';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps<{ congregationId: string }>;

const Edit = ({
    loadCongregation,
    loadParishes,
    congregationLoading,
    parishesLoading,
    history,
    congregation,
    parishes,
    setName,
    setParishId,
    match,
    hasBeenChanged,
    saveCongregation,
    isSaving,
    errors }: Props) => {
    const loadData = () => {
        loadParishes();
        const congregationId = parseInt(match.params.congregationId);
        loadCongregation(congregationId);
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveCongregation(congregation, history);
    }

    return congregationLoading || parishesLoading || isSaving ? <LoadingSpinner /> :
        <>
            <h1>Edit {congregation.name} Congregation</h1>
            <Form
                congregation={congregation}
                parishes={parishes}
                updateCongregationName={setName}
                updateCongregationParishId={setParishId}
                onSave={onSave}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
            />
        </>;
}

export default connect(
    (state: State) => state.congregation.save,
    Store.actionCreators
)(Edit as any);
