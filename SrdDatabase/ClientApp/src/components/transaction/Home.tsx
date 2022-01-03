import * as React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';

const Home = () =>
    <>
        <h1 className="page-title">Transactions</h1>
        <Link className="btn btn-primary float-right" to="/transaction/add">Add new</Link>
        <SearchBox />
        <SearchResults />
    </>;

export default Home;
