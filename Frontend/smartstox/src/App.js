import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./Components/Pages/Landing.js";
import Login from "./Components/Pages/Login.js";
import Dashboard from "./Components/Pages/Dashboard.js";
import WatchList from "./Components/Pages/WatchList.js";
import Predict from "./Components/Pages/Predict.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Usercode: "",
    };
  }

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
              path={"/login"}
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path={"/dashboard"}
              render={(props) => (
                <Dashboard {...props} Usercode={this.state.Usercode} />
              )}
            />
            <Route
              exact
              path={"/watchlist"}
              render={(props) => (
                <WatchList {...props} Usercode={this.state.Usercode} />
              )}
            />
               <Route
              exact
              path={"/predict"}
              render={(props) => (
                <Predict {...props} Usercode={this.state.Usercode} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
