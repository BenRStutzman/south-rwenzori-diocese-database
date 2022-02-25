import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/census/save';
import * as SharedStore from '../../store/shared';
import { Redirect, RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { canEdit, describeCensus } from '../../helpers/censusHelper';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ censusId: string }>;

const Edit = ({
    isLoading,
    history,
    census,
    loadCensus,
    deleteCensus,
    deletingCensusIds,
    match,
    currentUser,
}: Props) => {
    const loadData = () => {
        const censusId = parseInt(match.params.censusId);
        loadCensus(censusId);
    };

    // Make sure we're checking the current census,
    // not a past census left over in state, when deciding whether to redirect.
    const censusIsCurrent = parseInt(match.params.censusId) === census.id;

    useEffect(loadData, []);

    const onDelete = () => {
        deleteCensus(census, () => { history.push('/census'); });
    };

    return isLoading ? <LoadingSpinner fullPage /> :
        censusIsCurrent && !canEdit(census, currentUser) ? <Redirect to='/' /> :
            <>
                <div className="page-heading">
                    <h1>Edit {describeCensus(census)}</h1>
                    <div className="float-right button-group">
                        <Link className="btn btn-secondary" to={`/census/details/${census.id}`}>
                            View details
                        </Link>
                        <button className="btn btn-danger" type="button" onClick={onDelete}>
                            {deletingCensusIds.includes(census.id as number) ? <Spinner size="sm" /> : 'Delete census'}
                        </button>
                    </div>
                </div>
                <SaveForm />
            </>;
}

export default connect(
    (state: State) => ({ ...state.census.save, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
