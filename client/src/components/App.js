import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { Provider } from '../Context';

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



const HeaderWithContext = withContext(Header);

// import DeleteCourse from './DeleteCourse';
const CoursesWithContext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
// const DeleteCourseWithContext = withContext(DeleteCourse);

const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UserSignUpWithContext = withContext(UserSignUp);

function App() {
    return (
        <Router>
            {/* Remove provider */}
            <Provider>
                <div>
                    <HeaderWithContext />

                    <Switch>
                        <Route exact path="/" component={CoursesWithContext} />
                        {/* Course Details */}
                        <Route path="/courses/:id" component={CourseDetailsWithContext} />
                        {/* Create Course */}
                        <PrivateRoute path="/create" component={CreateCourseWithContext} />
                        {/* Update Course */}
                        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
                        {/* Delete Course */}
                        {/* <Route path="/courses/:id/delete" component={DeleteCourseWithContext} /> */}
                        {/* UserSignIn */}
                        <Route path="/signin" component={UserSignInWithContext} />
                        {/* UserSignOut */}
                        <Route path="/signout" component={UserSignOutWithContext} />
                        {/* UserSignUp */}
                        <Route path="/signup" component={UserSignUpWithContext} />
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
