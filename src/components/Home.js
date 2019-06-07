import React from "react";
import { withAuth } from "../state/AuthContext";

const Home = (props) => {
    return (
        <div className="home">
            <h1>welcome to the home page</h1>
        </div>
    )
}

export default withAuth(Home);