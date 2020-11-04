import React, { Component } from "react";
import Form from "./Form";
import { Link } from 'react-router-dom';

class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        errors: [],
    }

    // For each field in the sign up form, when a value is changed update the relative state variable
    updateFirstName = e => {
        this.setState({ firstName: e.target.value })
    }

    updateLastName = e => {
        this.setState({ lastName: e.target.value })
    }

    updateEmailAddress = e => {
        this.setState({ emailAddress: e.target.value })
    }

    updatePassword = e => {
        this.setState({ password: e.target.value })
    }

    // Handle submit of sign in form, provide all relavent information to sign up
    handleSubmit = () => {
        const { context } = this.props;
        const {
            firstName,
            lastName,
            emailAddress,
            password,
        } = this.state;

        // Create user object
        const user = {
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            password: password,
        }

        // Create user, if any responses are provided they will be errors, update this.state.errors 
        context.data.createUser(user)
            .then( response => {
                console.log(response)
                if(response.length) {
                    this.setState({errors: response})
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then( () => {
                            this.props.history.push('/');
                        })
                        .catch( error => {
                            console.error(error);
                            this.props.history.push('/error')
                        })
                }
            })
            .catch( error => {
                console.log("errrrror")
                console.log(error)
                this.props.history.push('/error');
            }); 
    }

    // If user presses the cancel button on the form, take then to "/"
    cancel = () => {
        this.props.history.push("/");
    }

    render() {

        // Get all the relevant variables from this.state
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            errors,
        } = this.state;

        // Render the Sign Up JSX using the Form component
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <Form
                    cancel = {this.cancel}
                    submit = {this.handleSubmit}
                    submitButtonText = "Sign Up"
                    errors = {errors}
                    details = { () => (
                        <React.Fragment>
                            <div>
                                <input id="firstName" name="firstName" type="text" placeholder="First Name" value={firstName} onChange={this.updateFirstName} />
                            </div>
                            <div>
                                <input id="lastName" name="lastName" type="text" placeholder="Last Name" value={lastName} onChange={this.updateLastName} />
                            </div>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" value={emailAddress} onChange={this.updateEmailAddress} />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" placeholder="Password" value={password} onChange={this.updatePassword} />
                            </div>
                        </React.Fragment>
                    )}
                />
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}

export default UserSignUp;