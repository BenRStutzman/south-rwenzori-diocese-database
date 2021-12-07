import * as React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { State } from '../../../store';
import { User } from '../../../store/user';
import LoadingSpinner from '../../shared/LoadingSpinner';
import * as Store from '../../../store/user/home';
import * as SharedStore from '../../../store/shared';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deleteUser,
    deletingUserId,
    searchUsers,
    parameters,
}: Props) => {
    const onDelete = (user: User) => {
        deleteUser(user, () => { searchUsers(parameters); });
    };

    return resultsLoading ? <LoadingSpinner /> :
        !results.length ? <h2>No results.</h2> :
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="col-3">Name</th>
                        <th className="col-3">Username</th>
                        <th className="col-3">User Type</th>
                        <th className="col-1"></th>
                        <th className="col-1"></th>
                        <th className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((user: User) =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.userType}</td>
                            <td>
                                <Link className="btn btn-secondary" to={`/user/details/${user.id}`}>
                                    View
                                </Link>
                            </td>
                            <td>
                                <Link className="btn btn-primary" to={`/user/edit/${user.id}`}>
                                    Edit
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => { onDelete(user); }}>
                                    {user.id === deletingUserId ? <Spinner size="sm" /> : 'Delete'}
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>;
};

export default connect(
    (state: State) => ({ ...state.user.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
