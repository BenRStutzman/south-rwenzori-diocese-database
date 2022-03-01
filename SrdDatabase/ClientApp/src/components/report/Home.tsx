import * as React from 'react';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';

const Home = () => {

    return (
        <>
            <div className="page-heading" >
                <h1>Reports</h1>
            </div>
            <SearchBox expanded={true} />
            <SearchResults />
        </>
    );
}

export default Home;
