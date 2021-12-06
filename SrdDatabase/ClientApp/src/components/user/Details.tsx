import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/user/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../shared/DetailsBox';

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
            <div className="details-boxes">
                <DetailsBox
                    itemType="username"
                    itemValue={details.user.username}
                />
                <DetailsBox
                    itemType="user type"
                    itemValue={details.user.userType}
                />
            </div>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.user.details, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Details as any);