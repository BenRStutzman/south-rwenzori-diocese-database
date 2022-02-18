import * as React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { State } from '../../../store';
import { User } from '../../../models/user';
import LoadingSpinner from '../../shared/LoadingSpinner';
import * as Store from '../../../store/user/home';
import * as SharedStore from '../../../store/shared';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paging from '../../shared/Paging';
import SortButton from '../../shared/SortButton';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deleteUser,
    deletingUserIds,
    searchUsers,
    parameters,
}: Props) => {
    const onDelete = (user: User) => {
        deleteUser(user, () => { searchUsers(parameters, false); });
    };

    const onPage = (pageNumber: number) => {
        searchUsers({ ...parameters, pageNumber });
    };

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchUsers({ ...parameters, sortColumn, sortDescending });
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
                        <th className="col-3">
                            Name
                            <SortButton
                                parameters={parameters}
                                columnName="name"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-3">
                            Username
                            <SortButton
                                parameters={parameters}
                                columnName="username"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-3">
                            Type
                            <SortButton
                                parameters={parameters}
                                columnName="userType"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-3"></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.users.map((user: User) =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.userType}</td>
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/user/details/${user.id}`}>
                                    View
                                </Link>
                                <Link className="btn btn-primary" to={`/user/edit/${user.id}`}>
                                    Edit
                                </Link>
                                <button className="btn btn-danger" onClick={() => { onDelete(user); }}>
                                    {deletingUserIds.includes(user.id as number) ? <Spinner size="sm" /> : 'Delete'}
                                </button>
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
    (state: State) => ({ ...state.user.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
