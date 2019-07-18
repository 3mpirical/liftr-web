import React, { useState, useEffect, useRef } from "react";


const WorkSet = ({ workSet, updateWeight, updateReps }) =>{
    const { reps, weight, rpe, id } = workSet;

    const [weightTimer, setWeightTimer] = useState(null);
    const [repsTimer, setRepsTimer] = useState(null);
    let firstWeightRender = useRef(true);
    let firstRepsRender = useRef(true);

    useEffect(() => {
        if(firstWeightRender.current) firstWeightRender.current = false;
        else {
            clearTimeout(weightTimer);
            
            setWeightTimer(setTimeout(() => {
                console.log("weight timer triggered")
            }, 500));
        }
    }, [weight]);

    useEffect(() => {
        if(firstRepsRender.current) firstRepsRender.current = false;
        else {
            clearTimeout(repsTimer);
            
            setRepsTimer(setTimeout(() => {
                console.log("reps timer triggered")
            }, 500));
        }
    }, [reps]);

    const handleWeightChange = (event) => {
        updateWeight(workSet, event.target.value);
    }


    const handleRepsChange = (event) => {
        updateReps(workSet, event.target.value);
    }


    return (
        <div className="rep-scheme__work-set" key={id}>
            <input 
                type="number" 
                className="rep-scheme__weight"
                value={weight}
                name="weight"
                onChange={handleWeightChange}
            /> 
            <p>X</p>
            <input 
                type="number" 
                className="rep-scheme__reps"
                value={reps}
                name="reps"
                onChange={handleRepsChange}
            /> 
            <button className="rep-scheme__rpe" >RPE</button>
        </div>
    )
};


export default WorkSet;