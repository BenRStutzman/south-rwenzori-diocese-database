import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import './site.css'
import ArchdeaconrySearch from './components/archdeaconry/Search';
import ArchdeaconryAdd from './components/archdeaconry/Add';
import ArchdeaconryEdit from './components/archdeaconry/Edit';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/archdeaconry' component={ArchdeaconrySearch} />
        <Route exact path='/archdeaconry/add' component={ArchdeaconryAdd} />
        <Route exact path='/archdeaconry/edit/:archdeaconryId' component={ArchdeaconryEdit} />
    </Layout>
);
