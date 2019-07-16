import React from "react";
import { withAuth } from "../../state/AuthContext";
import { Link } from "react-router-dom";


class Register extends React.Component {
    state = {name: "", email: "", password: "", passwordConfirmation: ""}

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        const { name, email, password, passwordConfirmation } = this.state;
        event.preventDefault();
        if(password !== passwordConfirmation) {
            alert("Passwords Do Not Match");
            return null;
        } 

        this.props.handleRegister({name, email, password}, this.props.history);
    }
    
    render() {
        return (
            <div className="register">
                <form className="auth-form" onSubmit={this.handleSubmit} >
                    <h1 className="auth-form__heading">Register</h1>
                    <input 
                        required
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="name"
                    />
                    <input 
                        required
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="email"
                    />
                    <input 
                        required
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="password"
                    />
                    <input 
                        required
                        type="password"
                        name="passwordConfirmation"
                        value={this.state.passwordConfirmation}
                        onChange={this.handleChange}
                        placeholder="password confirmation"
                    />
                    <button>Sign Up</button>
                    <a 
                        className="auth-form__link" 
                        onClick={() => this.props.setPage("sign_up")}>
                        already have a login?
                    </a>
                </form>
            </div>
        )
    }
}

export default withAuth(Register);