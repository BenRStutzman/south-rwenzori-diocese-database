import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/parish/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { atLeast } from '../../helpers/userRole';
import { User } from '../../store/user';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ parishId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    user,
}: Props) => {
    const loadData = () => {
        const parishId = parseInt(match.params.parishId);
        loadDetails(parishId);
    };

    React.useEffect(loadData, []);

    const canEdit = atLeast.editor.includes((user as User).userType as string);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{details.parish.name} Parish</h1>
            {
                canEdit &&
                <Link className="btn btn-primary float-right" to={`/parish/edit/${details.parish.id}`}>
                    Edit parish
                </Link>
            }
            <h2>Archdeaconry: {details.parish.archdeaconry}</h2>
            <h2>Congregations ({details.congregations.length})</h2>
            <ul>
                {details.congregations.map(congregation =>
                    <li key={congregation.id}>{congregation.name}</li>
                )}
            </ul>
            <h2>Recent Events</h2>
            <ul>
                {details.recentEvents.map(event =>
                    <li key={event.id}>{new Date(event.date as Date).toLocaleDateString('en-ca')}: {event.eventType} of {event.firstPersonName}{event.secondPersonName ? ` and ${event.secondPersonName}` : ''} at {event.congregation} Congregation</li>
                )}
            </ul>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.parish.details, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Details as any);