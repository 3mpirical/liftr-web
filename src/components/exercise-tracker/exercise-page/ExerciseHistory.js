import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegTimesCircle } from "react-icons/fa";


const ExerciseHistory = ({ exercise_id, closeBlackModal }) => {
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
            <tr className="exercise-history__workset" key={id} >
                <td>{ weight ? weight : "-" }</td>
                <td className="exercise-history__workset__times" >X</td>
                <td>{ reps ? reps : "-" }</td>
                <td className="exercise-history__workset__rpe" >{ rpe ? rpe : "-" }</td>
            </tr>
        ))
    );

    const renderRepSchemes = () => {
        return repSchemes.map((repScheme) => (
            <div className="exercise-history__rep-scheme" key={repScheme.id}>
                <div className="exercise-history__rep-scheme-heading">
                    <h3>{ repScheme.exercise_name }</h3>
                    <p>{ repScheme.date }</p>
                </div>
                <table className="exercise-history__table">
                    <tbody>
                        <tr className="exercise-history__labels">
                            <th>weight</th>
                            <th>reps</th>
                            <th className="exercise-history__labels--rpe" >RPE</th>
                        </tr>
                        { renderWorkSets(repScheme.work_sets) }
                    </tbody>
                </table>
            </div>
        ))
    }

    return (
        <div className="exercise-history">
            <h1 className="exercise-history__title">HISTORY</h1>
            <FaRegTimesCircle 
                className="exercise-history__close"
                onClick={() => closeBlackModal()}/>
            { repSchemes.length > 0 && renderRepSchemes() }
        </div>
    );
};


export default ExerciseHistory;