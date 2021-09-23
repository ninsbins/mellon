import Header from "../components/Header";
import {Container} from "react-bootstrap";

import "../styles/Home.css"
import axiosConfig from "../services/axiosConfig";
import {useEffect, useState} from "react";

const HomePage = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axiosConfig
            .get(`/users`)
            .then((result) => {
                console.log(result);
                setUsers(result);
            }).catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <div>
            <Header/>
            <Container>Users: {users}</Container>
        </div>
    );
}

export default HomePage;