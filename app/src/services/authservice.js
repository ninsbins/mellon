import axios from "axios";


const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password
            })
            .then(response => {
                console.log(response.data)
                if (response.data.accessToken) {
                    console.log(response.data)

                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        console.log(localStorage.getItem('user'));
        return localStorage.getItem('user');
    }
}

export default new AuthService();