import axios from 'axios';
import authHeader from "./authHeader";

const USER_API_BASE_URL = "http://localhost:8080/update/users"; //api call

//return axios.get(API_URL + 'user', { headers: authHeader() });

//Class used by UpdateUserComponents, which then invokes UserControllerTesting.
class UserServiceTesting {

    //returns all Users in database
    getAllUsers() {
        //return axios.get(USER_API_BASE_URL, null, { headers: authHeader() });
        return axios.get(USER_API_BASE_URL);
    }

    //called during UpdateEmployeeComponent. Gets the object and pre-fills in the update form
    getUserById(userId) {
        //return axios.get(USER_API_BASE_URL + '/' + userId); //making a rest api call: GET request
        return axios.get(`http://localhost:8080/update/users/${userId}`, { headers: authHeader() } ); //making a rest api call: GET request

    }

    //called(in UpdateUserPassword.js) when updating password only
    updateUsersPassword(user, userId) {
        return axios.put(`http://localhost:8080/update/users/password/${userId}`, user, { headers: authHeader() }); //making a rest api call: PUT(to modify) http request
    }

    //called(in UpdateEmployeeComponent.js) for updating most User details
    updateUser(user, userId) {
        return axios.put(`http://localhost:8080/update/users/${userId}`, user, { headers: authHeader() }); //making a rest api call: PUT(to modify) http request
    }
}

export default new UserServiceTesting();