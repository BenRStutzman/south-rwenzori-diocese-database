import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/congregation/save';
import SaveForm from './partials/SaveForm';

type Props =
    typeof Store.actionCreators;

const Add = ({
    resetCongregation,
}: Props) => {
    const loadData = () => { resetCongregation(); };

    useEffect(loadData, []);

    return (
        <>
            <h1>Add Congregation</h1>
            <SaveForm submitWord="Create" />
        </>
    );
}

export default connect(
    null,
    Store.actionCreators
)(Add as any);
