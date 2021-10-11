import axios from "axios";
import authHeader from "./authHeader";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: authHeader()
    // baseURL: process.env.SERVER_URL,
});

export default instance;