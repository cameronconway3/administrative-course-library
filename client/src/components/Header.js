import React, {Component} from "react";
import { Link } from 'react-router-dom';

// Header component displayed on each page. Updated when authenticated users sign in and out

class Header extends Component {
    render() {
        const {context} = this.props;
        return (
            <div className="header">
                <div className="bounds">
                    <Link to={'/'} className="header--logo">Courses</Link>
                    <nav>
                        {
                            // If context.authenticatedUser is true display a welcome message and option to sign out.
                            // If context.authenticatedUser is false, display sign up or sign in options
                            context.authenticatedUser
                            ? (
                                <React.Fragment>
                                    <span>Welcome, {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</span>
                                    <Link className="signin" to="/signout">Sign Out</Link>
                                </React.Fragment>
                            )
                            : (
                                <React.Fragment>
                                    <Link className="signup" to="/signup">Sign Up</Link>
                                    <Link className="signin" to="/signin">Sign In</Link>
                                </React.Fragment>
                            )
                        }
                    </nav>
                </div>
          </div>
        )
    }
}

export default Header;