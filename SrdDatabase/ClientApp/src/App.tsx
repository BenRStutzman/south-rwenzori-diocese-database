import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import './site.css'
import Archdeaconries from './components/Archdeaconries';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/archdeaconries' component={Archdeaconries} />
    </Layout>
);
