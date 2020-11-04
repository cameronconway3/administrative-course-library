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

    // Use the function 'getCourses' provided in the context via the Data file. Update the 'courses' state with the fetched courses.
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

        // Build each course item with the 'Course' component by mapping each item in the array of courses in 'this.state.courses'
        // Store a string version of the course.id into the kay value (React logs an error if a key is not provided in looped components)
        const coursesItems = this.state.courses.map( course => <Course data={course} key={course.id.toString()} /> )
        
        // If this.state.loading is true, display 'Loading...', else display 'courseItems'
        return (
            <div className="bounds">
                {
                    this.state.loading
                    ? <div style={{textAlign: "center"}}><h3>Loading...</h3></div>
                    : coursesItems
                }
                {/* JSX for 'New Course' button */}
                <div className="grid-33">
                    <NavLink className="course--module course--add--module" to="/create">
                        <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>New Course</h3>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Courses;