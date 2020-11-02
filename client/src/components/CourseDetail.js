import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class CourseDetail extends Component {

    state = {
        courses: [],
        owner: "",
        // authenticatedUser: this.state,
        errors: [],
        loading: true
    }

    componentDidMount() {
        const { context } = this.props;
        context.data.getCoursesById(this.props.match.params.id)
            .then((courses) => {
                if (courses) {
                    this.setState({ 
                        courses: courses,
                        owner: courses.User
                    });
                }
            })
            .catch( () => this.props.history.push("/error"))
            .finally(() => this.setState({ loading: false }))
    }

    deleteCourse = () => {
        const { context } = this.props;
        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;
        const id = this.props.match.params.id;

        context.data.deleteCourse(id, emailAddress, password)
            .then( response => {
                console.log(response)
                this.props.history.push("/")
            })
            .catch( error => {
                console.log("course delete")
                console.log(error)
                this.setState({ errors: error})
                this.props.history.push("/error")
            })
    }

    render() {

        const { context } = this.props;
        let buttons;

        if(context.authenticatedUser) {
            if(this.state.owner.id === context.authenticatedUser.id){
                buttons = <span>
                    <NavLink to={`/courses/${this.state.courses.id}/update`} className="button">Update Course</NavLink>
                    <button onClick={this.deleteCourse} className="button">Delete Course</button>
                </span>
            }
        }

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
                <div class="bounds course--detail">
                    <div class="grid-66">
                        <div class="course--header">
                            <h4 class="course--label">Course</h4>
                            <h3 class="course--title">{this.state.courses.title}</h3>
                            <p>By {this.state.owner.firstName} {this.state.owner.lastName}</p>
                        </div>
                        <div class="course--description">
                            <p>{this.state.courses.description}</p>
                        </div>
                    </div>
                    <div class="grid-25 grid-right">
                        <div class="course--stats">
                            <ul class="course--stats--list">
                                <li class="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.courses.estimatedTime}</h3>
                                </li>
                                <li class="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {this.state.courses.materialsNeeded}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )

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