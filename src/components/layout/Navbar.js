import React, { useContext } from "react";
import { AuthContext } from "../../state/AuthContext";
import { withRouter } from "react-router-dom";

const Navbar = ({ history }) => {
    const auth = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar__left">
                { auth.authenticated 
                ? <button 
                    className="navbar__button" 
                    onClick={() => auth.handleLogout(history)}>
                    Logout
                  </button>
                : null 
                }
                { auth.authenticated 
                ? <button className="navbar__button" >
                    Settings
                  </button>
                : null 
                }
            </div>
            
            <p className="navbar__logo">Liftr</p>

            <div className="navbar__right">
                <button className="navbar__button">
                    Tracker
                </button>
                <button className="navbar__button">
                    Boards
                </button>
                <button className="navbar__button">
                    Messages
                </button>
                <button className="navbar__button">
                    Challenges
                </button>
            </div>
        </nav>
    )
};

export default withRouter(Navbar);