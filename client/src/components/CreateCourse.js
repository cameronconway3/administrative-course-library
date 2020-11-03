import React, { Component } from 'react';
import Form from './Form';

// Create a new course

class CreateCourse extends Component {

    // All state necessary to create a course
    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: [],
        userId: "",
        firstName:"",
        lastName:"",
        emailAddress:"",
        password:"",
    }

    // Wen component mounts get and update the state with relative information about the authenticatedUser, this will be used to link the created course to a specific user
    componentDidMount() {
        const { context } = this.props;
        this.setState({
            userId: context.authenticatedUser.id,
            firstName : context.authenticatedUser.firstName,
            lastName: context.authenticatedUser.lastName,
            emailAddress: context.authenticatedUser.emailAddress,
            password: context.authenticatedUser.password,
        })
    }

    // For each field in the create course form, when a value is changed update the relative state variable
    updateTitle = e => {
        this.setState({ title: e.target.value  })
    }

    updateDescription = e => {
        this.setState({ description: e.target.value  })
    }

    updateEstimatedTime = e => {
        this.setState({ estimatedTime: e.target.value  })
    }

    updateMaterialsNeeded = e => {
        this.setState({ materialsNeeded: e.target.value  })
    }

    // Handle submit of create course form, provide all relavent information to create a new course
    handleSubmit = () => {
        const { context } = this.props;
        const { 
            title, 
            description, 
            estimatedTime, 
            materialsNeeded, 
            userId, 
            emailAddress, 
            password 
        } = this.state;

        const newCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
        }
    
        // Call createCourse function with 'newCourse' object and pass the credentials to link the new course to a specific user
        context.data.createCourse(newCourse, emailAddress, password)
            .then( response => {
                if(response.length) {
                    this.setState({errors: response})
                } else {
                    this.props.history.push("/");
                }
            })
            .catch( error => console.error(error) );
    }

    // If user presses the cancel button on the form, take then to "/"
    cancel = () => {
        this.props.history.push("/");
    }
    
    render() {

        // Get all the relevant variables from this.state
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            firstName,
            lastName,
            errors,
        } = this.state;

        // Render the Create Course JSX using the Form component
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <Form 
                        cancel = {this.cancel}
                        submit = {this.handleSubmit}
                        submitButtonText = "Create Course"
                        errors = {errors}
                        details = { () => (
                            <React.Fragment>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} onChange={this.updateTitle} />
                                        </div>
                                        <p>By {firstName} {lastName}</p>
                                    </div>
                                    <div className="course--description">
                                        <div><textarea id="description" name="description" type="text" className="" placeholder="Course description..." value={description} onChange={this.updateDescription}></textarea></div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={estimatedTime} onChange={this.updateEstimatedTime}/>
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded} onChange={this.updateMaterialsNeeded}></textarea></div>
                                        </li>
                                        </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    />
                </div>
            </div>
        ) 
    }
}

export default CreateCourse;