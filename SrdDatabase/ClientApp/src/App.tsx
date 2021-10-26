import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import './site.css'
import ArchdeaconryHome from './components/archdeaconry/Home';
import ArchdeaconryAdd from './components/archdeaconry/Add';
import ArchdeaconryEdit from './components/archdeaconry/Edit';
import ParishSearch from './components/parish/Search';
import ParishAdd from './components/parish/Add';
import ParishEdit from './components/parish/Edit';
import CongregationSearch from './components/congregation/Search';
import CongregationAdd from './components/congregation/Add';
import CongregationEdit from './components/congregation/Edit';
import EventSearch from './components/event/Search';
import EventAdd from './components/event/Add';
import EventEdit from './components/event/Edit';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/archdeaconry' component={ArchdeaconryHome} />
        <Route exact path='/archdeaconry/add' component={ArchdeaconryAdd} />
        <Route exact path='/archdeaconry/edit/:archdeaconryId' component={ArchdeaconryEdit} />
        <Route exact path='/parish' component={ParishSearch} />
        <Route exact path='/parish/add' component={ParishAdd} />
        <Route exact path='/parish/edit/:parishId' component={ParishEdit} />
        <Route exact path='/congregation' component={CongregationSearch} />
        <Route exact path='/congregation/add' component={CongregationAdd} />
        <Route exact path='/congregation/edit/:congregationId' component={CongregationEdit} />
        <Route exact path='/event' component={EventSearch} />
        <Route exact path='/event/add' component={EventAdd} />
        <Route exact path='/event/edit/:eventId' component={EventEdit} />
    </Layout>
);
