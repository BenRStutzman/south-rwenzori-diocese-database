import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/parish/save';
import SaveForm from './partials/SaveForm';

type Props =
    typeof Store.actionCreators;

const Add = ({
    resetParish,
}: Props) => {
    const loadData = () => {
        resetParish();
    };

    useEffect(loadData, []);

    return (
        <>
            <h1>Add Parish</h1>
            <SaveForm isNew />
        </>
     );
}

export default connect(
    null,
    Store.actionCreators
)(Add as any);
