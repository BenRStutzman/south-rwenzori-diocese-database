import * as React from 'react';
import { Link } from 'react-router-dom';
import ExpandButton from '../shared/ExpandButton';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';

const Home = () => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <>
            <div className="page-heading">
                <h1>Charges</h1>
                <ExpandButton expanded={expanded} setExpanded={setExpanded} />
                <Link className="btn btn-primary float-right" to="/charge/add">Add new</Link>
            </div>
            <SearchBox expanded={expanded} />
            <SearchResults />
        </>
    );
}

export default Home;
