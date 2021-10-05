import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import './site.css'
import ViewArchdeaconries from './components/archdeaconries/View';
import SaveArchdeaconry from './components/archdeaconries/Save';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/archdeaconries' component={ViewArchdeaconries} />
        <Route exact path='/archdeaconries/:archdeaconryId' component={SaveArchdeaconry} />
    </Layout>
);
