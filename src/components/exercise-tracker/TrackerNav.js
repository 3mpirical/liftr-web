import React, { useState } from "react";


const TrackerNav = ({ currentDate, setCurrentDate, selected, setSelected }) => {



    return (
        <div className="tracker-nav">
            <div className="tracker-nav__left">
                <button>Exercises</button>
                <button>Templates</button>
                <button>Charts</button>
            </div>
            <div className="tracker-nav__right">
                <button className="tracker-nav__date" >{  currentDate && currentDate.date }</button>
            </div>
        </div>
    )
};


export default TrackerNav;