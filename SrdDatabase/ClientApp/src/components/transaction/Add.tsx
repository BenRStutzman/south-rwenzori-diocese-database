import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/charge/saveimport { State } from '../../store';
import SaveForm from './partials/SaveForm';
import { bindActionCreators } from 'redux';
import { useQueryParams } from '../../helpers/miscellaneous';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props =
    Store.State &
    typeof Store.actionCreators;

const Add = ({
    transactionLoading,
    resetTransaction,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        var congregationIdString = queryParams.get('congregationId');
        const congregationId = congregationIdString ? parseInt(congregationIdString) : undefined;

        var parishIdString = queryParams.get('parishId');
        const parishId = parishIdString ? parseInt(parishIdString) : undefined;

        var archdeaconryIdString = queryParams.get('archdeaconryId');
        const archdeaconryId = archdeaconryIdString ? parseInt(archdeaconryIdString) : undefined;

        resetTransaction(congregationId, parishId, archdeaconryId);
    };

    useEffect(loadData, []);

    return transactionLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>Add Transaction</h1>
            <SaveForm isNew />
        </>;
}

export default connect(
    (state: State) => state.transaction.save,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
