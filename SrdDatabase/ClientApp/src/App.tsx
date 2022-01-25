import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/shared/Layout';
import './site.css'
import PrivateRoute from './components/shared/PrivateRoute';
import Login from './components/login/Login';
import Home from './components/home/Home';
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
import PaymentHome from './components/payment/Home';
import PaymentAdd from './components/payment/Add';
import PaymentEdit from './components/payment/Edit';
import PaymentDetails from './components/payment/Details';
import UserHome from './components/user/Home';
import UserAdd from './components/user/Add';
import UserEdit from './components/user/Edit';
import UserDetails from './components/user/Details';
import { atLeast } from './helpers/userHelper';

export default () => (
    <Layout>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path='/archdeaconry' component={ArchdeaconryHome} />
        <PrivateRoute exact path='/archdeaconry/add' component={ArchdeaconryAdd} roles={atLeast.editor}/>
        <PrivateRoute exact path='/archdeaconry/edit/:archdeaconryId' component={ArchdeaconryEdit} roles={atLeast.editor} />
        <PrivateRoute exact path='/archdeaconry/details/:archdeaconryId' component={ArchdeaconryDetails} />
        <PrivateRoute exact path='/parish' component={ParishHome} />
        <PrivateRoute exact path='/parish/add' component={ParishAdd} roles={atLeast.editor} />
        <PrivateRoute exact path='/parish/edit/:parishId' component={ParishEdit} roles={atLeast.editor} />
        <PrivateRoute exact path='/parish/details/:parishId' component={ParishDetails} />
        <PrivateRoute exact path='/congregation' component={CongregationHome} />
        <PrivateRoute exact path='/congregation/add' component={CongregationAdd} roles={atLeast.editor} />
        <PrivateRoute exact path='/congregation/edit/:congregationId' component={CongregationEdit} roles={atLeast.editor} />
        <PrivateRoute exact path='/congregation/details/:congregationId' component={CongregationDetails} />
        <PrivateRoute exact path='/event' component={EventHome} />
        <PrivateRoute exact path='/event/add' component={EventAdd} roles={atLeast.contributor} />
        <PrivateRoute exact path='/event/edit/:eventId' component={EventEdit} roles={atLeast.contributor} />
        <PrivateRoute exact path='/event/details/:eventId' component={EventDetails} />
        <PrivateRoute exact path='/payment' component={PaymentHome} roles={atLeast.accountant} />
        <PrivateRoute exact path='/payment/add' component={PaymentAdd} roles={atLeast.accountant} />
        <PrivateRoute exact path='/payment/edit/:paymentId' component={PaymentEdit} roles={atLeast.accountant} />
        <PrivateRoute exact path='/payment/details/:paymentId' component={PaymentDetails} roles={atLeast.accountant} />
        <PrivateRoute exact path='/user' component={UserHome} roles={atLeast.administrator}/>
        <PrivateRoute exact path='/user/add' component={UserAdd} roles={atLeast.administrator} />
        <PrivateRoute exact path='/user/edit/:userId' component={UserEdit} roles={atLeast.administrator} />
        <PrivateRoute exact path='/user/details/:userId' component={UserDetails} roles={atLeast.administrator} />
    </Layout>
);
