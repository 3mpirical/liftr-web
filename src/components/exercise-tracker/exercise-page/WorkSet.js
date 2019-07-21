import React, { useState, useEffect, useRef } from "react";
import { FaRegTimesCircle } from "react-icons/fa";


const WorkSet = ({ 
    workSet, 
    deleteWorkSet, 
    updateWorkSetState, 
    updateWorkSetRequest }) =>{

    const { reps, weight, rpe, id } = workSet;

    const [weightTimer, setWeightTimer] = useState(null);
    const [repsTimer, setRepsTimer] = useState(null);
    const [rpeTimer, setRpeTimer] = useState(null);
    let firstWeightRender = useRef(true);
    let firstRepsRender = useRef(true);
    let firstRpeRender = useRef(true);

    useEffect(() => {
        if(firstWeightRender.current) firstWeightRender.current = false;
        else {
            clearTimeout(weightTimer);
            
            setWeightTimer(setTimeout(() => {
                updateWorkSetRequest(workSet, "weight", weight);
            }, 500));
        }
    }, [weight]);

    useEffect(() => {
        if(firstRpeRender.current) firstRpeRender.current = false;
        else {
            clearTimeout(rpeTimer);
            
            setRpeTimer(setTimeout(() => {
                updateWorkSetRequest(workSet, "rpe", rpe);
            }, 500));
        }
    }, [rpe]);

    useEffect(() => {
        if(firstRepsRender.current) firstRepsRender.current = false;
        else {
            clearTimeout(repsTimer);
            
            setRepsTimer(setTimeout(() => {
                updateWorkSetRequest(workSet, "reps", reps);
            }, 500));
        }
    }, [reps]);

    const handleWeightChange = (event) => {
        updateWorkSetState(workSet, "weight", event.target.value);
    }


    const handleRepsChange = (event) => {
        updateWorkSetState(workSet, "reps", event.target.value);
    }

    const handleRpeChange = (event) => {
        updateWorkSetState(workSet, "rpe", event.target.value);
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
            <input 
                type="number" 
                className="rep-scheme__rpe"
                value={rpe !== null? rpe : "" }
                name="rpe"
                onChange={handleRpeChange}
                placeholder="RPE"
            /> 
            {/* <button 
                className="rep-scheme__work-set__delete" 
                tabIndex="-1" 
                onClick={() => deleteWorkSet(workSet)}
                >X</button> */}
            <FaRegTimesCircle 
                className="rep-scheme__work-set__delete" 
                onClick={() => deleteWorkSet(workSet)}
            />
        </div>
    )
};


export default WorkSet;