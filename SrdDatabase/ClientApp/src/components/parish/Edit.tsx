import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/parish/save';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps<{ parishId: string }>;

const Edit = ({ isLoading,
    history,
    parish,
    setParishName,
    loadParish,
    saveParish,
    match,
    hasBeenSaved,
    hasBeenChanged,
    errors }: Props) => {
    const loadData = () => {
        const parishId = parseInt(match.params.parishId);
        loadParish(parishId);
    };

    useEffect(loadData, []);

    const onSubmit = () => {
        saveParish(parish, history);
    }

    return isLoading
        ? <h1>Loading...</h1>
        :
            <>
                <h1>Edit {parish.name} Parish</h1>
                <Form
                parish={parish}
                updateParishName={setParishName}
                onSubmit={onSubmit}
                hasBeenChanged={hasBeenChanged}
                hasBeenSaved={hasBeenSaved}
                errors={errors}
                />
            </>;
}

export default connect(
    (state: State) => state.parish.save,
    Store.actionCreators
)(Edit as any);
