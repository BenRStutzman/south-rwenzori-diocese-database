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
    congregationLoading,
    parishesLoading,
    history,
    congregation,
    parishes,
    setCongregationName,
    setCongregationParishId,
    loadCongregation,
    loadParishes,
    saveCongregation,
    match,
    hasBeenSaved,
    hasBeenChanged,
    errors }: Props) => {
    const loadData = () => {
        loadParishes();
        const congregationId = parseInt(match.params.congregationId);
        loadCongregation(congregationId);
    };

    useEffect(loadData, []);

    const onSubmit = () => {
        saveCongregation(congregation, history);
    }

    return congregationLoading || parishesLoading ? <LoadingSpinner /> :
        <>
            <h1>Edit {congregation.name} Congregation</h1>
            <Form
                congregation={congregation}
                parishes={parishes}
                updateCongregationName={setCongregationName}
                updateCongregationParishId={setCongregationParishId}
                onSubmit={onSubmit}
                hasBeenChanged={hasBeenChanged}
                hasBeenSaved={hasBeenSaved}
                errors={errors}
            />
        </>;
}

export default connect(
    (state: State) => state.congregation.save,
    Store.actionCreators
)(Edit as any);
