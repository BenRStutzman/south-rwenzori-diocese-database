import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/user/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

type Props =
    Store.State &
    typeof Store.actionCreators &
    RouteComponentProps<{ userId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
}: Props) => {
    const loadData = () => {
        const userId = parseInt(match.params.userId);
        loadDetails(userId);
    };

    React.useEffect(loadData, []);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">User {details.user.name}</h1>
            <Link className="btn btn-primary float-right" to={`/user/edit/${details.user.id}`}>
                Edit user
            </Link>
            <h2>Username: {details.user.username}</h2>
            <h2>User type: {details.user.userType}</h2>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.user.details, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Details as any);