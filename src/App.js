import React from 'react';
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DefaultRoute from "./components/DefaultRoute";
import Home from "./components/Home";
import Register from "./components/auth/Register";
import SignIn from "./components/auth/SignIn";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/sign_in" component={SignIn} /> 
        <Route path="*" component={DefaultRoute} />
      </Switch>
    </div>
  );
}

export default App;
