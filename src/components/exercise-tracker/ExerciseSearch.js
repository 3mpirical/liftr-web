import React, { useState, useEffect } from "react";
import axios from "axios";
import ExerciseSearchResult from "./ExerciseSearchResult";
import { FaRegTimesCircle } from "react-icons/fa";


const ExerciseSearch = ({ 
    createRepScheme, 
    bodyPartFilter, 
    setBodyPartFilter, 
    kindFilter, 
    setKindFilter }) => {

    const [term, setTerm] = useState("");
    const [timer, setTimer] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [kindOpen, setKindOpen] = useState(false);

    useEffect(() => {
        clearTimeout(timer);
        const route = `/api/exercises/search?`;
        const termParam =  `${term ? "term=" + term : ""}`;
        const bodyPartParam = `${bodyPartFilter ? "&body_part=" + bodyPartFilter : ""}`;
        const kindParam = `${kindFilter ? "&kind=" + kindFilter : ""}`;

        setTimer(setTimeout(function () {
            axios.get(route + termParam + bodyPartParam + kindParam)
            .then((res) => setExercises(res.data))
            .catch(console.log);
        }, 500));
    }, [term, bodyPartFilter, kindFilter]);

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
            { kindOpen
              ? <div className="exercise-search__kind-filters">
                    <button 
                        style={kindFilter === "weight" ? style.selectedButton : null}
                        onClick={() => setKindFilter("weight")}
                        className="exercise-search__kind">
                        Weight
                    </button>
                    <button 
                        style={kindFilter === "distance" ? style.selectedButton : null}
                        onClick={() => setKindFilter("distance")}
                        className="exercise-search__kind">
                        Distance
                    </button>
                    <FaRegTimesCircle 
                        className="exercise-search__kind-filters-close"
                        onClick={() => {
                            setKindFilter(null)
                            setKindOpen(false)
                        }}
                    />
                </div>
              : <button 
                    className="exercise-search__kind-toggle"
                    onClick={() => setKindOpen(true)}>
                  + Exercise Type Filter
                </button>
            }
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
            <div className="exercise-search__results-container">
                { exercises && renderResults() }
            </div>
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