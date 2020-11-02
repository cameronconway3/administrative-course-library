import React, {Component} from "react";
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

        context.data.createUser(user)
            .then( response => {
                if(response.length) {
                    this.setState({errors: response})
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then( () => {
                            this.props.history.push('/courses');
                        })
                        .catch( error => {
                            console.error(error);
                            this.props.history.push('/error')
                        })
                }
            })
            .catch( error => {
                console.error(error);
                this.props.history.push('/error');
            }); 
    }

    cancel = () => {
        this.props.history.push("/");
    }

    render() {

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            errors,
        } = this.state;

        return (
            <div class="bounds">
                <div class="grid-33 centered signin">
                <h1>Sign Up</h1>
                <Form
                    cancel = {this.cancel}
                    submit = {this.handleSubmit}
                    submitButtonText = "Sign Up"
                    errors = {errors}
                    details = { () => {
                        <React.Fragment>
        
                                <input id="firstName" name="firstName" type="text" class="" placeholder="First Name" value={firstName} onChange={this.updateFirstName} />
                            
                           
                                <input id="lastName" name="lastName" type="text" class="" placeholder="Last Name" value={lastName} onChange={this.updateLastName} />
                            
                           
                                <input id="emailAddress" name="emailAddress" type="text" class="" placeholder="Email Address" value={emailAddress} onChange={this.updateEmailAddress} />
                            
                           
                                <input id="password" name="password" type="password" class="" placeholder="Password" value={password} onChange={this.updatePassword} />
                            
                           
                                <input id="confirmPassword" name="confirmPassword" type="password" class="" placeholder="Confirm Password" value="" />
                            
                        </React.Fragment>
                    }}
                />
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}

export default UserSignUp;