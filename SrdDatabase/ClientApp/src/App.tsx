import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import './site.css'
import PrivateRoute from './components/shared/PrivateRoute';
import Login from './components/Login';
import Home from './components/Home';
import ArchdeaconryHome from './components/archdeaconry/Home';
import ArchdeaconryAdd from './components/archdeaconry/Add';
import ArchdeaconryEdit from './components/archdeaconry/Edit';
import ArchdeaconryDetails from './components/archdeaconry/Details';
import ParishHome from './components/parish/Home';
import ParishAdd from './components/parish/Add';
import ParishEdit from './components/parish/Edit';
import ParishDetails from './components/parish/Details';
import CongregationHome from './components/congregation/Home';
import CongregationAdd from './components/congregation/Add';
import CongregationEdit from './components/congregation/Edit';
import CongregationDetails from './components/congregation/Details';
import EventHome from './components/event/Home';
import EventAdd from './components/event/Add';
import EventEdit from './components/event/Edit';
import EventDetails from './components/event/Details';
import UserHome from './components/user/Home';
import UserAdd from './components/user/Add';
import UserEdit from './components/user/Edit';
import UserDetails from './components/user/Details';
import { Role } from './helpers/role';

export default () => (
    <Layout>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path='/archdeaconry' component={ArchdeaconryHome} />
        <PrivateRoute exact path='/archdeaconry/add' component={ArchdeaconryAdd} roles={[Role.Editor, Role.Administrator]}/>
        <PrivateRoute exact path='/archdeaconry/edit/:archdeaconryId' component={ArchdeaconryEdit} roles={[Role.Editor, Role.Administrator]} />
        <PrivateRoute exact path='/archdeaconry/details/:archdeaconryId' component={ArchdeaconryDetails} />
        <PrivateRoute exact path='/parish' component={ParishHome} />
        <PrivateRoute exact path='/parish/add' component={ParishAdd} roles={[Role.Editor, Role.Administrator]} />
        <PrivateRoute exact path='/parish/edit/:parishId' component={ParishEdit} roles={[Role.Editor, Role.Administrator]} />
        <PrivateRoute exact path='/parish/details/:parishId' component={ParishDetails} />
        <PrivateRoute exact path='/congregation' component={CongregationHome} />
        <PrivateRoute exact path='/congregation/add' component={CongregationAdd} roles={[Role.Editor, Role.Administrator]} />
        <PrivateRoute exact path='/congregation/edit/:congregationId' component={CongregationEdit} roles={[Role.Editor, Role.Administrator]} />
        <PrivateRoute exact path='/congregation/details/:congregationId' component={CongregationDetails} />
        <PrivateRoute exact path='/event' component={EventHome} />
        <PrivateRoute exact path='/event/add' component={EventAdd} roles={[Role.Editor, Role.Administrator]} />
        <PrivateRoute exact path='/event/edit/:eventId' component={EventEdit} roles={[Role.Editor, Role.Administrator]} />
        <PrivateRoute exact path='/event/details/:eventId' component={EventDetails} />
        <PrivateRoute exact path='/user' component={UserHome} roles={[Role.Administrator]}/>
        <PrivateRoute exact path='/user/add' component={UserAdd} roles={[Role.Administrator]} />
        <PrivateRoute exact path='/user/edit/:userId' component={UserEdit} roles={[Role.Administrator]} />
        <PrivateRoute exact path='/user/details/:userId' component={UserDetails} roles={[Role.Administrator]} />
    </Layout>
);
