import React, { useContext } from 'react';
import { 
    Route, 
    Redirect 
} from 'react-router-dom';
import { Context } from './Context';

// Private route can only be accessed by specific authenticated users

const PrivateRoute = ({ component: Component, ...rest }) => {
    // Get the authenticated user
    const { authenticatedUser } = useContext(Context);
  
    // If user is not authenticated then they are redirected to '/signin'
    return (
        <Route
            {...rest}
            render={props => authenticatedUser 
                ? ( <Component {...props} />) 
                : ( <Redirect to={{pathname: '/signin', state: { from: props.location }}} />
            )
            }
        />
    );
};

export default PrivateRoute;