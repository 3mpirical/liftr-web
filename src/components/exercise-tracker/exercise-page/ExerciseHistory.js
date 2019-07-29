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

    const format = {
        weight: ["weight", "reps", "rpe"],
        distance: ["distance", "hours", "minutes", "seconds"]
    }

    const renderWorkSets = (workSets) => {
        const kind = repSchemes[0].exercise_kind;

        const mapTd = (data) => {
            return format[kind].map((value, index) => {
                if(value === "weight") return(
                        <td colSpan="1">{ data[value] ? data[value] : "--" }</td>
                )
                else if(value === "rpe") return (
                    <td 
                        colSpan="1"
                        className="exercise-history__workset__green">
                        { data[value] ? data[value] : "--" }
                    </td>
                ) 
                else if(value === "distance") return (
                    <td colSpan="1">
                        { data[value] && data.distance_unit 
                        ? data[value] + data.distance_unit 
                        : "--" }
                    </td>
                )
                else return <td colSpan="1">{ data[value] ? data[value] : "--" }</td>
            });
        }

        return workSets.map((data) => (
                <tr className="exercise-history__workset" key={data.id} >
                    { mapTd(data) }
                </tr>
        )) 
    };

    const renderRepSchemes = () => {
        let kind = null;

        const mapTh = () => {
            return format[kind].map((value) => {
                if(value === "rpe") return (
                    <th 
                        colSpan="1"
                        className="exercise-history__labels--rpe">
                        { value }
                    </th>
                )
                else if(value === "distance") return <th colSpan="1">length</th>
                else if(value === "minutes") return <th colSpan="1">mins</th>
                else if(value === "seconds") return <th colSpan="1">secs</th>
                else return <th colSpan="1">{ value }</th>
            })
        }
        return repSchemes.map((repScheme) => {
            kind = repScheme.exercise_kind;
            return (
                <div className="exercise-history__rep-scheme" key={repScheme.id}>
                    <div className="exercise-history__rep-scheme-heading">
                        <h3>{ repScheme.exercise_name }</h3>
                        <p>{ repScheme.date }</p>
                    </div>
                    <table className="exercise-history__table">
                        <tbody>
                            <tr className="exercise-history__labels">
                                { mapTh() }
                            </tr>
                            { renderWorkSets(repScheme.work_sets) }
                        </tbody>
                    </table>
                </div>
            );
        });
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