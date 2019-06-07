import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import DefaultRoute from "./components/DefaultRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="*" component={DefaultRoute} />
      </Switch>
    </div>
  );
}

export default App;
