import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/archdeaconry/details'
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Archdeaconry } from '../../store/archdeaconry';
import { RouteComponentProps } from 'react-router';

type Props =
    Store.State &
    typeof Store.actionCreators &
    RouteComponentProps<{ archdeaconryId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    deleteArchdeaconry,
    history,
    match,
}: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadDetails(archdeaconryId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        var archdeaconry = details.archdeaconry as Archdeaconry;
        if (window.confirm(`Are you sure you want to delete ${archdeaconry.name} Archdeaconry?`)) {
            deleteArchdeaconry(archdeaconry.id as number, history);
        }
    };

    return detailsLoading ? <LoadingSpinner /> :
        <p>Hello from {(details.archdeaconry as Archdeaconry).name} archdeaconry</p>;
}
    
export default connect(
    (state: State) => state.archdeaconry.details,
    Store.actionCreators
)(Details as any);