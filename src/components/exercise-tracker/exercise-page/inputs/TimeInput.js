import React from "react";


const TimeInput = ({ 
    hours, 
    minutes, 
    seconds, 
    handleHoursChange, 
    handleMinutesChange, 
    handleSecondsChange }) => {

    return (
        <>
            <input 
                type="number" 
                className="rep-scheme__weight"
                value={hours !== null? hours : ""}
                name="hours"
                onChange={handleHoursChange}
                placeholder="HH"
            />
            :
            <input 
                type="number" 
                className="rep-scheme__weight"
                value={minutes !== null? minutes : ""}
                name="minute"
                onChange={handleMinutesChange}
                placeholder="MM"
            />
            :
            <input 
                type="number" 
                className="rep-scheme__weight"
                value={seconds !== null? seconds : ""}
                name="second"
                onChange={handleSecondsChange}
                placeholder="SS"
            />
        </>
    )
};


export default TimeInput;