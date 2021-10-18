import axiosConfig from "./axiosConfig";

class authService {
    login(username, password) {
        return axiosConfig
            .post(`/api/auth/login`, {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.clear();
    }

    register(username, email, password) {
        return axiosConfig.post(`/api/auth/signup`, {
            username,
            email,
            password
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new authService();