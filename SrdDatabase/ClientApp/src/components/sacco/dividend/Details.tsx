import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../../store/sacco/dividend/details';
import * as SharedStore from '../../../store/sacco/shared';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { formattedDate } from '../../../helpers/miscellaneous';
import { Spinner } from 'reactstrap';
import { describeDividend } from '../../../helpers/sacco/dividendHelper';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ dividendId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    history,
    deletingDividendIds,
    deleteDividend,
}: Props) => {
    const loadData = () => {
        const dividendId = parseInt(match.params.dividendId);
        loadDetails(dividendId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteDividend(details.dividend, () => { history.push('/sacco/dividend'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{describeDividend(details.dividend)}</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/sacco/dividend/edit/${details.dividend.id}`}>
                        Edit dividend
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingDividendIds.includes(details.dividend.id as number) ? <Spinner size="sm" /> : 'Delete dividend'}
                    </button>
                </div>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="date"
                    itemValue={formattedDate(details.dividend.date)}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.dividend.details, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);