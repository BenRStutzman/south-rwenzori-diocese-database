import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store';
import * as Store from '../../store/parish/save';
import LoadingSpinner from '../shared/LoadingSpinner';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators
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
    hasBeenSaved,
    hasBeenChanged,
    errors }: Props) => {
    const loadData = () => {
        loadArchdeaconries();
        resetParish();
    };

    useEffect(loadData, []);

    const onSubmit = () => {
        saveParish(parish, history);
    }

    return parishLoading || archdeaconriesLoading ? <LoadingSpinner /> :
        <>
            <h1>Add Parish</h1>
            <Form
                parish={parish}
                updateParishName={setParishName}
                updateParishArchdeaconryId={setParishArchdeaconryId}
                onSubmit={onSubmit}
                hasBeenSaved={hasBeenSaved}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                archdeaconries={archdeaconries}
            />
        </>;
}

export default connect(
    (state: State) => state.parish.save,
    Store.actionCreators
)(Add as any);
