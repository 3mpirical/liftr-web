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
                reps: { reps } | weight: { weight } | RPE { rpe }
                <hr/>
            </div>
        ))
    }


    return (
    <div className="rep-scheme" key={id} >
        <h3>{ exercise_name }</h3>
        <p>{ comment }</p>
        { workSets && renderWorkSets() }
        <hr/>
    </div>
    )
};


export default RepScheme;