import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegTimesCircle } from "react-icons/fa";


const ExerciseHistory = ({ exercise_id, closeBlackModal, changeCurrentDate }) => {
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
    };

    const handleDateClick = (date) => {
        changeCurrentDate(date);
        closeBlackModal();
    };

    const renderWorkSets = (workSets) => {
        const kind = repSchemes[0].exercise_kind;
        return workSets.map((data) => (
            <tr className="exercise-history__workset" key={data.id} >
                {format[kind].map((value) => {
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
                })}
            </tr>
        )) 
    };

    const mapTableHead = (repScheme) => {
        return format[repScheme.exercise_kind].map((value) => {
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


    const renderRepSchemes = () => {
        return repSchemes.map((repScheme) => (
            <div className="exercise-history__rep-scheme" key={repScheme.id}>
                <div className="exercise-history__rep-scheme-heading">
                    <h3>{ repScheme.exercise_name }</h3>
                    <button onClick={() => handleDateClick(repScheme.date)}>{ repScheme.date }</button>
                </div>
                <table className="exercise-history__table">
                    <tbody>
                        <tr className="exercise-history__labels">
                            { mapTableHead(repScheme) }
                        </tr>
                        { renderWorkSets(repScheme.work_sets) }
                    </tbody>
                </table>
            </div>
        ));
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