import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import RpeInput from "./inputs/RpeInput";
import RepsInput from "./inputs/RepsInput";
import WeightInput from "./inputs/WeightInput";
import DistanceInput from "./inputs/DistanceInput";
import TimeInput from "./inputs/TimeInput";
import { useTriggerWhenNotTyping } from "../../utilities/useTriggerWhenNotTyping";


const WorkSet = ({ 
    workSet, 
    repScheme,
    deleteWorkSet, 
    updateWorkSetState, 
    updateWorkSetRequest }) =>{

    const { 
        weight, 
        reps, 
        rpe, 
        distance, 
        distance_unit, 
        hours,
        minutes,
        seconds,
        id,
    } = workSet;
    const { exercise_kind } = repScheme;

    const inputObj = {
        weight: [
            <WeightInput weight={weight} handleWeightChange={handleWeightChange} />,
            <RepsInput reps={reps} handleRepsChange={handleRepsChange} />,
            <RpeInput rpe={rpe} handleRpeChange={handleRpeChange} />,
        ],
        distance: [
            <DistanceInput 
                distance={distance} 
                handleDistanceChange={handleDistanceChange} 
                distanceUnit={distance_unit} 
                handleDistanceUnitChange={handleDistanceUnitChange} 
            />,
            <TimeInput 
                hours={hours} 
                minutes={minutes}
                seconds={seconds}
                handleHoursChange={handleHoursChange}
                handleMinutesChange={handleMinutesChange}
                handleSecondsChange={handleSecondsChange}
            />,
        ]
    }

    useTriggerWhenNotTyping(weight, 500, () => updateWorkSetRequest(workSet, "weight", weight));
    useTriggerWhenNotTyping(rpe, 500, () => updateWorkSetRequest(workSet, "rpe", rpe));
    useTriggerWhenNotTyping(reps, 500, () => updateWorkSetRequest(workSet, "reps", reps));
    useTriggerWhenNotTyping(distance, 500, () => updateWorkSetRequest(workSet, "distance", distance));
    useTriggerWhenNotTyping(distance_unit, 500, () => updateWorkSetRequest(workSet, "distance_unit", distance_unit));
    useTriggerWhenNotTyping(hours, 500, () => updateWorkSetRequest(workSet, "hours", hours));
    useTriggerWhenNotTyping(minutes, 500, () => updateWorkSetRequest(workSet, "minutes", minutes));
    useTriggerWhenNotTyping(seconds, 500, () => updateWorkSetRequest(workSet, "seconds", seconds));

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

    function handleDistanceUnitChange(event) {
        const newDistanceUnit = event.target.value;
        if( newDistanceUnit === "m" 
        ||  newDistanceUnit === "km"
        ||  newDistanceUnit === "ft"
        ||  newDistanceUnit === "mi") {
            updateWorkSetState(workSet, "distance_unit", newDistanceUnit);
        } 
    }

    function handleHoursChange(event) {
        const newHours = event.target.value;
        if(newHours > 24 || newHours < 0) return;
        else updateWorkSetState(workSet, "hours", newHours);
    }

    function handleMinutesChange(event) {
        const newMinutes = event.target.value;
        if(newMinutes > 60 || newMinutes < 0) return;
        else updateWorkSetState(workSet, "minutes", newMinutes);
    }

    function handleSecondsChange(event) {
        const newSeconds = event.target.value;
        if(newSeconds > 60 || newSeconds < 0) return;
        else updateWorkSetState(workSet, "seconds", newSeconds);
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