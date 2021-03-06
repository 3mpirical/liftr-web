import React, { useState } from "react";
import SignIn from "../auth/SignIn";
import Register from "../auth/Register";
import HomeButton from "./HomeButton";

const Home = ({ match, history }) => {

    const [page, setPage] = useState(() => match.params.page);

    const renderPage = () => {
        let pages = {
            sign_in: <SignIn setPage={setPage} history={history} />,
            register: <Register setPage={setPage} history={history} />,
        };
        if(pages[page]) return pages[page];
        else return pages["sign_in"];
    }

    return (
        <div className="home">
            <div className="home__navigation">
                <div className="home__logo-container">
                    <h2 className="home__logo" >Liftr</h2>
                </div>
                <HomeButton 
                    text="Sign In" 
                    setPage={setPage} 
                    selectedPage={page} 
                    buttonPage="sign_in" 
                />
                <HomeButton 
                    text="Register" 
                    setPage={setPage} 
                    selectedPage={page} 
                    buttonPage="register" 
                />
                <HomeButton 
                    text="About Us" 
                    setPage={setPage} 
                    selectedPage={page} 
                    buttonPage="about_us" 
                />
                <HomeButton 
                    text="Contact" 
                    setPage={setPage} 
                    selectedPage={page} 
                    buttonPage="contact" 
                />
            </div>
            <div className="home__page-container">
                { renderPage() }
            </div>
            <a 
                className="home__picture-credit" 
                href="https://unsplash.com/@juliacaesar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
            > photo by julia ceaser </a>
        </div>
    )
}

export default Home;