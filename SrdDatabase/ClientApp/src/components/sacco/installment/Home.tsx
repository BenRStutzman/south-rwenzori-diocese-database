import * as React from 'react';
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
            </div>
            <SearchBox expanded={expanded} />
            <SearchResults />
        </>
    );
}

export default Home;
