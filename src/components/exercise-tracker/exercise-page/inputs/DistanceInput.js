import React from "react";


const DistanceInput = ({ 
    distance, 
    handleDistanceChange, 
    distanceUnit, 
    handleDistanceUnitChange }) => {
        
    return (
        <>
            <input 
                type="number" 
                className="rep-scheme__weight"
                value={distance !== null? distance : ""}
                name="distance"
                onChange={handleDistanceChange}
                placeholder="distance"
            />
            <select 
                name="distanceUnit"
                className="rep-scheme__distance-unit"
                placeholder="units"
                value={distanceUnit !== null? distanceUnit : ""}
                onChange={handleDistanceUnitChange}>            
                <option value="m">m</option>
                <option value="km">km</option>
                <option value="ft">ft</option>
                <option value="mi">mi</option>
            </select>
        </>
    );
};


export default DistanceInput;