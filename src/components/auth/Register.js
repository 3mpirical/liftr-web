import React from "react";
import { withAuth } from "../../state/AuthContext";
import { withModal } from "../../state/ModalContext";


class Register extends React.Component {
    state = {name: "", email: "", password: "", passwordConfirmation: ""}

    componentDidMount() {
        document.querySelector(".auth-form__first-input").focus();
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        const { name, email, password, passwordConfirmation } = this.state;
        const { history, setUser, openDefaultBlackModal } = this.props;
        event.preventDefault();
        if(password !== passwordConfirmation) {
            return this.props.openDefaultBlackModal(() =>(
                <p style={{fontSize: "3rem"}}>Passwords Do Not Match</p>   
            ));
        } 

        this.props.handleRegister({name, email, password})
        .then((res) => {
            this.setState({ user: res.data.data });
            history.push("/");
        })
        .catch((err) => {
            if(err.message === "Request failed with status code 422") {
                this.props.openDefaultBlackModal(() => (
                    <>
                        <p style={{fontSize: "3rem"}}>Invalid Email</p>
                    </>
                ));
            } else if( err.message === "Request failed with status code 500" ) {
                this.props.openDefaultBlackModal(() => (
                    <p style={{fontSize: "3rem"}}>Request Could Not Reach Server</p>
                ));
            }

            console.log(err);
        })
    }
    
    render() {
        return (
            <div className="register">
                <form className="auth-form" onSubmit={this.handleSubmit} >
                    <h1 className="auth-form__heading">Register</h1>
                    <input 
                        className="auth-form__first-input" 
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
                        onClick={() => this.props.setPage("sign_in")}>
                        already have a login?
                    </a>
                </form>
            </div>
        )
    }
}

export default withAuth(withModal(Register));