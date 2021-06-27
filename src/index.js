import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Profile from "./component/profile";
import Home from "./component/Home/Home";

import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Home />

        <Switch>
          <Route exact path="/Profile" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
