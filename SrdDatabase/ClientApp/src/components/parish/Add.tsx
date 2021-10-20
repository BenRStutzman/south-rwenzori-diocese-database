import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store';
import * as Store from '../../store/parish/save';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps;

const Add = ({ parish,
    resetParish,
    history,
    setParishName,
    saveParish,
    hasBeenSaved,
    hasBeenChanged,
    errors }: Props) => {
    const loadData = () => { resetParish(); };

    useEffect(loadData, []);

    const onSubmit = () => {
        saveParish(parish, history);
    }

    return (
        <>
            <h1>Add Parish</h1>
            <Form
                parish={parish}
                updateParishName={setParishName}
                onSubmit={onSubmit}
                hasBeenSaved={hasBeenSaved}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
            />
        </>
    );
}

export default connect(
    (state: State) => state.parish.save,
    Store.actionCreators
)(Add as any);
