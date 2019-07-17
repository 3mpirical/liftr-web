import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";


const ExerciseTracker = ({  }) => {
    const { user } = useContext(AuthContext);
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
            .then((res) => setRepSchemes(res.data))
            .catch(console.log);
        }
    }, [currentDate]);

    const renderRepScemes = () => (
        repSchemes.map(({ comment, exercise_name, id }) => (
            <div className="rep-scheme" key={id} >
                <h3>{ exercise_name }</h3>
                <p>{ comment }</p>
                <hr/>
            </div>
        ))
    );

    return (
        <main className="tracker">
            { currentDate && <><h1>{ currentDate.date }</h1><br/><hr /></> }
            { repSchemes && renderRepScemes() }
        </main>
    )
}


export default ExerciseTracker;