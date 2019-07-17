import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";


const ExerciseTracker = ({  }) => {
    const { user } = useContext(AuthContext);
    const [trainingDates, setTrainingDates] = useState([]);

    useEffect(() => {
        axios.get(`/api/users/${user.id}/training_dates`)
        .then((res) => setTrainingDates(res.data))
        .catch(console.log)
    }, []);

    const renderDates = () => {
        return trainingDates.map((trainingDate) => (
            <p key={trainingDate.id} >{ trainingDate.date }</p>
        ))
    }


    return (
        <main className="tracker">
            { trainingDates && renderDates() }
        </main>
    )
}


export default ExerciseTracker;