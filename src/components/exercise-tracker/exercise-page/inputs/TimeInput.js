import React from "react";


const TimeInput = ({ 
    hours, 
    minutes, 
    seconds, 
    handleHoursChange, 
    handleMinutesChange, 
    handleSecondsChange }) => {

    return (
        <div className="rep-scheme__time-input-container" >
            <input 
                type="number" 
                className="rep-scheme__time"
                value={hours !== null? hours : ""}
                name="hours"
                onChange={handleHoursChange}
                placeholder="HH"
            />
            :
            <input 
                type="number" 
                className="rep-scheme__time"
                value={minutes !== null? minutes : ""}
                name="minute"
                onChange={handleMinutesChange}
                placeholder="MM"
            />
            :
            <input 
                type="number" 
                className="rep-scheme__time"
                value={seconds !== null? seconds : ""}
                name="second"
                onChange={handleSecondsChange}
                placeholder="SS"
            />
        </div>
    )
};


export default TimeInput;