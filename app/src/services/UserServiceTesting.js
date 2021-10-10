import axios from 'axios';
import authHeader from "./authheader";

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

    //also used (part 2) in UpdateEmployeeComponent
    updateUser(user, userId) {
        return axios.put(USER_API_BASE_URL + '/' + userId, user); //making a rest api call: PUT(to modify) http request
    }
}

export default new UserServiceTesting();