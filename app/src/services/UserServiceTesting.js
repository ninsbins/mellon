import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/auth/users"; //api call

//return axios.get(API_URL + 'user', { headers: authHeader() });

//Class used by UpdateUserComponents, which then invokes UserControllerTesting.
class UserServiceTesting {

    //returns all users
    getAllUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    //(Jess) Testing for now!
    //called when adding a new User to DB(called from CreateEmployeeComponent)
    createUser(user) {
        return axios.post(USER_API_BASE_URL, user); //making a rest api call: POST http request
    }

    //called during UpdateEmployeeComponent. Gets the object and pre-fills in the update form
    getUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId); //making a rest api call: GET request

    }

    //also used (part 2) in UpdateEmployeeComponent
    updateUser(user, userId) {
        return axios.put(USER_API_BASE_URL + '/' + userId, user); //making a rest api call: PUT(to modify) http request
    }
}

export default new UserServiceTesting();