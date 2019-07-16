import React from "react";


const HomeButton = ({ text, setPage, selectedPage, buttonPage }) => {

    return (
        <button 
            className="home__button"
            onClick={() => setPage(buttonPage)}
            style={selectedPage === buttonPage
                ? { backgroundColor: "#303F9F" }
                : null
            }>
            { text }
        </button>
    )
};


export default HomeButton;