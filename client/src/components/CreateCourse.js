import React, { Component } from 'react';
import Form from './Form';

class CreateCourse extends Component {

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

    // May need to be changed
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

    handleSubmit = e => {
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

    cancel = () => {
        this.props.history.push("/");
    }
    
    render() {

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            firstName,
            lastName,
            errors,
        } = this.state;

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