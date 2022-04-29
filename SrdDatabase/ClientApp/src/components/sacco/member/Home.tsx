import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../store';
import { Link } from 'react-router-dom';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';
import ExpandButton from '../../shared/ExpandButton';

const Home = () => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <>
            <div className="page-heading">
                <h1>Members</h1>
                <ExpandButton expanded={expanded} setExpanded={setExpanded} />
                <div>
                    <Link className="btn btn-primary float-right" to="/member/add">Add new</Link>
                </div>
            </div>
            <SearchBox expanded={expanded} />
            <SearchResults />
        </>
    );
}

export default connect(
    (state: State) => state.shared,
)(Home);
