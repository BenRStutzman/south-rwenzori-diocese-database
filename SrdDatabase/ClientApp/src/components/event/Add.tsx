import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/event/save';
import SaveForm from './partials/SaveForm';

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
            <SaveForm submitWord="Create" />
        </>
    );
}

export default connect(
    null,
    Store.actionCreators
)(Add as any);
