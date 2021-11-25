import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/congregation/save';
import * as SharedStore from '../../store/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import Form from './partials/SaveForm';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
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
    deleteCongregation,
    isSaving,
    errors
}: Props) => {
    const loadData = () => {
        loadParishes();
        const congregationId = parseInt(match.params.congregationId);
        loadCongregation(congregationId);
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveCongregation(congregation, history);
    };

    const onDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${congregation.name} Congregation?`)) {
            deleteCongregation(congregation.id as number, history);
        }
    };

    return congregationLoading || parishesLoading || isSaving ? <LoadingSpinner /> :
        <>
            <h1>Edit {congregation.name} Congregation</h1>
            <Form
                congregation={congregation}
                parishes={parishes}
                updateCongregationName={setName}
                updateCongregationParishId={setParishId}
                onSave={onSave}
                onDelete={onDelete}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                congregationExists={true}
            />
        </>;
}

export default connect(
    (state: State) => ({ ...state.congregation.save, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Edit as any);
