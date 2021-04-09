import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./Components/Pages/Landing.js";
import About from "./Components/Pages/About.js";
import Products from "./Components/Pages/Products.js";
import Pricing from "./Components/Pages/Pricing.js";
import ContactUs from "./Components/Pages/ContactUs.js";
import Videos from "./Components/Pages/Videos.js";
import SignUp from "./Components/Pages/SignUp.js";
import TermsAndConditions from "./Components/Pages/TermsAndConditions";
import PrivacyPolicy from "./Components/Pages/PrivacyPolicy";
import ConfirmAccount from "./Components/Pages/ConfirmAccount";
import ForgotPassword from "./Components/Pages/ForgotPassword";
import ResetPassword from "./Components/Pages/ResetPassword";

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
            <Route
              exact
              path={"/products"}
              render={(props) => <Products {...props} />}
            />
            <Route
              exact
              path={"/pricing"}
              render={(props) => <Pricing {...props} />}
            />
            <Route
              exact
              path={"/contactus"}
              render={(props) => <ContactUs {...props} />}
            />
            <Route
              exact
              path={"/videos"}
              render={(props) => <Videos {...props} />}
            />
            <Route
              exact
              path={"/signup"}
              render={(props) => <SignUp {...props} />}
            />
            <Route
              exact
              path={"/termsandconditions"}
              render={(props) => <TermsAndConditions {...props} />}
            />
            <Route
              exact
              path={"/privacypolicy"}
              render={(props) => <PrivacyPolicy {...props} />}
            />
            <Route
              exact
              path={"/confirm-account"}
              render={(props) => <ConfirmAccount {...props} />}
            />
            <Route
              exact
              path={"/forgot-password"}
              render={(props) => <ForgotPassword {...props} />}
            />
            <Route
              exact
              path={"/reset-password"}
              render={(props) => <ResetPassword {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
