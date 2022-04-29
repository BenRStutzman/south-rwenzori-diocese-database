import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../../store/sacco/member/details'
import * as SharedStore from '../../../store/shared';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Spinner } from 'reactstrap';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ memberId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    deletingSaccoMemberIds,
    deleteSaccoMember,
    history,
}: Props) => {
    const loadData = () => {
        const memberId = parseInt(match.params.memberId);
        loadDetails(memberId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteSaccoMember(details.member, () => { history.push('/sacco/member'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>Member {details.member.name}</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/sacco/member/edit/${details.member.id}`}>
                        Edit member
                    </Link>
                    <button className='btn btn-danger' type="button" onClick={onDelete}>
                        {deletingSaccoMemberIds.includes(details.member.id as number) ? <Spinner size="sm" /> : "Delete member"}
                    </button>
                </div>
            </div>
            <div className="details-boxes">
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.member.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);