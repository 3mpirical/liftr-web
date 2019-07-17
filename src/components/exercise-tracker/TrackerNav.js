import React, { useState } from "react";


const TrackerNav = ({ currentDate, setCurrentDate, selected, setSelected }) => {



    return (
        <div className="tracker-nav">
            <div className="tracker-nav__left">
                <button 
                    onClick={() => setSelected("exercises")} 
                    style={ selected === "exercises" ? style.button : null } >
                    Exercises
                </button>

                <button 
                    onClick={() => setSelected("templates")} 
                    style={ selected === "templates" ? style.button : null } >
                    Templates
                </button>

                <button 
                    onClick={() => setSelected("charts")} 
                    style={ selected === "charts" ? style.button : null } >
                    Charts
                </button>
            </div>
            <div className="tracker-nav__right">
                <button className="tracker-nav__date" >{  currentDate && currentDate.date }</button>
            </div>
        </div>
    )
};

const style = {
    button: {
        backgroundColor: "#CFD8DC",
        color: "#11171a",
    }
}


export default TrackerNav;