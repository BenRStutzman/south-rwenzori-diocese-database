import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store';
import * as Store from '../../store/congregation/save';
import LoadingSpinner from '../shared/LoadingSpinner';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps;

const Add = ({
    loadParishes,
    congregationLoading,
    congregation,
    parishesLoading,
    parishes,
    resetCongregation,
    history,
    setName,
    setParishId,
    hasBeenChanged,
    saveCongregation,
    isSaving,
    errors }: Props) => {
    const loadData = () => {
        loadParishes();
        resetCongregation();
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveCongregation(congregation, history);
    }

    return congregationLoading || parishesLoading || isSaving ? <LoadingSpinner /> :
        <>
            <h1>Add Congregation</h1>
            <Form
                congregation={congregation}
                updateCongregationName={setName}
                updateCongregationParishId={setParishId}
                onSave={onSave}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                parishes={parishes}
            />
        </>;
}

export default connect(
    (state: State) => state.congregation.save,
    Store.actionCreators
)(Add as any);
