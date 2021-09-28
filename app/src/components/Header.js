import {Button, Container, Form, Nav, Navbar, NavbarBrand, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";

import "../styles/Header.css"
import "../styles/Home.css"
import {useState} from "react";

const Header = (props) => {
    let [searchTerm, setSearchTerm] = useState("");

    const handleSearchKeyUp = event => {
        event.preventDefault();
        if (event.key === 'Enter' && event.keyCode === 13) {
            props.search(searchTerm);
        }
    }

    const handleFormSubmit = e => e.preventDefault();

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
                    <Form className={"mr-5 d-flex"} onSubmit={handleFormSubmit}>
                        <Form.Control
                            type={"search"}
                            placeholder={"Search"}
                            className={"me-2"}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyUp={handleSearchKeyUp}
                        />
                        {/*<Button variant={"outline-light"}*/}
                        {/*        onClick={() => props.search(props.searchTerm)}>*/}
                        {/*    Search</Button>*/}
                    </Form>


                    <Nav.Link>
                        <Link to={"/about"} className={"nav-links"}>
                            About
                        </Link>
                    </Nav.Link>

                    <Nav.Link>
                        <Link to={"/food"} className={"nav-links"}>
                            Food
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