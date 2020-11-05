/*
Treehouse Techdegree:
FSJS Project 10 - Full Stack App with React and a REST API
*/

import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { Provider } from '../Context';

// Import logic for private routes and routes with context
import withContext from '../Context';
import PrivateRoute from '../PrivateRoute';

// Components
import Header from './Header';

import Courses from './Courses';
import CourseDetail from './CourseDetail';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';

import UserSignIn from './UserSignIn';
import UserSignOut from './UserSignOut';
import UserSignUp from './UserSignUp';

import UnhandledError from './UnhandledError';
import Forbidden from './Forbidden';
import NotFound from './NotFound';

// Components with context
const HeaderWithContext = withContext(Header);

const CoursesWithContext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UserSignUpWithContext = withContext(UserSignUp);

function App() {
    return (
        <Router>
            <Provider>
                <div>
                    <HeaderWithContext />

                    <Switch>
                        <Route exact path="/" component={CoursesWithContext} />
                        {/* Create Course */}
                        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
                        {/* Update Course */}
                        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
                        {/* Course Details */}
                        <Route path="/courses/:id" component={CourseDetailsWithContext} />
                        {/* UserSignIn */}
                        <Route path="/signin" component={UserSignInWithContext} />
                        {/* UserSignOut */}
                        <Route path="/signout" component={UserSignOutWithContext} />
                        {/* UserSignUp */}
                        <Route path="/signup" component={UserSignUpWithContext} />
                        {/* Forbidden */}
                        <Route path="/forbidden" component={Forbidden} />
                        {/* Error */}
                        <Route path="/error" component={UnhandledError} />
                        {/* Not Found */}
                        <Route component={NotFound} />
                    </Switch>

                </div>
            </Provider>
        </Router>
    );
}

export default App;
