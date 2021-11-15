import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import './site.css'
import Login from './components/Login';
import Home from './components/Home';
import ArchdeaconryHome from './components/archdeaconry/Home';
import ArchdeaconryAdd from './components/archdeaconry/Add';
import ArchdeaconryEdit from './components/archdeaconry/Edit';
import ParishSearch from './components/parish/Home';
import ParishAdd from './components/parish/Add';
import ParishEdit from './components/parish/Edit';
import CongregationSearch from './components/congregation/Home';
import CongregationAdd from './components/congregation/Add';
import CongregationEdit from './components/congregation/Edit';
import EventSearch from './components/event/Home';
import EventAdd from './components/event/Add';
import EventEdit from './components/event/Edit';
import PrivateRoute from './components/shared/PrivateRoute';

export default () => (
    <Layout>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path='/archdeaconry' component={ArchdeaconryHome} />
        <PrivateRoute exact path='/archdeaconry/add' component={ArchdeaconryAdd} />
        <PrivateRoute exact path='/archdeaconry/edit/:archdeaconryId' component={ArchdeaconryEdit} />
        <PrivateRoute exact path='/parish' component={ParishSearch} />
        <PrivateRoute exact path='/parish/add' component={ParishAdd} />
        <PrivateRoute exact path='/parish/edit/:parishId' component={ParishEdit} />
        <PrivateRoute exact path='/congregation' component={CongregationSearch} />
        <PrivateRoute exact path='/congregation/add' component={CongregationAdd} />
        <PrivateRoute exact path='/congregation/edit/:congregationId' component={CongregationEdit} />
        <PrivateRoute exact path='/event' component={EventSearch} />
        <PrivateRoute exact path='/event/add' component={EventAdd} />
        <PrivateRoute exact path='/event/edit/:eventId' component={EventEdit} />
    </Layout>
);
