import React, { useState, useEffect } from "react";
import axios from "axios";
import ExerciseSearchResult from "./ExerciseSearchResult";


const ExerciseSearch = ({ createRepScheme }) => {
    const [term, setTerm] = useState("");
    const [timer, setTimer] = useState(null);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        clearTimeout(timer);

        setTimer(setTimeout(function () {
            axios.get(`/api/exercises/search/${term? term : " "}/`)
            .then((res) => setExercises(res.data))
            .catch(console.log);
        }, 500));
    }, [term]);

    const handleChange = (event) => {
        setTerm(event.target.value);
    };

    const renderResults = () => {
        return exercises.map((exercise) => (
            <ExerciseSearchResult 
                key={exercise.id} 
                exercise={exercise} 
                createRepScheme={createRepScheme} 
            />
        ))
    };

    return (
        <div className="exercise-search">
            <input 
                type="text" 
                className="exercise-search__search-input"
                placeholder="search exercises ..."
                value={term}
                name="term"
                onChange={handleChange}
            />
            { exercises && renderResults() }
        </div>
    );
};


export default ExerciseSearch;