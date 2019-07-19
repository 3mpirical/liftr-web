import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import WorkSet from "./WorkSet";


const RepScheme = ({ repScheme, deleteRepScheme, updateComment, currentDate }) => {
    const { comment, exercise_name, id } = repScheme;

    const [workSets, setWorkSets] = useState([]);
    const [commentOpen, setCommentOpen] = useState(false);
    const firstRender = useRef(true); 
    let [timer, setTimer] = useState(null);

    useEffect(() => {
        if(firstRender.current) firstRender.current = false;
        else {
            clearTimeout(timer);

            setTimer(setTimeout(() => {
                axios.put(
                    `/api/training_dates/${currentDate.id}/rep_schemes/${repScheme.id}`,
                    { comment }
                )
                .then(() => console.log("success"))
                .catch(console.log)
            }, 800));
        }
    }, [comment]);

    useEffect(() => {
        axios.get(`/api/rep_schemes/${id}/work_sets`)
        .then((res) => setWorkSets(res.data))
        .catch(console.log);
    },[]);

    const handleCommentChange = (event) => {
        updateComment(repScheme, event.target.value);
    };

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
                rpe: lastWorkSet? lastWorkSet.rpe : null, 
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
                    <button 
                        className="rep-scheme__comment-btn"
                        style={ comment? {color: "#F57C00"} : null}
                        onClick={() => setCommentOpen(!commentOpen)}
                    >Comment</button>
                    <button className="rep-scheme__history-btn">History</button>
                </div>
                <button 
                    className="rep-scheme__delete"
                    onClick={() => deleteRepScheme(repScheme)}
                >
                    <p>X</p>
                </button>
            </div>
            { commentOpen 
                &&  <div className="rep-scheme__comment">
                        <textarea 
                            name="comment" 
                            cols="30"
                            rows="5"
                            value={comment !== null ? comment : ""} 
                            onChange={handleCommentChange}
                            className="rep-scheme__comment__textarea">
                        </textarea>
                    </div>
            }
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