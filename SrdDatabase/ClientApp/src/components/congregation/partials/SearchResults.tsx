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
import SortButton from '../../shared/SortButton';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingCongregationIds,
    deleteCongregation,
    searchCongregations,
    parameters,
    currentUser,
}: Props) => {
    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType);
    const canViewFinances = currentUser && atLeast.viewer.includes(currentUser.userType);

    const onPage = (pageNumber: number) => {
        searchCongregations({ ...parameters, pageNumber });
    };

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchCongregations({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (congregation: Congregation) => {
        deleteCongregation(congregation, () => { searchCongregations(parameters, false); })
    };

    return (
        <>
            <Paging
                results={results}
                onPage={onPage}
            />
            {resultsLoading && <LoadingSpinner onTable />}
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className={`col-${canEdit ? '2' : canViewFinances ? '3' : '5'}`}>
                            Name
                            <SortButton
                                parameters={parameters}
                                columnName="name"
                                onSort={onSort}
                            />
                        </th>
                        <th className={`col-${canEdit ? '2' : canViewFinances ? '2' : '4'}`}>
                            Parish
                            <SortButton
                                parameters={parameters}
                                columnName="parish"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2">
                            Christians
                            <SortButton
                                parameters={parameters}
                                columnName="numberOfChristians"
                                onSort={onSort}
                            />
                        </th>
                        {
                            canViewFinances &&
                            <>
                                <th className='col-2'>
                                    {new Date().getFullYear()} Quota
                                    <SortButton
                                        parameters={parameters}
                                        columnName="quota"
                                        onSort={onSort}
                                    />
                                </th>
                                <th className='col-2'>
                                    Balance
                                    <SortButton
                                        parameters={parameters}
                                        columnName="balance"
                                        onSort={onSort}
                                    />
                                </th>
                            </>
                        }
                        <th className={`col-${canEdit ? '2' : '1'}`}></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.congregations.map((congregation: Congregation) =>
                        <tr key={congregation.id}>
                            <td>
                                <Link to={`/congregation/details/${congregation.id}`}>{congregation.name}</Link>
                            </td>
                            <td>
                                <Link to={`/parish/details/${congregation.parishId}`}>{congregation.parish}</Link>
                            </td>
                            <td className="number-column">{congregation.numberOfChristians?.toLocaleString()}</td>
                            {
                                canViewFinances &&
                                <>
                                    <td className="number-column">{congregation.quota?.toLocaleString()}</td>
                                    <td className="number-column">
                                        {parenthesizeIfNegative(congregation.balance)}
                                    </td>
                                </>
                            }
                            <td>
                                <div className="buttons-column">
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
                                                {deletingCongregationIds.includes(congregation.id as number) ? <Spinner size="sm" /> : "Delete"}
                                            </button>
                                        </>
                                    }
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {!resultsLoading && !results.totalResults && <h2>No results.</h2>}
            <Paging
                results={results}
                onPage={onPage}
            />
        </>
    );
};

export default connect(
    (state: State) => ({ ...state.congregation.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
