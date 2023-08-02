import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';

const NavBar = () => {
    return (
        <Navbar bg="primary" expand="sm" variant="dark" className={`mt-4 mb-4 rounded ${styles['navbar-container']}`}>
            <Container style={{ textShadow: '0 0 5px black, 0 0 10px gray, 0 0 15px black' }}>
                <Navbar.Brand as={NavLink} to="/" className={styles['navbar-brand']}><strong> Waiter.app </strong></Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to="/" className={styles['nav-link']}><strong> Home </strong></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );

};

export default NavBar;