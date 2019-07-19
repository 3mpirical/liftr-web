import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const TrackerNav = ({ currentDate, changeCurrentDate, selected, setSelected }) => {

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
                        selected={new Date(currentDate.date + " 00:00")}
                        onChange={changeCurrentDate}
                        dateFormat="MM-dd-yy"
                        // highlightDates={[
                        //     // dates goes here,
                        // ]}
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