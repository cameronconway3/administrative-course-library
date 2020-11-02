import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// No visual elements rendered, it signs out the authenticated user and redirects the user to the default route
class UserSignOut extends Component {

    componentDidMount() {
        const { context } = this.props;
        context.actions.signOut();
    }

    render() {
        
        return (
             <Redirect to="/" />
        );
    }
}

export default UserSignOut;