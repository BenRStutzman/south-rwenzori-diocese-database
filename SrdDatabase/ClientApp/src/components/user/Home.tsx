import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/user/home';
import { User } from '../../store/user';
import { useEffect } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';

type Props = Store.State & typeof Store.actionCreators;

const Home = ({
    resultsLoading,
  resultsrs,
    loadUsers,
    deleteUser,
    deletingId,
}: Props) => {
    const loadData = () => { loadUsers() };

    useEffect(loadData, []);

    const onDelete = (user: User) => {
        if (window.confirm(`Are you sure you want to delete the user ${user.name}?`)) {
            deleteUser(user.id as number);
        }
    }

    return resultsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Users</h1>
            <Link className="btn btn-primary float-right" to="/user/add">Add new</Link>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="col-2">Name</th>
                        <th className="col-3">Username</th>
                        <th className="col-2">User Type</th>
                        <th className="col-1"></th>
                        <th className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                 resultssers.map((user: User) =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.userType}</td>
                            <td>
                                <Link className="btn btn-secondary" to={`/user/edit/${user.id}`}>
                                    Edit
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => { onDelete(user); }}>
                                    {user.id === deletingId ? <Spinner size="sm" /> : 'Delete'}
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>;
}    

export default connect(
    (state: State) => state.user.home,
    Store.actionCreators
)(Home as any);
