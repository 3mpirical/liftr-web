import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const TrackerNav = ({ currentDate, setCurrentDate, selected, setSelected }) => {

    const handleDateChange = (datePicked) => {
        let newDate = {... currentDate};
        newDate.date = moment(datePicked).format("MM-DD-YY");
        console.log(newDate)
        setCurrentDate(newDate)
    }


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
                { currentDate &&
                    <DatePicker 
                        className="tracker-nav__date"
                        selected={new Date(currentDate.date)}
                        onChange={handleDateChange}
                        dateFormat="MM-dd-yy"
                    /> 
                }
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