import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

class CourseDetail extends Component {

    state = {
        courses: [],
        owner: "",
        errors: [],
        loading: true
    }

    // When component mounts get the specific course by id (which is provided in the url params).
    // Once the data returned by the api call has been loaded set 'loading' to false.
    componentDidMount() {
        const { context } = this.props;
        context.data.getCoursesById(this.props.match.params.id)
            .then((courses) => {
                if (courses) {
                    this.setState({ 
                        courses: courses,
                        owner: courses.User
                    });
                } else {
                    // Redirect to /notfound if no course returned
                    this.props.history.push("/notfound")
                }
            })
            .catch( () => this.props.history.push("/error"))
            .finally(() => this.setState({ loading: false }))
    }

    // Delete course function, called from the button (only displayed to owner of the course)
    deleteCourse = () => {
        const { context } = this.props;
        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;
        const id = this.props.match.params.id;

        context.data.deleteCourse(id, emailAddress, password)
            .then( () => {
                this.props.history.push("/")
            })
            .catch( error => {
                console.log(error)
                this.setState({ errors: error})
                this.props.history.push("/error")
            })
    }

    render() {

        const { context } = this.props;
        let buttons;

        // If user is authenticated and the owner of the course id is equal to the owner id, then add the 'Update Course' and 'Delete Course' buttons to the JSX
        if(context.authenticatedUser) {
            if(this.state.owner.id === context.authenticatedUser.id){
                buttons = <span>
                    <NavLink to={`/courses/${this.state.courses.id}/update`} className="button">Update Course</NavLink>
                    <button onClick={this.deleteCourse} className="button">Delete Course</button>
                </span>
            }
        }

        // Build the course detail JSX
        const coursesD = (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">    
                            {
                                buttons
                            }
                            <a className="button button-secondary" href="/">Return to List</a>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{this.state.courses.title}</h3>
                            <p>By {this.state.owner.firstName} {this.state.owner.lastName}</p>
                        </div>
                        <div className="course--description">
                            <p><ReactMarkdown source={this.state.courses.description} /></p>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.courses.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <ReactMarkdown source={this.state.courses.materialsNeeded} />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )

        // If the loading state is true display 'Loading...', else return the course detail
        return (
            <div>
                {
                    this.state.loading
                    ? <div style={{textAlign: "center"}}><h3>Loading...</h3></div>
                    : coursesD
                }
            </div>
        )
    }
}

export default CourseDetail;