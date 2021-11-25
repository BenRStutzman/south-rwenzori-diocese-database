import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store';
import * as Store from '../../store/parish/save';
import * as SharedStore from '../../store/parish/shared';
import LoadingSpinner from '../shared/LoadingSpinner';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps;

const Add = ({
    parishLoading,
    archdeaconriesLoading,
    parish,
    archdeaconries,
    loadArchdeaconries,
    resetParish,
    history,
    setParishName,
    setParishArchdeaconryId,
    saveParish,
    isSaving,
    hasBeenChanged,
    errors
}: Props) => {
    const loadData = () => {
        loadArchdeaconries();
        resetParish();
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveParish(parish, history);
    }

    return parishLoading || archdeaconriesLoading || isSaving ? <LoadingSpinner /> :
        <>
            <h1>Add Parish</h1>
            <Form
                parish={parish}
                updateParishName={setParishName}
                updateParishArchdeaconryId={setParishArchdeaconryId}
                onSave={onSave}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                archdeaconries={archdeaconries}
                parishExists={false}
            />
        </>;
}

export default connect(
    (state: State) => ({ ...state.parish.save, ...state.parish.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Add as any);
