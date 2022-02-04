import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as SharedStore from '../../store/shared';
import { Link } from 'react-router-dom';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';
import { atLeast } from '../../helpers/userHelper';
import ExpandButton from '../shared/ExpandButton';

type Props =
    SharedStore.State;

const Home = ({
    currentUser,
}: Props) => {
    const [expanded, setExpanded] = React.useState(false);

    const canAdd = currentUser && atLeast.contributor.includes(currentUser.userType as string);

    return (
        <>
            <div className="page-heading" >
                <h1>Events</h1>
                <ExpandButton expanded={expanded} setExpanded={setExpanded} />

                {
                    canAdd &&
                    <Link className="btn btn-primary float-right" to="/event/add">Add new</Link>
                }
            </div>
            <SearchBox expanded={expanded} />
            <SearchResults />
        </>
    );
}

export default connect(
    (state: State) => state.shared
)(Home);
