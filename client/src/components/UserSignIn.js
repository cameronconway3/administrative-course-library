import React, { Component } from "react";
import Form from './Form';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {

    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    updateEmailAddress = e => {
        this.setState({ emailAddress: e.target.value })
    }

    updatePassword = e => {
        this.setState({ password: e.target.value })
    }

    handleSubmit = () => {
        const { context } = this.props;
        const {
            emailAddress,
            password,
        } = this.state;

        context.actions.signIn(emailAddress, password)
            .then( response => {
                if(response == null) {
                    this.setState( () => {
                        // Return the error as an array so is in the correct format when sent to the Form component
                        return {errors: ['User was not found. SignIn is not successfull']}
                    })
                } else {
                    this.props.history.push("/");
                }
            })
            .catch( error => {
                console.error(error);
                this.props.history.push('/error')
            });
    }

    cancel = () => {
        this.props.history.push("/");
    }

    render() {

        const {
            emailAddress,
            password,
            errors,
        } = this.state;


        return (
            <div class="bounds">
                <div class="grid-33 centered signin">
                <h1>Sign In</h1>
                <Form 
                    cancel = {this.cancel}
                    submit = {this.handleSubmit}
                    submitButtonText = "Sign In"
                    errors = {errors}
                    details = { () => (
                        <React.Fragment>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" class="" placeholder="Email Address" value={emailAddress} onChange={this.updateEmailAddress} />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" class="" placeholder="Password" value={password} onChange={this.updatePassword}/>
                            </div>
                        </React.Fragment>
                    )}
                />
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
}

export default UserSignIn;