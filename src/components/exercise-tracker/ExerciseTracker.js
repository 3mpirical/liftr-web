import React, { useState, useEffect, useContext, useRef } from "react";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";
import TrackerNav from "./TrackerNav";
import ExercisesPage from "./ExercisesPage";


const ExerciseTracker = ({  }) => {
    const { user } = useContext(AuthContext);
    const [selected, setSelected] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);
    const [creatingDate, setCreatingDate] = useState(false);
    const [deletingDate, setDeletingDate] = useState(false);
    const [repSchemes, setRepSchemes] = useState([]);
    const firstRender = useRef(true);

    useEffect(() => {
        axios.get(`/api/users/${user.id}/training_dates/get_by_date/${moment().format('YYYY-MM-DD')}`)
        .then((res) => setCurrentDate(res.data))
        .catch(console.log);
    }, []);

    useEffect(() => {
        if(firstRender.current) {
            firstRender.current = false;
        } else if(currentDate.id && !creatingDate) {
            axios.get(`/api/training_dates/${currentDate.id}/rep_schemes`)
            .then((res) => { 
                setRepSchemes(res.data);
                setSelected("exercises");
            })
            .catch(console.log);
        } else {
            setRepSchemes([]);
        }
    }, [currentDate]);

    const createRepScheme = (exercise) => {
        if(!currentDate.id && !creatingDate && !deletingDate) {
            /// * Create a new training_date only when we create the first rep scheme
            /// test this for issues with making multiple rep_schemes at once
            /// * We use the "creatingDate" state to make sure we don't submit a request
            /// before the first one finishes (there's server side validation too)
            /// and to prevent the useEffect from re-querying the rep schemes
            /// * We also set "creatingDate" to false after the rep_scheme request
            /// to prevent state issues with the number of schemes cerated
            setCreatingDate(true);
            axios.post(`/api/users/${user.id}/training_dates`, { date: currentDate.date })
            .then((res) => {
                setCurrentDate(res.data);
                return axios.post(
                    `/api/training_dates/${res.data.id}/rep_schemes`, 
                    { exercise_id: exercise.id}
                    );
                })
                .then((res) => {
                    setRepSchemes([...repSchemes, res.data]);
                    setCreatingDate(false);
            })
            .catch(console.log)

        } else if(!creatingDate && !deletingDate) {
            axios.post(`/api/training_dates/${currentDate.id}/rep_schemes`, { exercise_id: exercise.id})
            .then((res) => setRepSchemes([...repSchemes, res.data]))
            .catch(console.log);
        }
    };

    const deleteRepScheme = (repScheme) => {
        /// If there are no rep schemes left, delete the training date
        /// Notice we set the "deletingDate" state here to make sure 
        /// we don't try to delete again or create rep schemes/training dates
        /// before the date is fully deleted (see cerate rep scheme function)

        if(deletingDate) return;
        axios.delete(`/api/training_dates/${currentDate.id}/rep_schemes/${repScheme.id}`)
        .then((res) => {
            const newRepSchemes = repSchemes.filter((oldRepScheme) => (
                repScheme.id !== oldRepScheme.id
                ));
                setRepSchemes(newRepSchemes)
                if(newRepSchemes.length <= 0) {
                    setDeletingDate(true);
                    return axios.delete(`/api/users/${user.id}/training_dates/${currentDate.id}`)
            }
        })
        .then((res) => {
            if(res) {
                setCurrentDate({ date: currentDate.date, id: null });
                setDeletingDate(false)
            }
        })
        .catch(console.log);
    };

    const updateComment = (repScheme, newComment) => {
        const newRepSchemes = repSchemes.map((oldRepScheme) => {
            if(repScheme.id === oldRepScheme.id) oldRepScheme.comment = newComment;
            return oldRepScheme;
        })

        setRepSchemes(newRepSchemes);
    };

    const changeCurrentDate = (datePicked) => {
        datePicked = moment(datePicked).format("YYYY-MM-DD");
        axios.get(`/api/users/${user.id}/training_dates/get_by_date/${datePicked}`)
        .then((res) => {
            if(res.data) setCurrentDate(res.data);
            else setCurrentDate({ date: datePicked, id: null });
        })
        .catch(console.log);
    };

    return (
        <main className="tracker">
            <TrackerNav 
                currentDate={currentDate} 
                changeCurrentDate={changeCurrentDate}
                selected={selected}
                setSelected={setSelected}
            />
            <div className="tracker__page-container">
                { selected === "exercises" 
                  && <ExercisesPage 
                        repSchemes={repSchemes}
                        createRepScheme={createRepScheme} 
                        deleteRepScheme={deleteRepScheme}
                        updateComment={updateComment}
                        currentDate={currentDate}
                        /> 
                }
            </div>
        </main>
    )
}


export default ExerciseTracker;