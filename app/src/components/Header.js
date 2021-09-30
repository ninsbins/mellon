import {
    Button,
    Container,
    Dropdown,
    Form,
    Image, Modal,
    Nav,
    Navbar,
    NavbarBrand,
    NavDropdown,
    NavLink,
    Row
} from "react-bootstrap";
import {Link} from "react-router-dom";

import "../styles/Header.css"
import "../styles/Home.css"

import {useState} from "react";

const Header = (props) => {
    const [show, setShow] = useState(false);

    let [searchTerm, setSearchTerm] = useState("");
    let [searchFilter, setSearchFilter] = useState(null);

    //dictionary of content types in application
    const contentTypes = ['Music', 'Books', 'Movies', 'Recipes'];

    const handleSearchKeyUp = event => {
        event.preventDefault();
        if (event.key === 'Enter' && event.keyCode === 13) {
            if (searchFilter == null) {
                setShow(true);
            } else {
                props.search(searchTerm, searchFilter);
            }
        }

    }

    const handleFormSubmit = e => e.preventDefault();

    let handleSelect = async (eventKey) => {
        console.log(eventKey);
        setSearchFilter(eventKey);
    };

    let handleClose = () => setShow(false);

    return (
        <>
            <Navbar variant={"dark"} className={"bg-gradient"} expand={"lg"} fixed={"top"}>
                <Container fluid>
                    <Link to="/">
                        <Navbar.Brand>
                            {/*<Image*/}
                            {/*    src={"./images/logo.png"}*/}
                            {/*    width={"30"}*/}
                            {/*    height={"30"}*/}
                            {/*/>*/}
                            mellon
                        </Navbar.Brand>
                    </Link>


                    <Nav className={"ml-auto"}>
                        <div className={"d-flex"}>
                            <Container className={"mr-5"}>
                                {/*change so search bar is only shown when logged in*/}
                                {/*filter search area*/}
                                <Row>
                                    <Dropdown onSelect={handleSelect}>
                                        <Dropdown.Toggle
                                            variant="light"
                                            id="dropdown-basic"
                                        >
                                            {searchFilter == null
                                                ? "Search filter"
                                                : contentTypes[searchFilter]}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item disabled>
                                                Search filter
                                            </Dropdown.Item>
                                            {contentTypes.map((option, index) => (
                                                <Dropdown.Item eventKey={index}>
                                                    {option}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                        {/*<Dropdown.Menu>*/}
                                        {/*    {brands == null ? (*/}
                                        {/*        <Dropdown.ItemText>*/}
                                        {/*            No brands to show*/}
                                        {/*        </Dropdown.ItemText>*/}
                                        {/*    ) : (*/}
                                        {/*        brands.map((brand, index) => (*/}
                                        {/*            <Dropdown.Item eventKey={index}>*/}
                                        {/*                {brand}*/}
                                        {/*            </Dropdown.Item>*/}
                                        {/*        ))*/}
                                        {/*    )}*/}
                                        {/*</Dropdown.Menu>*/}
                                    </Dropdown>
                                    <Form onSubmit={handleFormSubmit}>
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
                                </Row>
                            </Container>

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
                                    Login
                                </Link>
                            </Nav.Link>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    Please select a search filter and try again.
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Header;