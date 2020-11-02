import React, { Component } from 'react';

class CourseDetail extends Component {

    state = {
        courses: [],
        owner: "",
        authenticatedUser: this.state,
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
            // .catch( error => this.props.history.push("/error"))
            .catch( error => console.log(error))
            .finally(() => this.setState({ loading: false }))
    }


    render() {

        // if(this.state.authenticatedUser && this.state.owner.id === this.state.authenticatedUser.id){
        //     buttons = <span>
        //         <NavLink to={`/courses/${course.id}/update`} className="button">Update Course</NavLink>
        //         <NavLink to={`/courses/${course.id}/delete`} className="button">Delete Course</NavLink></span>
        // }

        const coursesD = (
            // <div>
            //     <div className="actions--bar">
            //         <div className="bounds">
            //             <div className="grid-100">    
            //                 {buttons}
            //                 <a className="button button-secondary" href="/">Return to List</a>
            //             </div>
            //         </div>
            //     </div>
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
            // </div>
        )

        // const coursesD = this.state.courses.map(course => 
        //     // <div>
        //     //     <div className="actions--bar">
        //     //         <div className="bounds">
        //     //             <div className="grid-100">    
        //     //                 {buttons}
        //     //                 <a className="button button-secondary" href="/">Return to List</a>
        //     //             </div>
        //     //         </div>
        //     //     </div>
        //         <div class="bounds course--detail">
        //             <div class="grid-66">
        //                 <div class="course--header">
        //                     <h4 class="course--label">Course</h4>
        //                     <h3 class="course--title">{course.title}</h3>
        //                     <p>By {this.state.owner.firstName} {this.state.owner.lastName}</p>
        //                 </div>
        //                 <div class="course--description">
        //                     <p>{course.description}</p>
        //                 </div>
        //             </div>
        //             <div class="grid-25 grid-right">
        //                 <div class="course--stats">
        //                     <ul class="course--stats--list">
        //                         <li class="course--stats--list--item">
        //                             <h4>Estimated Time</h4>
        //                             <h3>{course.estimatedTime}</h3>
        //                         </li>
        //                         <li class="course--stats--list--item">
        //                             <h4>Materials Needed</h4>
        //                             <ul>
        //                                 {course.materialsNeeded}
        //                             </ul>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     // </div>
        // );

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