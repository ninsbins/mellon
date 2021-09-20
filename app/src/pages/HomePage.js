import Header from "../components/Header";
import {Container} from "react-bootstrap";

import "../styles/Home.css"
import {Component} from "react";

class HomePage extends Component {

    render() {
        return (
            <div>
                <Header/>
                <Container>Introducing Mellon</Container>
            </div>
        );
    }
}

export default HomePage;