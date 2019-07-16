import React from "react";
import { Link } from "react-router-dom"; 
import { withAuth } from "../../state/AuthContext";


class SignIn extends React.Component {
    state = { email: "", password: ""}

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleLogin(this.state, this.props.history);
    }
    
    render() {
        return (
            <div className="signin">
                <form className="auth-form" onSubmit={this.handleSubmit} >
                    <h1 className="auth-form__heading">Login</h1>
                    <input 
                        required
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Email"
                    />
                    <input 
                        required
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Password"
                    />
                    <button>Confirm</button>
                    <a 
                        className="auth-form__link" 
                        onClick={() => this.props.setPage("register")}>
                        want to sign up?
                    </a>
                </form>
            </div>
        )
    }
}

export default withAuth(SignIn);