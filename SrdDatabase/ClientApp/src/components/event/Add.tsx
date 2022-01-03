import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/event/save';
import SaveForm from './partials/SaveForm';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';

type Props =
    typeof Store.actionCreators &
    RouteComponentProps<{ congregationId: string }>;

const Add = ({
    resetEvent,
    match,
}: Props) => {
    const loadData = () => {
        const congregationId = match.params.congregationId ? parseInt(match.params.congregationId) : undefined;
        resetEvent(congregationId);
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
