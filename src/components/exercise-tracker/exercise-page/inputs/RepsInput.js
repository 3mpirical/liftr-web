import React from "react";


const RepsInput = ({ reps, handleRepsChange }) => {
    return (
        <input 
            type="number" 
            className="rep-scheme__reps"
            value={reps !== null? reps : "" }
            name="reps"
            onChange={handleRepsChange}
            placeholder="reps"
        /> 
    );
};


export default RepsInput;