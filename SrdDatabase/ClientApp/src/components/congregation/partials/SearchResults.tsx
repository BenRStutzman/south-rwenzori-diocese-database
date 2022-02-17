import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import * as Store from '../../../store/congregation/home';
import * as SharedStore from '../../../store/shared';
import { atLeast } from '../../../helpers/userHelper';
import { Congregation } from '../../../models/congregation';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { State } from '../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paging from '../../shared/Paging';
import { parenthesizeIfNegative } from '../../../helpers/miscellaneous';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingCongregationId,
    deleteCongregation,
    searchCongregations,
    parameters,
    currentUser,
}: Props) => {
    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType);
    const canViewBalance = currentUser && atLeast.accountant.includes(currentUser.userType);

    const onPage = (pageNumber: number) => {
        searchCongregations({ ...parameters, pageNumber });
    }

    const onDelete = (congregation: Congregation) => {
        deleteCongregation(congregation, () => { searchCongregations(parameters); })
    };

    return resultsLoading ? <LoadingSpinner /> :
        !results.totalResults ? <h2>No results.</h2> :
            <>
                <Paging
                    resultsLoading={resultsLoading}
                    results={results}
                    onPage={onPage}
                />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th className={`col-${canEdit ? '4' : canViewBalance ? '5' : '6'}`}>Name</th>
                            <th className={`col-${canEdit ? '3' : canViewBalance ? '4' : '5'}`}>Parish</th>
                            {
                                canViewBalance &&
                                <th className='col-2'>Balance (UGX)</th>
                            }
                            <th className={`col-${canEdit ? '3' : '1'}`}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.congregations.map((congregation: Congregation) =>
                            <tr key={congregation.id}>
                                <td>{congregation.name}</td>
                                <td>
                                    <Link to={`/parish/details/${congregation.parishId}`}>{congregation.parish}</Link>
                                </td>
                                {
                                    canViewBalance &&
                                    <td className="money-column">
                                        {parenthesizeIfNegative(congregation.balance as number)}
                                    </td>
                                }
                                <td className="buttons-column">
                                    <Link className="btn btn-secondary" to={`/congregation/details/${congregation.id}`}>
                                        View
                                    </Link>
                                    {
                                        canEdit &&
                                        <>
                                            <Link className="btn btn-primary" to={`/congregation/edit/${congregation.id}`}>
                                                Edit
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => { onDelete(congregation); }}>
                                                {congregation.id === deletingCongregationId ? <Spinner size="sm" /> : "Delete"}
                                            </button>
                                        </>
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Paging
                    resultsLoading={resultsLoading}
                    results={results}
                    onPage={onPage}
                />
            </>;
};

export default connect(
    (state: State) => ({ ...state.congregation.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
