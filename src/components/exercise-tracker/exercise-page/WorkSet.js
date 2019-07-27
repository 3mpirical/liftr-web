import React, { useState, useEffect, useRef } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import RpeInput from "./RpeInput";
import RepsInput from "./RepsInput";
import WeightInput from "./WeightInput";
import DistanceInput from "./DistanceInput";


const WorkSet = ({ 
    workSet, 
    repScheme,
    deleteWorkSet, 
    updateWorkSetState, 
    updateWorkSetRequest }) =>{

    const { reps, weight, rpe, distance, id } = workSet;
    const { exercise_kind } = repScheme;

    const inputObj = {
        weight: [
            <WeightInput weight={weight} handleWeightChange={handleWeightChange} />,
            <RepsInput reps={reps} handleRepsChange={handleRepsChange} />,
            <RpeInput rpe={rpe} handleRpeChange={handleRpeChange} />,
        ],
        distance: [
            <DistanceInput distance={distance} handleDistanceChange={handleDistanceChange} />,
            <RepsInput reps={reps} handleRepsChange={handleRepsChange} />,
            <RpeInput rpe={rpe} handleRpeChange={handleRpeChange} />,
        ]
    }

    const [weightTimer, setWeightTimer] = useState(null);
    const [repsTimer, setRepsTimer] = useState(null);
    const [rpeTimer, setRpeTimer] = useState(null);
    const [distanceTimer, setDistanceTimer] = useState(null);
    let firstWeightRender = useRef(true);
    let firstRepsRender = useRef(true);
    let firstRpeRender = useRef(true);
    let firstDistanceRender = useRef(true);

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

    useEffect(() => {
        if(firstDistanceRender.current) firstDistanceRender.current = false;
        else {
            clearTimeout(distanceTimer);
            
            setDistanceTimer(setTimeout(() => {
                updateWorkSetRequest(workSet, "distance", distance);
            }, 500));
        }
    }, [distance]);

    function handleWeightChange(event) {
        const newWeight = event.target.value;
        if(newWeight > 999 || newWeight < -999) return;
        updateWorkSetState(workSet, "weight", newWeight);
    }


    function handleRepsChange(event) {
        const newReps = event.target.value;
        if(newReps > 999 || newReps < 0) return;
        else updateWorkSetState(workSet, "reps", newReps);
    }

    function handleRpeChange(event) {
        const newRpe = event.target.value;
        if(newRpe > 10 || newRpe < 0) return;
        else updateWorkSetState(workSet, "rpe", newRpe);
    }

    function handleDistanceChange(event) {
        const newDistance = event.target.value;
        if(newDistance > 999 || newDistance < 0) return;
        else updateWorkSetState(workSet, "distance", newDistance);
    }


    return (
        <div className="rep-scheme__work-set" key={id}>
            { inputObj[exercise_kind][0] }
            <p>X</p>
            { inputObj[exercise_kind][1] }
            { inputObj[exercise_kind][2] }
            <FaRegTimesCircle 
                className="rep-scheme__work-set__delete" 
                onClick={() => deleteWorkSet(workSet)}
            />
        </div>
    )
};


export default WorkSet;