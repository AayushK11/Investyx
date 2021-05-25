import React from "react";
import { Helmet } from "react-helmet";
import "../Css/Login.css";
import "../Css/Loader.css";
import smartstox from "../Images/symbol.png";
import investyx_S from "../Images/Investyx_S.png";
import investyx_H from "../Images/Investyx_H.png";
import axios from "axios";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginLevel: 0,
      Username: "",
      Password: "",
      Usercode: "",
      Pin: "",
      tries: 3,
      url: window.location.origin,
    };
    this.generateURLs = this.generateURLs.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  generateURLs() {
    this.setState({
      forgotpassword: "http://investyx.netlify.app/forgot-password",
      dashboard: this.state.url.concat("/dashboard"),
    });
  }

  onClick(event) {
    event.preventDefault();

    Array.from(document.getElementsByTagName("label")).forEach(function (
      element
    ) {
      element.style.color = "#212529";
    });

    if (event.target.id === "next") {
      var flag = this.checkFields(this.state.loginLevel);
      if (flag === 0) {
        $("#login").fadeTo(500, 0.5);
        $(".cssload-loader").fadeTo(500, 1);

        if (this.state.loginLevel === 0) {
          axios
            .post(Server_Path.concat("login/"), {
              Username: this.state.Username,
              Password: this.state.Password,
            })
            .then((res) => {
              if (res.data["Status"] === "Success") {
                this.setState({
                  loginLevel: this.state.loginLevel + 1,
                  Usercode: res.data["Usercode"],
                });
                $("#login").fadeTo(500, 1);
                $(".cssload-loader").fadeTo(500, 0);
              } else if (res.data["Status"] === "Blocked") {
                alert("This Account Is Temporarily Blocked");
                $("#login").fadeTo(500, 1);
                $(".cssload-loader").fadeTo(500, 0);
              } else {
                alert("Invalid Details");
                $("#login").fadeTo(500, 1);
                $(".cssload-loader").fadeTo(500, 0);
              }
            })
            .catch((e) => {
              console.log(e);
              if (!e.Status) {
                alert("Something Went Wrong");
                $("#login").fadeTo(500, 1);
                $(".cssload-loader").fadeTo(500, 0);
              }
            });
        }
        if (this.state.loginLevel === 1) {
          axios
            .post(Server_Path.concat("login/"), {
              Usercode: this.state.Usercode,
              Pin: this.state.Pin,
            })
            .then((res) => {
              if (res.data["Status"] === "Success") {
                document.cookie = this.state.Usercode;
                this.props.history.push("/dashboard");
              } else {
                alert("Invalid Details");

                document.getElementsByClassName(
                  "login-tries"
                )[0].style.opacity = 1;

                if (this.state.tries > 1) {
                  this.setState({
                    tries: this.state.tries - 1,
                  });
                } else {
                  axios
                    .post(Server_Path.concat("login/"), {
                      Usercode: this.state.Usercode,
                    })
                    .then((res) => {
                      if (res.data["Status"] === "Success") {
                        this.setState({
                          tries: this.state.tries - 1,
                          loginLevel: this.state.loginLevel - 1,
                          Username: "",
                          Password: "",
                        });
                        alert("Account Blocked due to Invalid Attempts");
                      }
                    })
                    .catch((e) => {
                      console.log(e);
                      if (!e.Status) {
                        alert("Something Went Wrong");
                        $("#login").fadeTo(500, 1);
                        $(".cssload-loader").fadeTo(500, 0);
                      }
                    });
                }
              }

              $("#login").fadeTo(500, 1);
              $(".cssload-loader").fadeTo(500, 0);
            })
            .catch((e) => {
              console.log(e);
              if (!e.Status) {
                alert("Something Went Wrong");
                $("#login").fadeTo(500, 1);
                $(".cssload-loader").fadeTo(500, 0);
              }
            });
        }
      }
    }
    if (event.target.id === "previous") {
      $("#login").fadeTo(500, 0.5);
      $(".cssload-loader").fadeTo(500, 1);

      this.setState({
        loginLevel: this.state.loginLevel - 1,
        Username: "",
        Password: "",
      });

      $("#login").fadeTo(1000, 1);
      $(".cssload-loader").fadeTo(1000, 0);
    }
  }

  checkFields(loginLevel) {
    var flag = 0;

    if (loginLevel === 0) {
      if (String(this.state.Username) === "") {
        document.getElementsByTagName("label")[0].style.color = "red";
        flag = 1;
      }
      if (String(this.state.Password) === "") {
        document.getElementsByTagName("label")[1].style.color = "red";
        flag = 1;
      }
    }
    if (loginLevel === 1) {
      if (String(this.state.Pin) === "") {
        document.getElementsByTagName("label")[0].style.color = "red";
        flag = 1;
      }
    }

    return flag;
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    this.generateURLs();
  }

  render() {
    return (
      <div className="login">
        <Helmet>
          <title>Smart Stox | Login</title>
        </Helmet>
        <section id="loader">
          <div className="cssload-loader">
            <div className="cssload-inner cssload-one"></div>
            <div className="cssload-inner cssload-two"></div>
            <div className="cssload-inner cssload-three"></div>
          </div>
        </section>
        <section id="login">
          <div className="container-fluid">
            <div className="row">
              {(() => {
                if (this.state.loginLevel === 0) {
                  return (
                    <div className="container">
                      <div className="row login-card-row">
                        <div className="col-12 login-card-column ">
                          <div className="row login-heading-design-row">
                            <div className="col-12 login-heading-design d-flex justify-content-center align-items-center">
                              <img
                                src={smartstox}
                                alt="Smart Stox"
                                className="login-design-left"
                              />
                              <i className="bi bi-dot"></i>
                              <i className="bi bi-dot"></i>
                              <i className="bi bi-dot"></i>
                              <i className="bi bi-dot"></i>
                              <i className="bi bi-dot"></i>
                              <img
                                src={investyx_S}
                                alt="Investyx"
                                className="login-design-right"
                              />
                            </div>
                            <div className="col-12 login-heading">
                              <h5>Login to Your Investyx Account</h5>
                            </div>
                            <div className="col-12 login-form">
                              <label htmlFor="Username" className="">
                                Username<span className="required-star">*</span>
                              </label>
                              <input
                                onChange={this.onChange}
                                value={this.state.Username}
                                type="text"
                                id="Username"
                                name="Username"
                                className="form-control"
                              />
                              <label htmlFor="Password" className="">
                                Password
                                <span className="required-star">*</span>
                              </label>
                              <input
                                onChange={this.onChange}
                                type="Password"
                                id="Password"
                                value={this.state.Password}
                                name="Password"
                                className="form-control"
                              />
                              <div
                                className="login-button"
                                id="next"
                                onClick={this.onClick}
                              >
                                Login
                              </div>
                            </div>
                            <div className="col-12 login-forgot-password text-center ">
                              <a href={this.state.forgotpassword}>
                                Forgot Password?
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row under-card-row">
                        <div className="col-12 under-the-card-column">
                          <div className="row under-the-card-footer">
                            <div className="col-12 footer-design d-flex justify-content-center align-items-center">
                              <img src={investyx_H} alt="Investyx" />
                            </div>
                            <div className="col-12 footer-sign-up text-center">
                              <a href="https://investyx.netlify.app/signup">
                                Don't Have an Account? Sign Up Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                if (this.state.loginLevel === 1) {
                  return (
                    <div className="container">
                      <div className="row login-card-row">
                        <div className="col-12 login-card-column ">
                          <div className="row login-heading-design-row">
                            <div className="col-12 login-heading-design d-flex justify-content-center align-items-center">
                              <img
                                src={smartstox}
                                alt="Smart Stox"
                                className="login-design-left"
                              />
                              <i className="bi bi-dot"></i>
                              <i className="bi bi-dot"></i>
                              <i className="bi bi-dot"></i>
                              <i className="bi bi-dot"></i>
                              <i className="bi bi-dot"></i>
                              <img
                                src={investyx_S}
                                alt="Investyx"
                                className="login-design-right"
                              />
                            </div>
                            <div className="col-12 login-heading">
                              <h6 className="login-tries">
                                You Have {this.state.tries} Attempt(s) Left
                              </h6>
                              <h5>Login to Your Investyx Account</h5>
                            </div>
                            <div className="col-12 login-form">
                              <h4>{this.state.Usercode}</h4>
                              <label htmlFor="Pin" className="">
                                Pin
                                <span className="required-star">*</span>
                              </label>
                              <input
                                onChange={this.onChange}
                                type="Password"
                                id="Pin"
                                value={this.state.Pin}
                                maxLength="6"
                                name="Pin"
                                className="form-control"
                              />
                              <div
                                className="login-button"
                                id="next"
                                onClick={this.onClick}
                              >
                                Login
                              </div>
                            </div>
                            <div className="col-12 login-forgot-password text-center ">
                              <a href={this.state.forgotpassword}>
                                Forgot Password?
                              </a>
                            </div>
                            <div className="col-12 login-another-account text-center ">
                              <button
                                value="Another Account"
                                id="previous"
                                onClick={this.onClick}
                              >
                                Use Another Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
