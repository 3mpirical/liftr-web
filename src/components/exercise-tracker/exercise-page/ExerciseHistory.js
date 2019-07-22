import React, { useState, useEffect } from "react";
import axios from "axios";


const ExerciseHistory = ({ exercise_id }) => {
    const [repSchemes, setRepSchemes] = useState([]);
    const [limit, setlimit] = useState(10);

    useEffect(() => {
        axios.get(`/api/exercises/${exercise_id}/rep_schemes/get_rep_scheme_history?limit=${limit}`)
        .then((res) => {
            console.log(res);
            setRepSchemes(res.data);
        })
        .catch(console.log);
    },[]);

    const renderWorkSets = (workSets) => (
        workSets.map(({weight, reps, rpe, id}) => (
            <div className="exercise-history__workset" key={id} >
                <p>weight: { weight ? weight : "none" }</p>
                <p>reps: { reps ? reps : "none" }</p>
                <p>rpe: { rpe ? rpe : "none" }</p>
                <hr/>
            </div>
        ))
    );

    const renderRepSchemes = () => {
        return repSchemes.map((repScheme) => (
            <div className="exercise-history__rep-scheme" key={repScheme.id}>
                <p>{ repScheme.exercise_name }</p>
                <p>{ repScheme.date }</p>
                <hr/>
                { renderWorkSets(repScheme.work_sets) }
            </div>
        ))
    }

    return (
        <div className="exercise-history">
            { repSchemes.length > 0 && renderRepSchemes() }
        </div>
    );
};


export default ExerciseHistory;