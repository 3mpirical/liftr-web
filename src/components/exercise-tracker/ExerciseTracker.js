import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";
import TrackerNav from "./TrackerNav";
import RepScheme from "./RepScheme";


const ExerciseTracker = ({  }) => {
    const { user } = useContext(AuthContext);
    const [selected, setSelected] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);
    const [repSchemes, setRepSchemes] = useState([]);

    useEffect(() => {
        axios.get(`/api/users/${user.id}/training_dates/get_by_date/${moment().format('YYYY-MM-DD')}`)
        .then((res) => setCurrentDate(res.data))
        .catch(console.log);
    }, []);

    useEffect(() => {
        if(currentDate) {
            axios.get(`/api/training_dates/${currentDate.id}/rep_schemes`)
            .then((res) => { 
                setRepSchemes(res.data);
                setSelected("exercises");
            })
            .catch(console.log);
        }
    }, [currentDate]);

    const renderRepScemes = () => (
        repSchemes.map((repScheme) => (
            <RepScheme key={repScheme.id} repScheme={repScheme} />
        ))
    );

    return (
        <main className="tracker">
            <TrackerNav 
                currentDate={currentDate} 
                setCurrentDate={setCurrentDate} 
                selected={selected}
                setSelected={setSelected}
            />
            <div className="tracker__page-container">
                { selected === "exercises" && renderRepScemes() }
            </div>
        </main>
    )
}


export default ExerciseTracker;