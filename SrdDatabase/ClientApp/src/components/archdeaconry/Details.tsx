import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/archdeaconry/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Archdeaconry } from '../../store/archdeaconry';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ archdeaconryId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    deleteArchdeaconry,
    deletingArchdeaconryId,
    history,
    match,
}: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadDetails(archdeaconryId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteArchdeaconry(details.archdeaconry as Archdeaconry, () => { history.push('/archdeaconry'); });
    };

    return detailsLoading || deletingArchdeaconryId ? <LoadingSpinner /> :
        <>
            <h1>{(details.archdeaconry as Archdeaconry).name} Archdeaconry</h1>
            <Link className="btn btn-primary" to={`/archdeaconry/edit/${(details.archdeaconry as Archdeaconry).id}`}>
                Edit archdeaconry
            </Link>
            <button className='btn btn-danger float-right' type="button" onClick={onDelete}>
                Delete archdeaconry
            </button>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.archdeaconry.details, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Details as any);