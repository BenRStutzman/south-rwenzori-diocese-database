import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/event/save';
import SaveForm from './partials/SaveForm';
import { bindActionCreators } from 'redux';

type Props =
    typeof Store.actionCreators

const Add = ({
    resetEvent,
}: Props) => {
    const loadData = () => {
        resetEvent();
    };

    useEffect(loadData, []);

    return (
        <>
            <h1>Add Event</h1>
            <SaveForm isNew />
        </>
    );
}

export default connect(
    null,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
