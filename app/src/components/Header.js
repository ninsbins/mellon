import {Button, Container, Form, Nav, Navbar, NavbarBrand, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";

import "../styles/Header.css"
import "../styles/Home.css"
import {useState} from "react";

const Header = () => {
    let [searchTerm, setSearchTerm] = useState(null);

    return (
        <Navbar variant={"dark"} className={"bg-gradient"} expand={"lg"}>
            <Container fluid>
                <Link to="/">
                    <Navbar.Brand>
                        mellon
                    </Navbar.Brand>
                </Link>

                <Nav className={"ml-auto"}>
                    {/*change so search bar is only shown when logged in*/}
                    <Form className={"mr-5 d-flex"}>
                        <Form.Control
                            type={"search"}
                            placeholder={"Search"}
                            className={"me-2"}
                        />
                    </Form>

                    <Nav.Link>
                        <Link to={"/about"} className={"nav-links"}>
                            About
                        </Link>
                    </Nav.Link>
                    {/*    add in auth check when implemented*/}
                    <Nav.Link>
                        <Link to={"/profile"} className={"nav-links"}>
                            Profile
                        </Link>
                    </Nav.Link>

                    <Nav.Link>
                        <Link to={"/settings"} className={"nav-links"}>
                            Settings
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