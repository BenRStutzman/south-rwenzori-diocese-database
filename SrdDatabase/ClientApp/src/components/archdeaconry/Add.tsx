import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/archdeaconry/save';
import SaveForm from './partials/SaveForm';

type Props =
    typeof Store.actionCreators;

const Add = ({
    resetArchdeaconry,
}: Props) => {
    const loadData = () => { resetArchdeaconry(); };

    useEffect(loadData, []);

    return (
        <>
            <h1>Add Archdeaconry</h1>
            <SaveForm isNew />
        </>
    );
};

export default connect(
    null,
    Store.actionCreators
)(Add as any);
