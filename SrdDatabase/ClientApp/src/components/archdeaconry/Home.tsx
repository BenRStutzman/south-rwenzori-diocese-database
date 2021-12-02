import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as SharedStore from '../../store/shared';
import { Link } from 'react-router-dom';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';
import { atLeast } from '../../helpers/userRole';

type Props =
    SharedStore.State;

const Home = ({
    currentUser,
}: Props) => {
    const canAdd = currentUser && atLeast.editor.includes(currentUser.userType as string);

    return (
        <>
            <h1 className="page-title">Archdeaconries</h1>
            {
                canAdd &&
                <Link className="btn btn-primary float-right" to="/archdeaconry/add">Add new</Link>
            }
            <SearchBox />
            <SearchResults />
        </>
    );
}    

export default connect(
    (state: State) => state.shared,
)(Home as any);
