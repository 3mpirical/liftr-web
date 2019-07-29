import React from "react";


const DistanceInput = ({ 
    distance, 
    handleDistanceChange, 
    distanceUnit, 
    handleDistanceUnitChange }) => {

    return (
        <div className="rep-scheme__distance-input-container">
            <input 
                type="number" 
                className="rep-scheme__distance"
                value={distance !== null? distance : ""}
                name="distance"
                onChange={handleDistanceChange}
                placeholder="length"
            />
            <select 
                name="distanceUnit"
                className="rep-scheme__distance-unit"
                placeholder="units"
                value={distanceUnit !== null? distanceUnit : ""}
                onChange={handleDistanceUnitChange}>            
                <option >unit</option>
                <option value="m">m</option>
                <option value="km">km</option>
                <option value="ft">ft</option>
                <option value="mi">mi</option>
            </select>
        </div>
    );
};


export default DistanceInput;