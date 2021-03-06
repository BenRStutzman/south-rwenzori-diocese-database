import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
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
import CensusHome from './components/census/Home';
import CensusAdd from './components/census/Add';
import CensusEdit from './components/census/Edit';
import CensusDetails from './components/census/Details';
import PaymentHome from './components/payment/Home';
import PaymentAdd from './components/payment/Add';
import PaymentEdit from './components/payment/Edit';
import PaymentDetails from './components/payment/Details';
import QuotaHome from './components/quota/Home';
import QuotaAdd from './components/quota/Add';
import QuotaEdit from './components/quota/Edit';
import QuotaDetails from './components/quota/Details';
import ReportHome from './components/report/Home';
import UserHome from './components/user/Home';
import UserAdd from './components/user/Add';
import UserEdit from './components/user/Edit';
import UserDetails from './components/user/Details';
import Sacco from './components/sacco/home/Home';
import SaccoMemberHome from './components/sacco/member/Home';
import SaccoMemberAdd from './components/sacco/member/Add';
import SaccoMemberEdit from './components/sacco/member/Edit';
import SaccoMemberDetails from './components/sacco/member/Details';
import SaccoTransactionHome from './components/sacco/transaction/Home';
import SaccoTransactionAdd from './components/sacco/transaction/Add';
import SaccoTransactionEdit from './components/sacco/transaction/Edit';
import SaccoTransactionDetails from './components/sacco/transaction/Details';
import SaccoDistributionHome from './components/sacco/distribution/Home';
import SaccoDistributionAdd from './components/sacco/distribution/Add';
import SaccoDistributionEdit from './components/sacco/distribution/Edit';
import SaccoDistributionDetails from './components/sacco/distribution/Details';
import SaccoLoanHome from './components/sacco/loan/Home';
import SaccoLoanAdd from './components/sacco/loan/Add';
import SaccoLoanEdit from './components/sacco/loan/Edit';
import SaccoLoanDetails from './components/sacco/loan/Details';
import SaccoPaymentHome from './components/sacco/payment/Home';
import SaccoPaymentAdd from './components/sacco/payment/Add';
import SaccoPaymentEdit from './components/sacco/payment/Edit';
import SaccoPaymentDetails from './components/sacco/payment/Details';
import SaccoInstallmentDetails from './components/sacco/installment/Details';
import SaccoReportHome from './components/sacco/report/Home';
import { atLeast } from './helpers/userHelper';

export default () => (
    <Layout>
        <Switch>
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/archdeaconry' component={ArchdeaconryHome} />
            <PrivateRoute exact path='/archdeaconry/add' component={ArchdeaconryAdd} roles={atLeast.editor} />
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
            <PrivateRoute exact path='/census' component={CensusHome} />
            <PrivateRoute exact path='/census/add' component={CensusAdd} roles={atLeast.contributor} />
            <PrivateRoute exact path='/census/edit/:censusId' component={CensusEdit} roles={atLeast.contributor} />
            <PrivateRoute exact path='/census/details/:censusId' component={CensusDetails} />
            <PrivateRoute exact path='/payment' component={PaymentHome} roles={atLeast.viewer} />
            <PrivateRoute exact path='/payment/add' component={PaymentAdd} roles={atLeast.accountant} />
            <PrivateRoute exact path='/payment/edit/:paymentId' component={PaymentEdit} roles={atLeast.accountant} />
            <PrivateRoute exact path='/payment/details/:paymentId' component={PaymentDetails} roles={atLeast.viewer} />
            <PrivateRoute exact path='/quota' component={QuotaHome} roles={atLeast.viewer} />
            <PrivateRoute exact path='/quota/add' component={QuotaAdd} roles={atLeast.accountant} />
            <PrivateRoute exact path='/quota/edit/:quotaId' component={QuotaEdit} roles={atLeast.accountant} />
            <PrivateRoute exact path='/quota/details/:quotaId' component={QuotaDetails} roles={atLeast.viewer} />
            <PrivateRoute exact path='/report' component={ReportHome} roles={atLeast.accountant} />
            <PrivateRoute exact path='/user' component={UserHome} roles={atLeast.administrator} />
            <PrivateRoute exact path='/user/add' component={UserAdd} roles={atLeast.administrator} />
            <PrivateRoute exact path='/user/edit/:userId' component={UserEdit} roles={atLeast.administrator} />
            <PrivateRoute exact path='/user/details/:userId' component={UserDetails} roles={atLeast.administrator} />
            <PrivateRoute exact path='/sacco' component={Sacco} />
            <PrivateRoute exact path='/sacco/member' component={SaccoMemberHome} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/member/add' component={SaccoMemberAdd} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/member/edit/:memberId' component={SaccoMemberEdit} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/member/details/:memberId' component={SaccoMemberDetails} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/transaction' component={SaccoTransactionHome} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/transaction/add' component={SaccoTransactionAdd} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/transaction/edit/:transactionId' component={SaccoTransactionEdit} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/transaction/details/:transactionId' component={SaccoTransactionDetails} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/distribution' component={SaccoDistributionHome} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/distribution/add' component={SaccoDistributionAdd} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/distribution/edit/:distributionId' component={SaccoDistributionEdit} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/distribution/details/:distributionId' component={SaccoDistributionDetails} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/loan' component={SaccoLoanHome} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/loan/add' component={SaccoLoanAdd} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/loan/edit/:loanId' component={SaccoLoanEdit} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/loan/details/:loanId' component={SaccoLoanDetails} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/payment' component={SaccoPaymentHome} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/payment/add' component={SaccoPaymentAdd} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/payment/edit/:paymentId' component={SaccoPaymentEdit} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/payment/details/:paymentId' component={SaccoPaymentDetails} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/installment/details/:installmentId' component={SaccoInstallmentDetails} roles={atLeast.sacco} />
            <PrivateRoute exact path='/sacco/report' component={SaccoReportHome} roles={atLeast.sacco} />
            <Redirect from='*' to='/' />
        </Switch>
    </Layout>
);
