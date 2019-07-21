import React, { useContext } from "react";
import { AuthContext } from "../../state/AuthContext";
import { withRouter } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";

const Navbar = ({ history }) => {
    const auth = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar__left">
                { auth.authenticated 
                && <button 
                    className="navbar__button" 
                    onClick={() => auth.handleLogout(history)}>
                    Logout
                  </button>
                }
                { auth.authenticated
                && <button className="navbar__button" >
                    { auth.user.name }
                  </button>
                }
            </div>
            
            <p className="navbar__logo">Liftr</p>

            <div className="navbar__right">
                <button className="navbar__button">
                    Tracker
                </button>
                <button className="navbar__button">
                    Challenges
                </button>
                <button className="navbar__button">
                    Boards
                </button>
                <button className="navbar__icon">
                    <FaCommentDots />
                </button>
            </div>
        </nav>
    )
};

export default withRouter(Navbar);