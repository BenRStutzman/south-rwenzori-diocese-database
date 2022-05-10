import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../../store/sacco/installment/save';
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
    prefillInstallment,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        var loanIdString = queryParams.get('loanId');
        const loanId = loanIdString ? parseInt(loanIdString) : undefined;

        var memberIdString = queryParams.get('memberId');
        const memberId = memberIdString ? parseInt(memberIdString) : undefined;

        prefillInstallment(loanId, memberId);
    };

    useEffect(loadData, []);

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>Add Installment</h1>
            <SaveForm isNew />
        </>;
}

export default connect(
    (state: State) => state.sacco.installment.save,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
