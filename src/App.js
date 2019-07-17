import React from 'react';
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import FetchUser from "./components/auth/FetchUser";
import DefaultRoute from "./components/auth/DefaultRoute";
import Home from "./components/home-pages/Home";
import Navbar from "./components/layout/Navbar";
import ExerciseTracker from "./components/exercise-tracker/ExerciseTracker";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <FetchUser>
          <ProtectedRoute exact path="/" component={ExerciseTracker} />
          <Route exact path="/home/:page" component={Home} />
        </FetchUser>
        <Route path="*" component={DefaultRoute} />
      </Switch>
    </div>
  );
}

export default App;
