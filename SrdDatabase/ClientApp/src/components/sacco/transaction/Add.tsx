import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../../store/sacco/transaction/save';
import { State } from '../../../store';
import SaveForm from './partials/SaveForm';
import { bindActionCreators } from 'redux';
import { useQueryParams } from '../../../helpers/miscellaneous';
import LoadingSpinner from '../../shared/LoadingSpinner';

type Props =
    Store.State &
    typeof Store.actionCreators;

const Add = ({
    isLoading,
    prefillTransaction,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        var memberIdString = queryParams.get('memberId');
        const memberId = memberIdString ? parseInt(memberIdString) : undefined;

        prefillTransaction(memberId);
    };

    useEffect(loadData, []);

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>Add Transaction</h1>
            <SaveForm isNew />
        </>;
}

export default connect(
    (state: State) => state.sacco.transaction.save,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
