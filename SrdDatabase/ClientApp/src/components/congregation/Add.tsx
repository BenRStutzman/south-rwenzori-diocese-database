import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
            <SaveForm isNew />
        </>
    );
}

export default connect(
    null,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
