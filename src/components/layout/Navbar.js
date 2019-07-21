import React, { useContext } from "react";
import { AuthContext } from "../../state/AuthContext";
import { withRouter } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaColumns } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";


const Navbar = ({ history }) => {
    const auth = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar__left">
                { auth.authenticated 
                && <button 
                    className="navbar__button-left" 
                    onClick={() => auth.handleLogout(history)}>
                    Logout
                  </button>
                }
                { auth.authenticated
                && <button className="navbar__button-left" >
                    { auth.user.name }
                  </button>
                }
            </div>
            
            <p className="navbar__logo">Liftr</p>

            <div className="navbar__right">
                <button className="navbar__button-right">
                    Tracker
                    <FaProjectDiagram className="navbar__button-icon" />
                </button>
                <button className="navbar__button-right">
                    Challenges
                    <FaBolt className="navbar__button-icon" />
                </button>
                <button className="navbar__button-right">
                    Boards
                    <FaColumns className="navbar__button-icon" />
                </button>
                <button className="navbar__button-right">
                    <FaCommentDots className="navbar__message-icon" />
                </button>
            </div>
        </nav>
    )
};

export default withRouter(Navbar);