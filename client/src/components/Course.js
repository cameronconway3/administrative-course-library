import React from 'react';
import { NavLink } from 'react-router-dom';

const Course = props => {
    return (
        <div className="grid-33">
            <NavLink className="course--module course--link" to={`/courses/${props.data.id}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{props.data.title}</h3>
            </NavLink>
        </div>
    )
}

export default Course;