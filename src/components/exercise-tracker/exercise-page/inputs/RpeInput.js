import React from "react";


const RpeInput = ({ rpe, handleRpeChange }) => {
    return (
        <input 
            type="number" 
            className="rep-scheme__rpe"
            value={rpe !== null? rpe : "" }
            name="rpe"
            onChange={handleRpeChange}
            placeholder="RPE"
        /> 
    );
};


export default RpeInput;