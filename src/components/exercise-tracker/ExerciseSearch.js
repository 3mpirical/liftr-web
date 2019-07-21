import React, { useState, useEffect } from "react";
import axios from "axios";
import ExerciseSearchResult from "./ExerciseSearchResult";


const ExerciseSearch = ({ createRepScheme, bodyPartFilter, setBodyPartFilter }) => {
    const [term, setTerm] = useState("");
    const [timer, setTimer] = useState(null);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        clearTimeout(timer);
        const route = `/api/exercises/search?`;
        const termParam =  `${term ? "term=" + term : ""}`;
        const bodyPartParam = `${bodyPartFilter ? "&body_part=" + bodyPartFilter : ""}`

        console.log(route + termParam + bodyPartParam);

        setTimer(setTimeout(function () {
            axios.get(route + termParam + bodyPartParam)
            .then((res) => setExercises(res.data))
            .catch(console.log);
        }, 500));
    }, [term, bodyPartFilter]);

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
            <div className="exercise-search__kind-filters">
                <button 
                    className="exercise-search__kind">
                    Weight
                </button>
                <button 
                    className="exercise-search__kind">
                    Distance
                </button>
            </div>
            <div className="exercise-search__bodypart-filters">
                <button 
                    style={bodyPartFilter === "back" ? style.selectedButton : null}
                    onClick={() => setBodyPartFilter("back")}
                    className="exercise-search__bodypart">
                    Back
                </button>
                <button 
                    style={bodyPartFilter === "chest" ? style.selectedButton : null}
                    onClick={() => setBodyPartFilter("chest")}
                    className="exercise-search__bodypart">
                    Chest
                </button>
                <button 
                    style={bodyPartFilter === "legs" ? style.selectedButton : null}
                    onClick={() => setBodyPartFilter("legs")}
                    className="exercise-search__bodypart">
                    Legs
                </button>
                <button 
                    style={bodyPartFilter === "arms" ? style.selectedButton : null}
                    onClick={() => setBodyPartFilter("arms")}
                    className="exercise-search__bodypart">
                    Arms
                </button>
                <button 
                    style={bodyPartFilter === "shoulders" ? style.selectedButton : null}
                    onClick={() => setBodyPartFilter("shoulders")}
                    className="exercise-search__bodypart">
                    Shoulders
                </button>
                <button 
                    style={bodyPartFilter === "abs" ? style.selectedButton : null}
                    onClick={() => setBodyPartFilter("abs")}
                    className="exercise-search__bodypart">
                    Abs
                </button>
                <button 
                    style={bodyPartFilter === "cardio" ? style.selectedButton : null}
                    onClick={() => setBodyPartFilter("cardio")}
                    className="exercise-search__bodypart">
                    Cardio
                </button>
                <button 
                    style={bodyPartFilter === null ? style.selectedButton : null}
                    onClick={() => setBodyPartFilter(null)}
                    className="exercise-search__bodypart">
                    None
                </button>
            </div>
            { exercises && renderResults() }
        </div>
    );
};

const style = {
    selectedButton: {
        color: "black",
        borderColor: "transparent",
        backgroundColor: "#303F9F",
    }
}


export default ExerciseSearch;