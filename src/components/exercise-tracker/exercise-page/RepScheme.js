import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import WorkSet from "./WorkSet";
import ExerciseHistory from "./ExerciseHistory";
import { ModalContext } from "../../../state/ModalContext";
import { FaRegTimesCircle } from "react-icons/fa";


const RepScheme = ({ repScheme, deleteRepScheme, updateComment, currentDate }) => {
    const { comment, exercise_name, id } = repScheme;
    const { openBlackModal, closeBlackModal } = useContext(ModalContext);

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

    const createWorkSet = () => {
        // We're using the last work set as a template
        const lastWorkSet = workSets[workSets.length - 1]
        axios.post(
            `/api/rep_schemes/${repScheme.id}/work_sets`, 
            { 
                weight: lastWorkSet? lastWorkSet.weight : null, 
                reps: lastWorkSet? lastWorkSet.reps : null, 
                rpe: lastWorkSet? lastWorkSet.rpe : null, 
                distance: lastWorkSet? lastWorkSet.distance : null, 
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

    const updateWorkSetState = (workSet, key, newValue) => {
        const newWorkSets = workSets.map((oldWorkSet) => {
            if(workSet.id === oldWorkSet.id) oldWorkSet[key] = newValue;
            return oldWorkSet;
        });

        setWorkSets(newWorkSets);
    };

    const updateWorkSetRequest = (workSet, keyName, value) => {
        axios.put(
            `/api/rep_schemes/${repScheme.id}/work_sets/${workSet.id}`,
            { [keyName]: value }   
        ).then(() => console.log("success"))
        .catch(console.log)
    }

    const renderWorkSets = () => {
        return workSets.map((workSet) => (
            <WorkSet 
                key={workSet.id} 
                repScheme={repScheme}
                workSet={workSet} 
                updateWorkSetState={updateWorkSetState}
                updateWorkSetRequest={updateWorkSetRequest}
                deleteWorkSet={deleteWorkSet}
            />
        ))
    }

    const openExerciseHistory = () => {
        openBlackModal(() => (
            <ExerciseHistory 
                exercise_id={repScheme.exercise_id}
                closeBlackModal={closeBlackModal}
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
                    <button 
                        className="rep-scheme__history-btn"
                        onClick={() => openExerciseHistory()} >
                            History
                    </button>
                </div>
                <FaRegTimesCircle 
                    className="rep-scheme__delete"
                    onClick={() => deleteRepScheme(repScheme)}
                />
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