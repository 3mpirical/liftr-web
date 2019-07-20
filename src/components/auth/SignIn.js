import React from "react";
import { withAuth } from "../../state/AuthContext";
import { withModal } from "../../state/ModalContext";


class SignIn extends React.Component {
    state = { email: "", password: ""}

    componentDidMount() {
        document.querySelector(".auth-form__first-input").focus();
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        const { handleLogin, setUser } = this.props;
        event.preventDefault();
        handleLogin(this.state)
        .then((res) => {
            setUser(res.data);
            this.props.history.push("/");
        })
        .catch((err) => {
            if(err.message === "Request failed with status code 401") {
                this.props.openDefaultBlackModal(() => (
                    <div style={{fontSize: "3rem"}}>Invalid Username or Password</div>
                ));
            } else if( err.message === "Request failed with status code 500" ) {
                this.props.openDefaultBlackModal(() => (
                    <div style={{fontSize: "3rem"}}>Request Could Not Reach Server</div>
                ));
            }
            console.log(err);
        });
    }
    
    render() {
        return (
            <div className="signin">
                <form className="auth-form" onSubmit={this.handleSubmit} >
                    <h1 className="auth-form__heading">Login</h1>
                    <input
                        className="auth-form__first-input" 
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

export default withAuth(withModal(SignIn));