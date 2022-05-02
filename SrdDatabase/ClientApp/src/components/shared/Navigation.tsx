import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Store from '../../store/shared';
import { State } from '../../store';
import { connect } from 'react-redux';
import { atLeast } from '../../helpers/userHelper';

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
                    <NavbarBrand tag={Link} to='/'>SRD Admin</NavbarBrand>
                    <NavbarToggler onClick={toggle} className='mr-2' />
                    {
                        currentUser &&
                        <Collapse className='d-sm-inline-flex flex-sm-row-reverse' isOpen={isOpen} navbar>
                            <ul className='navbar-nav flex-grow'>
                                {
                                    currentUser.userType !== 'Sacco' &&
                                    <>
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
                                        <NavItem>
                                            <NavLink tag={Link} className='text-dark' to='/census'>Censuses</NavLink>
                                        </NavItem>
                                    </>
                                }
                                {
                                    atLeast.accountant.includes(currentUser.userType) &&
                                    <>
                                        <NavItem>
                                            <NavLink tag={Link} className='text-dark' to='/quota'>Quotas</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className='text-dark' to='/payment'>Payments</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className='text-dark' to='/report'>Reports</NavLink>
                                        </NavItem>
                                    </>
                                }
                                {
                                    atLeast.sacco.includes(currentUser.userType) &&
                                    <NavItem>
                                        <NavLink tag={Link} className='text-dark' to='/sacco/member'>Members</NavLink>
                                    </NavItem>
                                }
                                {
                                    atLeast.administrator.includes(currentUser.userType) &&
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
)(Navigation);
