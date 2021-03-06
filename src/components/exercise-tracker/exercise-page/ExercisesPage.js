import React, { useState } from "react";
import ExerciseSearch from "./ExerciseSearch";
import RepScheme from "./RepScheme";

const ExercisesPage = ({ 
    repSchemes, 
    currentDate, 
    changeCurrentDate,
    createRepScheme, 
    deleteRepScheme, 
    updateComment,
    }) => {
    const [bodyPartFilter, setBodyPartFilter] = useState(null);
    const [kindFilter, setKindFilter] = useState(null);

    const renderRepSchemes = () => {
        return repSchemes.map((repScheme) => {
            return <RepScheme 
                    key={repScheme.id} 
                    repScheme={repScheme} 
                    deleteRepScheme={deleteRepScheme}
                    updateComment={updateComment}
                    currentDate={currentDate}
                    changeCurrentDate={changeCurrentDate}
                    />
        })
    }

    return (
        <div className="exercises-page">
            <ExerciseSearch  
                createRepScheme={createRepScheme}
                bodyPartFilter={bodyPartFilter}
                setBodyPartFilter={setBodyPartFilter} 
                kindFilter={kindFilter}
                setKindFilter={setKindFilter}
            />
            <div className="exercises-page__rep-schemes-overflow-container">
                <div className="exercises-page__rep-schemes-container">
                    { repSchemes.length > 0 && currentDate.id && renderRepSchemes() }
                    { currentDate.id === null && (
                        <h2 
                            className="exercises-page__no-rep-schemes" >
                            No Workouts Logged Today
                        </h2>
                    )}
                </div>
            </div>
        </div>
    );
};


export default ExercisesPage;