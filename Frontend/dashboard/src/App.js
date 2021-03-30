import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./Components/Pages/Landing.js";
import About from "./Components/Pages/About.js";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={(props) => <Landing {...props} />}
            />
            <Route
              exact
              path={"/about"}
              render={(props) => <About {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
