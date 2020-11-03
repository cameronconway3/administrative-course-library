import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

// Provide the context for the client

export const Context = React.createContext(); 

export class Provider extends Component {

    // Set 'authenticatedUser to 'Cookies.getJSON('authenticatedUser')' is set else to 'null'
    state = { 
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null
    }
    
    constructor() {
        super();
        this.data = new Data();
    }

    render () {
        const { authenticatedUser } = this.state;
        // value created with details of authenticatedUser, api functions and actions (signIn and signOut)
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
            }
        };

        // Pass the value object in the provider to its children
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>  
        );
    }

    // Sign in function, using getUser function in './Data', if user is defined update the authenticatedUser to user that called the sign in function.
    // Set a cookie 'authenticatedUser' that expires in 1 day.
    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
        if (user) {
            user.password = password;
        }
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        }
        return user;
    }

    // Sign out authenticated user by updating the 'authenticatedUser' state to null. Remove the authenticated user cookie.
    signOut = () => {
        this.setState(() => {
            return {
                authenticatedUser: null,
            };
        });
        Cookies.remove('authenticatedUser');
    }
};

export const Consumer = Context.Consumer;
    
// withContext function to provide condext to certain components
export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
             { context => <Component {...props} context={context} /> } 
        </Context.Consumer>
      );
    }
  }
