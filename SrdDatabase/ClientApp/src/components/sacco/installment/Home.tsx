import * as React from 'react';
import { Link } from 'react-router-dom';
import ExpandButton from '../../shared/ExpandButton';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';

const Home = () => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <>
            <div className="page-heading">
                <h1>Installments</h1>
                <ExpandButton expanded={expanded} setExpanded={setExpanded} />
                <div>
                    <Link className="btn btn-primary float-right" to="/sacco/installment/add">Add new</Link>
                </div>
            </div>
            <SearchBox expanded={expanded} />
            <SearchResults />
        </>
    );
}

export default Home;
