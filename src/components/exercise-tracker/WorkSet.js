import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


const WorkSet = ({ workSet, repScheme ,updateWeight, updateReps }) =>{
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
                axios.put(
                    `/api/rep_schemes/${repScheme.id}/work_sets/${workSet.id}`,
                    { weight }   
                ).then(() => console.log("success"))
                .catch(console.log)
            }, 500));
        }
    }, [weight]);

    useEffect(() => {
        if(firstRepsRender.current) firstRepsRender.current = false;
        else {
            clearTimeout(repsTimer);
            
            setRepsTimer(setTimeout(() => {
                axios.put(
                    `/api/rep_schemes/${repScheme.id}/work_sets/${workSet.id}`,
                    { reps }   
                ).then(() => console.log("success"))
                .catch(console.log)
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
                value={weight !== null? weight : ""}
                name="weight"
                onChange={handleWeightChange}
                placeholder="weight"
            /> 
            <p>X</p>
            <input 
                type="number" 
                className="rep-scheme__reps"
                value={reps !== null? reps : "" }
                name="reps"
                onChange={handleRepsChange}
                placeholder="reps"
            /> 
            <button className="rep-scheme__rpe" >RPE</button>
        </div>
    )
};


export default WorkSet;