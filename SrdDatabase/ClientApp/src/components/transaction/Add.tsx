import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/transaction/save';
import SaveForm from './partials/SaveForm';
import { bindActionCreators } from 'redux';
import { useQueryParams } from '../../helpers/miscellaneous';

type Props =
    typeof Store.actionCreators;

const Add = ({
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
