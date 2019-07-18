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

    const updateRpe = (workSet, newRpe) => {
        const newWorkSets = workSets.map((oldWorkSet) => {
            if(workSet.id === oldWorkSet.id) oldWorkSet.rpe = newRpe;
            return oldWorkSet;
        });

        setWorkSets(newWorkSets);
    }

    const createWorkSet = () => {
        // We're using the last work set as a template
        const lastWorkSet = workSets[workSets.length - 1]
        axios.post(
            `/api/rep_schemes/${repScheme.id}/work_sets`, 
            { 
                weight: lastWorkSet? lastWorkSet.weight : null, 
                reps: lastWorkSet? lastWorkSet.reps : null, 
            }
        ).then((res) => setWorkSets([...workSets, res.data]))
        .catch(console.log);
    }

    const deleteWorkSet = (workSet) => {
        axios.delete(`/api/rep_schemes/${repScheme.id}/work_sets/${workSet.id}`)
        .then((res) => {
            setWorkSets(workSets.filter((oldWorkSet) => oldWorkSet.id !== workSet.id));
        })
        .catch(console.log);
    }

    const renderWorkSets = () => {
        return workSets.map((workSet) => (
            <WorkSet 
                key={workSet.id} 
                repScheme={repScheme}
                workSet={workSet} 
                updateWeight={updateWeight}
                updateReps={updateReps}
                updateRpe={updateRpe}
                deleteWorkSet={deleteWorkSet}
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
        <button 
            className="rep-scheme__add-set"
            onClick={() => createWorkSet()}
        >+ Add Set</button>
    </div>
    )
};


export default RepScheme;