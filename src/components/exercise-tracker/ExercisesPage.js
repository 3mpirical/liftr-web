import React from "react";
import ExerciseSearch from "./ExerciseSearch";
import RepScheme from "./RepScheme";

const ExercisesPage = ({ repSchemes, currentDate, createRepScheme, deleteRepScheme }) => {

    const renderRepSchemes = () => {
        return repSchemes.map((repScheme) => {
            return <RepScheme 
                    key={repScheme.id} 
                    repScheme={repScheme} 
                    deleteRepScheme={deleteRepScheme}
                    />
        })
    }

    return (
        <div className="exercises-page">
            <ExerciseSearch  createRepScheme={createRepScheme} />
            <div className="exercises-page__rep-schemes-container">
                { repSchemes && renderRepSchemes()}
            </div>
        </div>
    );
};


export default ExercisesPage;