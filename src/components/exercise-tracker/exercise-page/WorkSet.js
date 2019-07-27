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
        const newWeight = event.target.value;
        if(newWeight > 999 || newWeight < -999) return;
        updateWorkSetState(workSet, "weight", newWeight);
    }


    const handleRepsChange = (event) => {
        const newReps = event.target.value;
        if(newReps > 999 || newReps < 0) return;
        else updateWorkSetState(workSet, "reps", newReps);
    }

    const handleRpeChange = (event) => {
        const newRpe = event.target.value;
        if(newRpe > 10 || newRpe < 0) return;
        else updateWorkSetState(workSet, "rpe", newRpe);
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
                min={0}
                max={10}
            /> 
            <FaRegTimesCircle 
                className="rep-scheme__work-set__delete" 
                onClick={() => deleteWorkSet(workSet)}
            />
        </div>
    )
};


export default WorkSet;