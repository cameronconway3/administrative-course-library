import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { Provider } from '../Context';

import Header from './Header';

import Courses from './Courses';
import CourseDetail from './CourseDetail';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';

import UserSignIn from './UserSignIn';
import UserSignOut from './UserSignOut';
import UserSignUp from './UserSignUp';


import PrivateRoute from '../PrivateRoute';

import withContext from '../Context';

const CoursesWithContext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);


function App() {
    return (
        <Router>
            <Provider>
                <div>
                    <Header />

                    <Switch>
                        <Route exact path="/" component={CoursesWithContext} />
                        {/* Course Details */}
                        <Route path="/courses/:id" component={CourseDetailsWithContext} />
                        {/* Create Course */}
                        <PrivateRoute path="/create" component={CreateCourseWithContext} />
                        {/* Update Course */}
                        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
                        {/* UserSignIn */}
                        <Route path="/signin" component={UserSignIn} />
                        {/* UserSignUp */}
                        <Route path="/signup" component={UserSignUp} />
                        {/* UserSignOut */}
                        <Route path="/signout" component={UserSignOut} />
                        {/* Forbidden */}
                        {/* <Route path="/forbidden" component={} /> */}
                        {/* Error */}
                        {/* <Route path="/error" component={} /> */}
                        {/* Not Found */}
                        {/* <Route component={} /> */}
                    </Switch>

                </div>
            </Provider>
        </Router>
    );
}

export default App;
