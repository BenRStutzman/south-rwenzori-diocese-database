import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from '../../../store';
import * as Store from '../../../store/sacco/member/save';
import LoadingSpinner from '../../shared/LoadingSpinner';
import SaveForm from './partials/SaveForm';

type Props =
    Store.State &
    typeof Store.actionCreators;

const Add = ({
    prefillMember,
    isLoading,
}: Props) => {
    const loadData = () => { prefillMember(); };

    useEffect(loadData, []);

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>Add Member</h1>
            <SaveForm isNew />
        </>;
};

export default connect(
    (state: State) => state.sacco.member.save,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
