import React from "react";
import "bootstrap";
import "../Css/ForgotPassword.css";
import "../Css/Loader.css";
import { Helmet } from "react-helmet";
import Investyx_S from "../Images/Investyx_S.png";
import axios from "axios";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Pin: "",
      PanNumber: "",
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
      $(".forgotpassword").fadeTo(5, 0.5);
      $(".cssload-loader").fadeTo(5, 0.5);
      axios
        .post(Server_Path.concat("forgotpassword/"), {
          Username: this.state.Username,
          Pin: this.state.Pin,
          PanNumber: this.state.PanNumber,
        })
        .then((res) => {
          if (res.data["Status"] === "Success") {
            alert("Reset Email Sent Successfully");
            $(".forgotpassword").fadeTo(500, 1);
            $(".cssload-loader").fadeTo(500, 0);
          } else {
            alert("Invalid Details");
            $(".forgotpassword").fadeTo(500, 1);
            $(".cssload-loader").fadeTo(500, 0);
          }
        })
        .catch((e) => {
          console.log(e);
          if (!e.Status) {
            alert("Something Went Wrong");
            $(".forgotpassword").fadeTo(500, 1);
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

    if (this.state.Username === "") {
      document.getElementsByTagName("label")[0].style.color = "red";
      flag = 1;
    }
    if (this.state.Pin === "") {
      document.getElementsByTagName("label")[1].style.color = "red";
      flag = 1;
    }
    if (this.state.PanNumber === "") {
      document.getElementsByTagName("label")[2].style.color = "red";
      flag = 1;
    }
    return flag;
  }

  render() {
    return (
      <div className="forgotpassword">
        <Helmet>
          <title>Investyx | Forgot Password</title>
        </Helmet>
        <div className="container-fluid">
          <section id="loader">
            <div className="cssload-loader">
              <div className="cssload-inner cssload-one"></div>
              <div className="cssload-inner cssload-two"></div>
              <div className="cssload-inner cssload-three"></div>
            </div>
          </section>
          <section id="forgotpassword-section">
            <div className="container">
              <div className="row forgotpassword-card-row">
                <div className="col-12 forgotpassword-card-column ">
                  <div className="row forgotpassword-heading-design-row">
                    <div className="col-12 forgotpassword-heading-design d-flex justify-content-around align-items-center">
                      <img
                        src={Investyx_S}
                        alt="Investyx"
                        className="forgotpassword-design-left"
                      />
                      <h5>Forgot Password</h5>
                    </div>
                    <div className="col-12 forgotpassword-form">
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
                      <label htmlFor="Pin" className="">
                        Pin
                        <span className="required-star">*</span>
                      </label>
                      <input
                        onChange={this.onChange}
                        type="Password"
                        id="Pin"
                        value={this.state.Pin}
                        name="Pin"
                        className="form-control"
                      />
                      <label htmlFor="PanNumber" className="">
                        Pan Number
                        <span className="required-star">*</span>
                      </label>
                      <input
                        onChange={this.onChange}
                        type="PanNumber"
                        id="PanNumber"
                        value={this.state.PanNumber}
                        name="PanNumber"
                        className="form-control"
                      />
                      <div
                        className="forgotpassword-button"
                        id="next"
                        onClick={this.onClick}
                      >
                        Send Reset Email
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
