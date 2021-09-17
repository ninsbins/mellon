import Header from "../components/Header";
import {Link} from "react-router-dom";
import {Container} from "reactstrap";

const HomePage = () => {
    return (
        <div>
            <Header/>
            <Container>
                <Link to="/signup">Sign up</Link>
            </Container>
        </div>
    );
}

export default HomePage;