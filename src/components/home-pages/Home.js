import React, { useState } from "react";
import SignIn from "../auth/SignIn";
import Register from "../auth/Register";

const Home = ({ match }) => {

    const [page, setPage] = useState(() => match.params.page);

    const renderPage = () => {
        let pages = {
            sign_in: <SignIn setPage={setPage} />,
            register: <Register setPage={setPage} />,
        };
        if(pages[page]) return pages[page];
        else return pages["sign_in"];
    }

    return (
        <div className="home">
            <div className="home__navigation">

            </div>
            <div className="home__page-container">
                { renderPage() }
            </div>
        </div>
    )
}

export default Home;