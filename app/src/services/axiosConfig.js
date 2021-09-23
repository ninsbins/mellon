import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080'
    // baseURL: process.env.SERVER_URL,
});

export default instance;