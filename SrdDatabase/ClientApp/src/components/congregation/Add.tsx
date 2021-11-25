import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store';
import * as Store from '../../store/congregation/save';
import * as SharedStore from '../../store/shared';
import LoadingSpinner from '../shared/LoadingSpinner';
import Form from './partials/SaveForm';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
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
    errors
}: Props) => {
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
                setName={setName}
                setParishId={setParishId}
                onSave={onSave}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                parishes={parishes}
                congregationExists={false}
            />
        </>;
}

export default connect(
    (state: State) => ({ ...state.congregation.save, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Add as any);
