import React from "react";


const WeightInput = ({ weight, handleWeightChange }) => {
    return (
        <input 
            type="number" 
            className="rep-scheme__weight"
            value={weight !== null? weight : ""}
            name="weight"
            onChange={handleWeightChange}
            placeholder="weight"
        />
    );
};


export default WeightInput;