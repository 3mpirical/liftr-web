import React, { useState, useEffect } from "react";
import axios from "axios";


const ExerciseSearch = () => {
    const [term, setTerm] = useState("");
    const [timer, setTimer] = useState(null);

    const handleChange = (event) => {
        setTerm(event.target.value);
    };

    useEffect(() => {
        clearTimeout(timer);

        setTimer(setTimeout(function () {
            console.log(term);
        }, 500));
    }, [term]);

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

        </div>
    );
};


export default ExerciseSearch;