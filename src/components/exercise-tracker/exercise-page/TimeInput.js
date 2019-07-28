import React from "react";


const TimeInput = ({ 
    hour, 
    minute, 
    second, 
    handleHourChange, 
    handleMinuteChange, 
    handleSecondChange }) => {
        
    return (
        <input 
            type="number" 
            className="rep-scheme__weight"
            value={hour !== null? hour : ""}
            name="hour"
            onChange={handleHourChange}
            placeholder="HH"
        />
        <input 
            type="number" 
            className="rep-scheme__weight"
            value={minute !== null? minute : ""}
            name="minute"
            onChange={handleMinuteChange}
            placeholder="MM"
        />
        <input 
            type="number" 
            className="rep-scheme__weight"
            value={second !== null? second : ""}
            name="second"
            onChange={handleSecondChange}
            placeholder="SS"
        />
    )
};


export default TimeInput;