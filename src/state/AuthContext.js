import React from 'react';
import axios from '../helpers/Axios';


const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = { user: null }

    handleRegister = (user) => {
        return axios.post("/api/auth", user);
    }

    handleLogin = (user) => {
       return axios.post("/api/auth/sign_in", user);
    }

    handleLogout = (history) => {
        axios.delete("/api/auth/sign_out")
        .then((res) => {
            this.setState({ user: null });
            history.push("/home/sign_in")
        })
        .catch(console.log)
    }

    render() {
        return (
            <AuthContext.Provider value={{
                ...this.state,
                authenticated: this.state.user !== null,
                handleRegister: this.handleRegister,
                handleLogin: this.handleLogin,
                handleLogout: this.handleLogout,
                setUser: (user) => this.setState({ user }),
            }} >
                { this.props.children }
            </AuthContext.Provider>
        )
    }
}

const withAuth = (Component) => {
    return (props) => (
        <AuthContext.Consumer>
            {(value) => <Component {...props} {...value} />}
        </AuthContext.Consumer>
    )
}


export { AuthProvider, withAuth, AuthContext };