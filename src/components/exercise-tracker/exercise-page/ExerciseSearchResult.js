import React from "react";


const ExerciseSearchResult = ({ exercise, createRepScheme }) => {
    return (
        <div className="exercise-search-result" onClick={() => createRepScheme(exercise)} >
            <img 
                src={require(`../../../images/${exercise.main_bodypart}.jpg`)} 
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