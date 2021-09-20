import {Button, Nav, Navbar, NavbarBrand, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";

import "../styles/Header.css"
import "../styles/Home.css"

const Header = () => {
    return (
        <Navbar className={"bg-gradient"} variant={"dark"} expand={"lg"}>
            <Link to="/">
                <NavbarBrand>
                    mellon
                </NavbarBrand>
            </Link>
            <Nav className={"ml-auto"}>
                <NavLink>
                    <Link to={"/about"} className={"nav-links"}>
                        About
                    </Link>
                </NavLink>
                <NavLink>
                    <Link to={"/signup"} className={"nav-links"}>
                        Sign up
                    </Link>
                </NavLink>
            </Nav>

        </Navbar>
    );
}

export default Header;