import {Button, Container, Nav, Navbar, NavbarBrand, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";

import "../styles/Header.css"
import "../styles/Home.css"

const Header = () => {
    return (
        <Navbar variant={"dark"} expand={"lg"}>
            <Container fluid className={"bg-gradient"}>
                <Link to="/">
                    <Navbar.Brand>
                        mellon
                    </Navbar.Brand>
                </Link>
                <Nav className={"ml-auto"}>
                    <Nav.Link>
                        <Link to={"/about"} className={"nav-links"}>
                            About
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to={"/login"} className={"nav-links"}>
                            Log in
                        </Link>
                    </Nav.Link>

                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;