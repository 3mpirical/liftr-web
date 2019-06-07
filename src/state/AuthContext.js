import React from 'react';
import axios from 'axios';


const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = { user: null }

    handleRegister = (user, history) => {
        axios.post("/api/auth", user)
        .then((res) => {
            this.setState({ user: res.data.data });
            history.push("/");
        })
        .catch(console.log)
    }

    handleLogin = (user, history) => {
        axios.post("/api/auth/sign_in", user)
        .then((res) => {
            this.setState({ user: res.data.data });
            history.push("/");
        })
        .catch(console.log)
    }

    handleLogout = (user, history) => {
        axios.delete("/api/auth/sign_out")
        .then((res) => {
            this.setState({ user: null });
            history.push("/login")
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


export { AuthProvider, withAuth };