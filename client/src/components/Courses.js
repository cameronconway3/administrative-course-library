import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Course from './Course';

// Render a list of each course and then the option to add a new course
class Courses extends Component {

    state = {
        courses: [],
        authenticatedUser: this.state,
        errors: [],
        loading: true
    }

    componentDidMount() {
        const { context } = this.props;
        context.data.getCourses()
            .then( (courses) => {
                if (courses) {
                    this.setState({ courses });
                }
            })
            .catch( () => this.props.history.push("/error"))
            .finally( () => this.setState({ loading: false }))
    }

    render() {

        const coursesItems = this.state.courses.map( course => <Course data={course} key={course.id.toString()} /> )
        
        return (
            <div className="bounds">
                {
                    this.state.loading
                    ? <div style={{textAlign: "center"}}><h3>Loading...</h3></div>
                    : coursesItems
                }
                <div className="grid-33">
                    <NavLink className="course--module course--add--module" to="/create">
                        <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>New Course</h3>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Courses;