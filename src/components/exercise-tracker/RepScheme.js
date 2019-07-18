import React, { useState, useEffect } from "react";
import axios from "axios";


const RepScheme = ({ repScheme }) => {
    const { comment, exercise_name, id } = repScheme;

    const [workSets, setWorkSets] = useState([]);

    useEffect(() => {
        axios.get(`/api/rep_schemes/${id}/work_sets`)
        .then((res) => setWorkSets(res.data))
        .catch(console.log);
    },[]);

    const renderWorkSets = () => {
        return workSets.map(({ reps, weight, rpe, id }) => (
            <div className="rep-scheme__work-set" key={id}>
                <p>{ weight }</p> 
                <p>X</p>
                <p>{ reps }</p>
                <button className="rep-scheme__rpe" >RPE</button>
            </div>
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
            <button className="rep-scheme__delete"><p>X</p></button>
        </div>
        <div className="rep-scheme__sets">
            { workSets && renderWorkSets() }
        </div>
        <button className="rep-scheme__add-set">+ Add Set</button>
    </div>
    )
};


export default RepScheme;