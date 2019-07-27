import React from "react";


const DistanceInput = ({ distance, handleDistanceChange }) => {
    return (
        <input 
            type="number" 
            className="rep-scheme__weight"
            value={distance !== null? distance : ""}
            name="distance"
            onChange={handleDistanceChange}
            placeholder="distance"
        />
    );
};


export default DistanceInput;