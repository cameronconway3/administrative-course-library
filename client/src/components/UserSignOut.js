import React from 'react';
import { Redirect } from 'react-router-dom';

// No visual elements rendered, it signs out the authenticated user and redirects the user to the default route
const UserSignOut = props => {
    const { context } = props;
    context.actions.signOut();
    return (
         <Redirect to="/" />
    );
}

export default UserSignOut;