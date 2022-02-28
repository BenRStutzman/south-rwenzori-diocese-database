import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/census/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { canEdit, describeCensus } from '../../helpers/censusHelper';
import { formattedDate } from '../../helpers/miscellaneous';
import { Spinner } from 'reactstrap';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ censusId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    currentUser,
    deletingCensusIds,
    deleteCensus,
    history,
}: Props) => {
    const loadData = () => {
        const censusId = parseInt(match.params.censusId);
        loadDetails(censusId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteCensus(details.census, () => { history.push('/census'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{describeCensus(details.census)}</h1>
                {
                    canEdit(details.census, currentUser) &&
                    <div className="button-group float-right">
                        <Link className="btn btn-primary" to={`/census/edit/${details.census.id}`}>
                            Edit census
                        </Link>
                        <button className="btn btn-danger" type="button" onClick={onDelete}>
                            {deletingCensusIds.includes(details.census.id as number) ? <Spinner size="sm" /> : 'Delete census'}
                        </button>
                    </div>
                }
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="date"
                    itemValue={formattedDate(details.census.date)}
                />
                <DetailsBox
                    itemType="christians"
                    itemValue={details.census.numberOfChristians?.toString()}
                />
                <DetailsBox
                    baseItemType="census"
                    itemType="congregation"
                    itemValue={details.census.congregation}
                    itemId={details.census.congregationId}
                />
                <DetailsBox
                    baseItemType="census"
                    itemType="parish"
                    itemValue={details.census.parish}
                    itemId={details.census.parishId}
                />
                <DetailsBox
                    baseItemType="census"
                    itemType="archdeaconry"
                    itemValue={details.census.archdeaconry}
                    itemId={details.census.archdeaconryId}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.census.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);