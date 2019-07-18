import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkSet from "./WorkSet";


const RepScheme = ({ repScheme, deleteRepScheme }) => {
    const { comment, exercise_name, id } = repScheme;

    const [workSets, setWorkSets] = useState([]);

    useEffect(() => {
        axios.get(`/api/rep_schemes/${id}/work_sets`)
        .then((res) => setWorkSets(res.data))
        .catch(console.log);
    },[]);

    const updateWeight = (workSet, newWeight) => {
        const newWorkSets = workSets.map((oldWorkSet) => {
            if(workSet.id === oldWorkSet.id) oldWorkSet.weight = newWeight;
            return oldWorkSet;
        });

        setWorkSets(newWorkSets);
    }

    const updateReps = (workSet, newReps) => {
        const newWorkSets = workSets.map((oldWorkSet) => {
            if(workSet.id === oldWorkSet.id) oldWorkSet.reps = newReps;
            return oldWorkSet;
        });

        setWorkSets(newWorkSets);
    }

    const renderWorkSets = () => {
        return workSets.map((workSet) => (
            <WorkSet 
                key={workSet.id} 
                workSet={workSet} 
                updateWeight={updateWeight}
                updateReps={updateReps}
            />
        ))
    }


    return (
    <div className="rep-scheme" key={id} >
        <div className="rep-scheme__header">
            <h3 className="rep-scheme__name" >{ exercise_name }</h3>
            <div>
                <button className="rep-scheme__comment-btn">Comment</button>
                <button className="rep-scheme__history-btn">History</button>
            </div>
            <button 
                className="rep-scheme__delete"
                onClick={() => deleteRepScheme(repScheme)}
            >
                <p>X</p>
            </button>
        </div>
        <div className="rep-scheme__sets">
            { workSets && renderWorkSets() }
        </div>
        <button className="rep-scheme__add-set">+ Add Set</button>
    </div>
    )
};


export default RepScheme;