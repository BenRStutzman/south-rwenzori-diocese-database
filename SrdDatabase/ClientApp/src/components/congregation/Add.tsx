import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store';
import * as Store from '../../store/congregation/save';
import SaveForm from './partials/SaveForm';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps;

const Add = ({
    resetCongregation,
    history,
}: Props) => {
    const loadData = () => {
        resetCongregation();
    }

    useEffect(loadData, []);

    const onAddSuccess = () => {
        history.push('/congregation')
    }

    return (
        <>
            <h1>Add Congregation</h1>
            <SaveForm
                submitWord="Create"
                onSaveSuccess={onAddSuccess}
            />
        </>
    );
}

export default connect(
    (state: State) => state.congregation.save,
    Store.actionCreators
)(Add as any);
