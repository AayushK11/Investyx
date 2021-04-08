import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./Components/Pages/Landing.js";
import Login from "./Components/Pages/Login.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Usercode: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    console.log(data);
    this.setState({ Usercode: data });
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
              render={(props) => (
                <Login {...props} handleLogin={this.handleLogin} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
