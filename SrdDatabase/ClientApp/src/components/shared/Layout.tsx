import * as React from 'react';
import { Container } from 'reactstrap';
import Navigation from './Navigation';

export default class Layout extends React.PureComponent<{}, { children?: React.ReactNode }> {
    public render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container>
                    {this.props.children}
                </Container>
            </React.Fragment>
        );
    }
}