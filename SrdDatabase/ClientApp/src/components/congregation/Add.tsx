import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Spinner } from 'reactstrap';
import { State } from '../../store';
import * as Store from '../../store/congregation/save';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps;

const Add = ({
    congregationLoading,
    parishesLoading,
    congregation,
    parishes,
    loadParishes,
    resetCongregation,
    history,
    setCongregationName,
    setCongregationParishId,
    saveCongregation,
    hasBeenSaved,
    hasBeenChanged,
    errors }: Props) => {
    const loadData = () => {
        loadParishes();
        resetCongregation();
    };

    useEffect(loadData, []);

    const onSubmit = () => {
        saveCongregation(congregation, history);
    }

    return congregationLoading || parishesLoading ? <Spinner /> :
        <>
            <h1>Add Congregation</h1>
            <Form
                congregation={congregation}
                updateCongregationName={setCongregationName}
                updateCongregationParishId={setCongregationParishId}
                onSubmit={onSubmit}
                hasBeenSaved={hasBeenSaved}
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
