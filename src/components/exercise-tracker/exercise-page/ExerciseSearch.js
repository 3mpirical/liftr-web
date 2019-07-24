import React, { useState, useEffect, useRef } from "react";
import axios from "../../../helpers/axios";
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
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const [noMoreExercises, setNoMoreExercises] = useState(false);
    const [initialSearch, setInitialsearch] = useState(true);
    const firstRender = useRef(true);

    useEffect(() => {
        clearTimeout(timer);

        // reseting values for new searches
        // initial search prevents offset change from firing pagination search
        setInitialsearch(true);
        setOffset(0);

        setTimer(setTimeout(function () {
            searchRequest(term, bodyPartFilter, kindFilter, 0)
            .then((res) => {
                if(res.data.length < limit) setNoMoreExercises(true);
                else(setNoMoreExercises(false));
                setExercises(res.data);
                setInitialsearch(false);
            })
            .catch(console.log);
        }, 500));
    }, [term, bodyPartFilter, kindFilter]);

    useEffect(() => {
        if(firstRender.current) firstRender.current = false;
        else if(!initialSearch) {
            searchRequest(term, bodyPartFilter, kindFilter, offset)
            .then((res) => {
                if(res.data.length < limit) setNoMoreExercises(true);
                setExercises(exercises.concat(res.data));
            })
            .catch(console.log);
        }
    }, [offset]);

    const searchRequest = (term, bodyPart, kind, offset) => {
        const route = `/api/exercises/search?`;
        const termParam =  `${term ? "term=" + term : ""}`;
        const bodyPartParam = `${bodyPart ? "&body_part=" + bodyPart : ""}`;
        const kindParam = `${kind ? "&kind=" + kind : ""}`;
        const offsetParam = `&offset=${offset}`;
        const limitParam = `&limit=${limit}`

        return axios.get(route + termParam + bodyPartParam + kindParam + offsetParam + limitParam);
    }

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
                <button
                    onClick={() => noMoreExercises ? null : setOffset(offset + 1)}
                    className="exercise-search__paginate-button">
                    { noMoreExercises ? "No More Exercises" : "See More" }
                </button>
            </div>
        </div>
    );
};

const style = {
    selectedButton: {
        color: "#CFD8DC",
        borderColor: "transparent",
        backgroundColor: "#303F9F",
    }
}


export default ExerciseSearch;