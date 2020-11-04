import React, { Component } from 'react';
import Form from './Form';

class UpdateCourse extends Component {

    // Provide all relevant state needed to update a course
    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: [],
        userId: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        courseId: ""
    }

    // Update the user states with information provided from the authenticatedUser
    componentDidMount() {
        const { context } = this.props;
        this.setState({
            userId: context.authenticatedUser.id,
            firstName : context.authenticatedUser.firstName,
            lastName: context.authenticatedUser.lastName,
            emailAddress: context.authenticatedUser.emailAddress,
            password: context.authenticatedUser.password,
        })

        // Get the details of the current course
        context.data.getCoursesById(this.props.match.params.id)
            .then(response => {
                if(response) {
                    this.setState({
                        courseId: this.props.match.params.id,
                        title: response.title,
                        description: response.description,
                        estimatedTime: response.estimatedTime,
                        materialsNeeded: response.materialsNeeded,
                    })
                    // If authenticated user doesnt own the course, redirect them to '/Forbidden'
                    if(parseInt(this.state.courseId) !== context.authenticatedUser.id) {
                        this.props.history.push("/forbidden")
                    }
                } else {
                    // Redirect to /notfound if no course returned
                    this.props.history.push("/notfound")
                }
            })
            .catch( error => console.error(error) );
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
        
        // Handle submit of update course form, provide all relavent information to update a course
        handleSubmit = () => {
            const { context } = this.props;
            const { 
                title, 
                description, 
                estimatedTime, 
                materialsNeeded, 
                userId, 
                emailAddress, 
                password,
                courseId,
            } = this.state;
            
            const updatedCourse = {
                title,
                description,
                estimatedTime,
                materialsNeeded,
                userId,
            }
            
            // Call updateCourse function on specific course (courseId) with 'updatedCourse' object and pass the credentials to link the new course to a specific user
            context.data.updateCourse(courseId ,updatedCourse, emailAddress, password)
            .then( response => {
                if(response.length) {
                    // Update the error status with the reponse as an array item 
                    this.setState({errors: [response]})
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

        // Render the Update Course JSX using the Form component
        return (
            <div class="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Form
                        cancel = {this.cancel}
                        submit = {this.handleSubmit}
                        submitButtonText = "Update Course"
                        errors = {errors}
                        details = { () => (
                            <React.Fragment>
                                <div class="grid-66">
                                    <div class="course--header">
                                        <h4 class="course--label">Course</h4>
                                        <div>
                                            <input id="title" name="title" type="text" class="input-title course--title--input" placeholder="Course title..." value="Build a Basic Bookcase" value={title} onChange={this.updateTitle} />
                                        </div>
                                        <p>By {firstName} {lastName}</p>
                                    </div>
                                    <div class="course--description">
                                        <div><textarea id="description" name="description" class="" placeholder="Course description..." value={description} onChange={this.updateDescription} ></textarea></div>
                                    </div>
                                </div>
                                <div class="grid-25 grid-right">
                                    <div class="course--stats">
                                        <ul class="course--stats--list">
                                            <li class="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <input id="estimatedTime" name="estimatedTime" type="text" class="course--time--input" placeholder="Hours" value={estimatedTime} onChange={this.updateEstimatedTime} />
                                                </div>
                                            </li>
                                            <li class="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea id="materialsNeeded" name="materialsNeeded" class="" placeholder="List materials..." value={materialsNeeded} onChange={this.updateMaterialsNeeded} ></textarea>
                                                </div>
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

export default UpdateCourse;
