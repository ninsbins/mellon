import React, {Component} from 'react';
import UserServiceTesting from "../services/UserServiceTesting";
import Header from "../components/Header";
import '../styles/UpdateUserComponent.css';
import Gandalf from '../Gandalf-cute.png'

//This component is for updating User details.
//Called when '/update-password/:id'
class UpdateUserPassword extends Component {

    constructor(props) {
        super(props)

        //attributes are set and stored here from the form input fields
        this.state = {
            id: this.props.match.params.id, //this gets the ID passed in from url/route
            password: ''
        }

        console.log("The User ID you entered in the routing = " + this.state.id);

        //Also need to bind the event handler, for input fields and buttons
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.updateUser = this.updateUser.bind(this); //when Update button is clicked
    }


    //When Update button is clicked
    updateUser = (e) => {
        e.preventDefault(); //It prevents a submit button from submitting a form
        let user = {
            password: this.state.password
        };

        console.log('User! => ' + JSON.stringify(user))

        //using the Service class PUT api method
        UserServiceTesting.updateUsersPassword(user, this.state.id).then( res => {
            alert("Password update has been successful - Redirecting..."); //confirm with User
            this.props.history.push('/'); //after updated redirect to the Main page
        });
    }

    //When Cancel button is clicked
    cancel() {
        this.props.history.push('/settings'); //route back to Home page if Cancel button has been selected
    }

    //SETTING THE PROPERTY below:
    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="spacer">
                    &nbsp;
                </div>

                <div className= "container-body">
                    <div className= "row">
                        <div className = "rounded-card col-md-6 offset-md-3 offset-md-3 "> {/* column width -give space from left margin*/}
                            <h2 className="text-center"> Update User</h2>

                            {/*  insert centered image */}
                            <div className="gandalf">
                                <img src={Gandalf} alt="Gandalf cute" height={80} width={80} />
                            </div>

                            <div className="card-body">

                                {/*  empty space before buttons */}
                                <div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>

                                <form>
                                    <div className = "form-group">
                                        <label> Your New Password: </label>
                                        <input placeholder="password" name = "password" className="form-control"
                                               value={this.state.password} onChange={this.changePasswordHandler}/> {/*event handler called */}
                                    </div>

                                    {/*  empty space before buttons */}
                                    <div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>

                                    {/*  Create 2 buttons  */}
                                    <button className="btn btn-outline-success" onClick={this.updateUser}> Update </button> {/* updateUser() will be called */}
                                    <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style = {{marginLeft: "20px"}}> Cancel</button> {/* cancel() will be called */}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default UpdateUserPassword;