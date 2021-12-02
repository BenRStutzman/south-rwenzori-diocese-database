import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/parish/save';
import * as SharedStore from '../../store/shared';
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
    SharedStore.actionCreators
)(Add as any);
