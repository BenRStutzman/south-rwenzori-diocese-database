import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../store';
import * as Store from '../../../store/sacco/member/save';
import * as SharedStore from '../../../store/sacco/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Spinner } from 'reactstrap';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ memberId: string }>;

const Edit = ({
    isLoading,
    member,
    loadMember,
    match,
    history,
    deleteMember,
    deletingMemberIds,
}: Props) => {
    const loadData = () => {
        const memberId = parseInt(match.params.memberId);
        loadMember(memberId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteMember(member, () => { history.push('/sacco/member'); });
    };

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>Edit member {member.name}</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-secondary" to={`/sacco/member/details/${member.id}`}>
                        View details
                    </Link>
                    <button className='btn btn-danger' type="button" onClick={onDelete}>
                        {deletingMemberIds.includes(member.id as number) ? <Spinner size="sm" /> : "Delete member"}
                    </button>
                </div>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.member.save, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
