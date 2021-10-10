import React, {Component} from 'react';
import UserServiceTesting from "../services/UserServiceTesting";
import Header from "../components/Header";
import '../styles/UpdateUserComponent.css';

import {Container} from "@material-ui/core";
//^used 'rcc' to create the React snippet

//This component is for updating User details.
//Called when '/update-user/:id'
class UpdateUserComponent extends Component {

    constructor(props) {
        super(props)

        //attributes are set and stored here from the form input fields
        this.state = {
            id: this.props.match.params.id, //this gets the ID passed in from url/route
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }

        console.log("The User ID you entered in the routing = " + this.state.id);

        //Also need to bind the event handler, for input fields and buttons
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.updateUser = this.updateUser.bind(this); //when Update button is clicked
    }


    //Call the rest api to pre-fill the form.
    componentDidMount() { //passing in the id from this route
        UserServiceTesting.getUserById(this.state.id).then( (res) => {

            let user = res.data; //get data into this object .
            // Below lines are setting the User json object to the state variables^ so the FORM will be pre-filled!
            this.setState( {
                username: user.username,
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            });
        });
    }



    //When Update button is clicked
    updateUser = (e) => {
        e.preventDefault(); //It prevents a submit button from submitting a form
        let user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };

        console.log('User! => ' + JSON.stringify(user))

        //using the Service class PUT api method
        UserServiceTesting.updateUser(user, this.state.id).then( res => {
            alert("Update has been successful - Redirecting..."); //confirm with User
            this.props.history.push('/'); //after updated redirect to the Main page
        });
    }

    //When Cancel button is clicked
    cancel() {
        this.props.history.push('/'); //route back to Home page if Cancel button has been selected
    }

    //SETTING THE 5 PROPERTIES below:
    changeUsernameHandler = (event) => {
        this.setState({username: event.target.value});
    }

    //setting the ^ properties
    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    //setting the ^ properties
    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    //setting the ^ properties
    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    //setting the ^ properties
    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }


    //<Container className={"rounded-card"}>
    //</Container>
    render() {
        return (
            <div>
                <Header/>
                <div className="spacer">
                    &nbsp;
                </div>

                <div className= "container-body">
                    <div className= "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3"> {/* column width -give space from left margin*/}
                            <h3 className="text-center"> Update User</h3>
                            <div className="card-body">

                                <form>
                                    <div className = "form-group">
                                        <label> Username: </label>
                                        <input placeholder="username" name = "username" className="form-control"
                                               value={this.state.username} onChange={this.changeUsernameHandler}/> {/*event handler called */}
                                    </div>

                                    <div className = "form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First name" name = "firstName" className="form-control"
                                               value={this.state.firstName} onChange={this.changeFirstNameHandler}/> {/*event handler called */}
                                    </div>

                                    <div className = "form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last name" name = "lastName" className="form-control"
                                               value={this.state.lastName} onChange={this.changeLastNameHandler}/> {/*event handler called */}
                                    </div>

                                    <div className = "form-group">
                                        <label> Email: </label>
                                        <input placeholder="email" name = "email" className="form-control"
                                               value={this.state.email} onChange={this.changeEmailHandler}/> {/*event handler called */}
                                    </div>

                                    <div className = "form-group">
                                        <label> Your New Password: </label>
                                        <input placeholder="password" name = "password" className="form-control"
                                               value={this.state.password} onChange={this.changePasswordHandler}/> {/*event handler called */}
                                    </div>

                                    {/*  empty space before buttons */}
                                    <div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>

                                    {/*  Create 2 buttons  */}
                                    <button className="btn btn-success" onClick={this.updateUser}> Update! </button> {/* updateUser() will be called */}
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style = {{marginLeft: "20px"}}> Cancel</button> {/* cancel() will be called */}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default UpdateUserComponent;