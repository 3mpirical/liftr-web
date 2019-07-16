import React from 'react';
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DefaultRoute from "./components/DefaultRoute";
import Home from "./components/home-pages/Home";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        {/* <ProtectedRoute exact path="/" component={SOMETHING} /> */}
        <Route exact path="/home/:page" component={Home} />
        <Route path="*" component={DefaultRoute} />
      </Switch>
    </div>
  );
}

export default App;
