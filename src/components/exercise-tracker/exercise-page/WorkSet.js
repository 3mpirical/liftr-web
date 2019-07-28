import React, { useState, useEffect, useRef } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import RpeInput from "./RpeInput";
import RepsInput from "./RepsInput";
import WeightInput from "./WeightInput";
import DistanceInput from "./DistanceInput";
import { useTriggerWhenNotTyping } from "../../utilities/useTriggerWhenNotTyping";


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

    useTriggerWhenNotTyping(weight, 500, () => updateWorkSetRequest(workSet, "weight", weight));
    useTriggerWhenNotTyping(rpe, 500, () => updateWorkSetRequest(workSet, "rpe", rpe));
    useTriggerWhenNotTyping(reps, 500, () => updateWorkSetRequest(workSet, "reps", reps));
    useTriggerWhenNotTyping(distance, 500, () => updateWorkSetRequest(workSet, "distance", distance));

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