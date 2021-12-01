import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getUser } from '../../helpers/userHelper';

type Props = Omit<RouteProps, 'component'> & {
    component: React.ComponentType<any>
    roles?: string[],
}

const PrivateRoute = ({ component: Component, roles, ...rest }: Props) =>
    <Route {...rest} render={props => {
        const user = getUser();
        if (!user) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }

        if (roles && !roles.includes(user.userType as string)) {
            return <Redirect to='/' />;
        }

        return <Component {...props} />
    }} />;

export default PrivateRoute;
