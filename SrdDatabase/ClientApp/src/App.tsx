import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import './site.css'
import ArchdeaconryHome from './components/archdeaconry/Home';
import ArchdeaconryEdit from './components/archdeaconry/Edit';
import ArchdeaconryAdd from './components/archdeaconry/Add';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/archdeaconry' component={ArchdeaconryHome} />
        <Route exact path='/archdeaconry/edit/:archdeaconryId' component={ArchdeaconryEdit} />
        <Route exact path='/archdeaconry/add' component={ArchdeaconryAdd} />
    </Layout>
);
