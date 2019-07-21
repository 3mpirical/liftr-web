import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { FaBars } from "react-icons/fa";


const TrackerNav = ({ currentDate, changeCurrentDate, selected, setSelected, datesArray }) => {

    return (
        <div className="tracker-nav">
            <div className="tracker-nav__left">
                <button 
                    onClick={() => setSelected("exercises")} 
                    style={ selected === "exercises" ? style.button : null } >
                    Exercises
                    <FaRunning className="tracker-nav__button-icon" />
                </button>

                <button 
                    onClick={() => setSelected("templates")} 
                    style={ selected === "templates" ? style.button : null } >
                    Routines
                    <FaBars className="tracker-nav__button-icon" />
                </button>

                <button 
                    onClick={() => setSelected("charts")} 
                    style={ selected === "charts" ? style.button : null } >
                    Charts
                    <FaChartLine className="tracker-nav__button-icon" />
                </button>
            </div>
            <div className="tracker-nav__right">
                <FaAngleLeft 
                    className="tracker-nav__angle"
                />
                { currentDate &&
                    <DatePicker 
                        className="tracker-nav__date"
                        selected={new Date(currentDate.date + " 00:00")}
                        onChange={changeCurrentDate}
                        dateFormat="MM-dd-yy"
                        highlightDates={datesArray.map((date) => new Date(date + " 00:00"))}
                    /> 
                }
                <FaAngleRight 
                    className="tracker-nav__angle"
                />
            </div>
        </div>
    )
};

const style = {
    button: {
        backgroundColor: "#303F9F",
    }
}


export default TrackerNav;