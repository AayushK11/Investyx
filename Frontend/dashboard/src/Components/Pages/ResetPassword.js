import React from "react";
import "bootstrap";
import "../Css/ResetPassword.css";
import "../Css/Loader.css";
import { Helmet } from "react-helmet";
import Investyx_S from "../Images/Investyx_S.png";
import axios from "axios";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      ConfirmPassword: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.checkFields = this.checkFields.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onClick(event) {
    event.preventDefault();
    var flag = this.checkFields();
    if (flag === 0) {
      $(".ResetPassword").fadeTo(5, 0.5);
      $(".cssload-loader").fadeTo(5, 0.5);
      axios
        .post(Server_Path.concat("forgotpassword/"), {
          Username: this.state.Username,
          Password: this.state.Password,
        })
        .then((res) => {
          if (res.data["Status"] === "Success") {
            alert("Password Updated Successfully");
            window.location = "/products";
          } else {
            alert("Invalid Details");
            $(".ResetPassword").fadeTo(500, 1);
            $(".cssload-loader").fadeTo(500, 0);
          }
        })
        .catch((e) => {
          console.log(e);
          if (!e.Status) {
            alert("Something Went Wrong");
            $(".ResetPassword").fadeTo(500, 1);
            $(".cssload-loader").fadeTo(500, 0);
          }
        });
    }
  }

  checkFields() {
    var flag = 0;

    Array.from(document.getElementsByTagName("label")).forEach(function (
      element
    ) {
      element.style.color = "#212529";
    });

    var passreg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (this.state.Username === "") {
      document.getElementsByTagName("label")[0].style.color = "red";
      flag = 1;
    }
    if (this.state.Password === "") {
      document.getElementsByTagName("label")[1].style.color = "red";
      flag = 1;
    }
    if (this.state.ConfirmPassword === "") {
      document.getElementsByTagName("label")[2].style.color = "red";
      flag = 1;
    }
    if (this.state.ConfirmPassword !== this.state.Password) {
      document.getElementsByTagName("label")[2].style.color = "red";
      document.getElementsByTagName("label")[1].style.color = "red";
      flag = 1;
    }
    if (passreg.test(String(this.state.Password).toLowerCase()) === false) {
      document.getElementsByTagName("label")[1].style.color = "red";
      flag = 1;
    }
    return flag;
  }

  render() {
    return (
      <div className="ResetPassword">
        <Helmet>
          <title>Investyx | Reset Password</title>
        </Helmet>
        <div className="container-fluid">
          <section id="loader">
            <div className="cssload-loader">
              <div className="cssload-inner cssload-one"></div>
              <div className="cssload-inner cssload-two"></div>
              <div className="cssload-inner cssload-three"></div>
            </div>
          </section>
          <section id="ResetPassword-section">
            <div className="container">
              <div className="row ResetPassword-card-row">
                <div className="col-12 ResetPassword-card-column ">
                  <div className="row ResetPassword-heading-design-row">
                    <div className="col-12 ResetPassword-heading-design d-flex justify-content-around align-items-center">
                      <img
                        src={Investyx_S}
                        alt="Investyx"
                        className="ResetPassword-design-left"
                      />
                      <h5>Reset Password</h5>
                    </div>
                    <div className="col-12 ResetPassword-form">
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
                        id="Pin"
                        value={this.state.Password}
                        name="Password"
                        className="form-control"
                      />
                      <label htmlFor="ConfirmPassword" className="">
                        Confirm Password
                        <span className="required-star">*</span>
                      </label>
                      <input
                        onChange={this.onChange}
                        type="Password"
                        id="ConfirmPassword"
                        value={this.state.ConfirmPassword}
                        name="ConfirmPassword"
                        className="form-control"
                      />
                      <div
                        className="ResetPassword-button"
                        id="next"
                        onClick={this.onClick}
                      >
                        Reset Password
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
