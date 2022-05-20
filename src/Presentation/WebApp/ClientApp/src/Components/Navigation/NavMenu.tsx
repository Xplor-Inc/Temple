import { Container, Navbar } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import SessionManager from '../Service/SessionManager';
import { ROUTE_END_POINTS } from '../Core/Constants/RouteEndPoints';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import { FaBuffer, FaFileArchive, FaSignOutAlt, FaUserCog } from 'react-icons/fa';
import { ProfileImage } from './ProfileImage';
import { useAppSelector } from '../../ReduxStore/hooks';
import { AiFillDashboard, AiOutlineBank, BiTransfer, HiCurrencyRupee, HiOutlineDocumentReport, MdDashboard } from 'react-icons/all';

const NavMenu = () => {

    const isLogedIn = useAppSelector(state => state.user.isLoggedIn)

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm box-shadow fixed-top" style={{ backgroundColor: "#81019f" }} light>
                <Container className="box-container">
                    <div className="navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2">
                            {
                                isLogedIn ?
                                    <>
                                        <li>
                                            <NavLink className="nav-link nav-item ps-0" to={ROUTE_END_POINTS.USERS}>
                                                <FaUserCog />
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="nav-link nav-item" to={ROUTE_END_POINTS.RECEIPTBOOK} title="Receipt Book">
                                                <FaFileArchive />
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavDropdown title={<ProfileImage />} className="d-flex">
                                                <NavDropdown.Item className="dropdown-item" role={'button'}>
                                                    <NavLink className="dropdown-item" to={ROUTE_END_POINTS.CHANGE_PASSWORD}>
                                                        Change Password
                                                    </NavLink>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item className="dropdown-item" role={'button'}>
                                                    <NavLink className="dropdown-item" role={'button'} to={ROUTE_END_POINTS.USER_PROFILE}>
                                                        Update Profile
                                                    </NavLink>
                                                </NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="/profile" onClick={SessionManager.Logout}>
                                                    <NavLink className="dropdown-item" role={'button'} to="#logout">
                                                        Logout <FaSignOutAlt />
                                                    </NavLink>
                                                </NavDropdown.Item>

                                            </NavDropdown>
                                        </li>
                                    </>
                                    :
                                    <a className="nav-link nav-item ps-0" href={ROUTE_END_POINTS.HOME}>
                                        Home
                                    </a>
                            }
                        </ul>
                    </div>
                </Container>
            </Navbar>
        </header>
    );
}

export default NavMenu;