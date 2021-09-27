import Header from "../components/Header";
import {Container} from "react-bootstrap";

const SettingsPage = () => {
    return (
        <div className={"content-body"}>
            <Header/>
            <Container fluid>
                <h2 className={"primary-text"}>Settings</h2>
            </Container>

        </div>
    );
}

export default SettingsPage;