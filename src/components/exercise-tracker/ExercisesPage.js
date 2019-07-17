import React from "react";
import ExerciseSearch from "./ExerciseSearch";
import RepScheme from "./RepScheme";

const ExercisesPage = ({ repSchemes, currentDate }) => {

    const renderRepSchemes = () => {
        return repSchemes.map((repScheme) => {
            return <RepScheme key={repScheme.id} repScheme={repScheme} />
        })
    }

    return (
        <div className="exercises-page">
            <ExerciseSearch />
            <div className="exercises-page__rep-schemes-container">
                { repSchemes && renderRepSchemes()}
            </div>
        </div>
    );
};


export default ExercisesPage;