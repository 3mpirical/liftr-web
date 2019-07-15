import React, { useContext } from "react";
import { AuthContext } from "../../state/AuthContext";
import { withRouter } from "react-router-dom";

const Navbar = ({ history }) => {
    const auth = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar__left">

            </div>

            <div className="navbar__right">
                { auth.authenticated 
                ? <button 
                    className="navbar__button" 
                    onClick={() => auth.handleLogout(history)}>
                    Logout
                  </button>
                : null 
                }
            </div>
        </nav>
    )
};

export default withRouter(Navbar);