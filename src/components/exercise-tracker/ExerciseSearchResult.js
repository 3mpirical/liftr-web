import React from "react";


const ExerciseSearchResult = ({ exercise, createRepScheme }) => {
    return (
        <div className="exercise-search-result" onClick={() => {
            console.log(exercise)
            createRepScheme(exercise)
        }} >
            <img 
                src={require("../../images/fitness-generic.jpg")} 
                alt="bodypart thumbnail" 
                className="exercise-search-result__image"
            />

            <div className="exercise-search-result__content">
                <p className="exercise-search-result__name" >{ exercise.name }</p>
                <p className="exercise-search-result__meta" >{ exercise.kind  + " | " +exercise.main_bodypart }</p>
            </div>
        </div>
    )
};


export default ExerciseSearchResult;