import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

type Props = Omit<RouteProps, 'component'> & {
    component: React.ComponentType<any>
}

const PrivateRoute = ({component : Component, ...rest }: Props) =>
    <Route {...rest} render={props => (
        localStorage.getItem('userData')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}/>

export default PrivateRoute;
