import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Store from '../store/shared';
import { State } from '../store';
import { connect } from 'react-redux';
import { userRole } from '../helpers/userRole';

type Props = Store.State;

const Navigation = ({
    currentUser,
}: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header>
            <Navbar className='navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3' light>
                <Container>
                    <NavbarBrand tag={Link} to='/'>South Rwenzori Diocese Database</NavbarBrand>
                    <NavbarToggler onClick={toggle} className='mr-2' />
                    {
                        currentUser &&
                        <Collapse className='d-sm-inline-flex flex-sm-row-reverse' isOpen={isOpen} navbar>
                            <ul className='navbar-nav flex-grow'>
                                <NavItem>
                                    <NavLink tag={Link} className='text-dark' to='/archdeaconry'>Archdeaconries</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className='text-dark' to='/parish'>Parishes</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className='text-dark' to='/congregation'>Congregations</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className='text-dark' to='/event'>Events</NavLink>
                                </NavItem>
                                {
                                    currentUser.userType === userRole.administrator &&
                                    <NavItem>
                                        <NavLink tag={Link} className='text-dark' to='/user'>Users</NavLink>
                                    </NavItem>
                                }
                                <NavItem>
                                    <NavLink tag={Link} className='text-blue' to='/login'>Logout</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    }
                </Container>
            </Navbar>
        </header>
    );
}

export default connect(
    (state: State) => state.shared,
)(Navigation as any);
