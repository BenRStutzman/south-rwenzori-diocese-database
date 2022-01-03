import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/transaction/save';
import SaveForm from './partials/SaveForm';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';

type Props =
    typeof Store.actionCreators
    & RouteComponentProps<{ congregationId: string }>;

const Add = ({
    resetTransaction,
    match,
}: Props) => {
    const loadData = () => {
        const congregationId = match.params.congregationId ? parseInt(match.params.congregationId) : undefined;
        resetTransaction(congregationId);
    };

    useEffect(loadData, []);

    return (
        <>
            <h1>Add Transaction</h1>
            <SaveForm isNew />
        </>
    );
}

export default connect(
    null,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
