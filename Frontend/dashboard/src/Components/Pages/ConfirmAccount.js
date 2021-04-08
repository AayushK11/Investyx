import React from "react";
import "bootstrap";
import "../Css/ConfirmAccount.css";
import "../Css/Loader.css";
import { Helmet } from "react-helmet";
import logo from "../Images/investyx_line.png";
import axios from "axios";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class ConfirmAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Usercode: "", Pin: "", ConfirmPin: "" };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFields = this.checkFields.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    var flag = this.checkFields();
    if (flag === 0) {
      $(".confirmaccount").fadeTo(5, 0.5);
      $(".cssload-loader").fadeTo(5, 0.5);
      axios
        .post(Server_Path.concat("register/"), {
          Usercode: this.state.Usercode,
          Pin: this.state.Pin,
        })
        .then((res) => {
          if (res.data["Status"] === "Success") {
            alert("Account Created Successfully");
            window.location = "/products";
          } else {
            alert("Invalid Usercode");
            $(".confirmaccount").fadeTo(500, 1);
            $(".cssload-loader").fadeTo(500, 0);
          }
        })
        .catch((e) => {
          console.log(e);
          if (!e.Status) {
            alert("Something Went Wrong");
            $(".contactus").fadeTo(500, 1);
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

    if (!Number(this.state.Pin) || this.state.Pin.length !== 6) {
      document.getElementsByTagName("label")[1].style.color = "red";
      flag = 1;
    }
    if (!Number(this.state.ConfirmPin) || this.state.ConfirmPin.length !== 6) {
      document.getElementsByTagName("label")[2].style.color = "red";
      flag = 1;
    }
    if (String(this.state.ConfirmPin) !== String(this.state.Pin)) {
      document.getElementsByTagName("label")[1].style.color = "red";
      document.getElementsByTagName("label")[2].style.color = "red";
      flag = 1;
    }
    if (this.state.Usercode === "" || this.state.Usercode.length !== 6) {
      document.getElementsByTagName("label")[0].style.color = "red";
      flag = 1;
    }
    return flag;
  }

  render() {
    return (
      <div className="confirmaccount">
        <Helmet>
          <title>Investyx | Confirm Account</title>
        </Helmet>
        <div className="container-fluid">
          <section id="loader">
            <div className="cssload-loader">
              <div className="cssload-inner cssload-one"></div>
              <div className="cssload-inner cssload-two"></div>
              <div className="cssload-inner cssload-three"></div>
            </div>
          </section>

          <section id="confirmaccount-section">
            <div className="container">
              <div className="row confirm-account-row">
                <div className="col-12 confirm-account-column">
                  <form
                    id="confirmaccount-form"
                    name="confirmaccount-form"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="row">
                      <div className="col-6">
                        <div className="confirmaccount-logo">
                          <img src={logo} alt="LODA" className="" />
                        </div>
                      </div>
                      <div className="col-6 confirmaccout-header">
                        <div className="confirmaccount-text">
                          <h5>Confirm Your Account</h5>
                        </div>
                      </div>
                    </div>
                    <div className="confirm-account-form-contents">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="md-form mb-0">
                            <label htmlFor="Usercode" className="">
                              Your Usercode
                              <span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              type="text"
                              id="Usercode"
                              name="Usercode"
                              maxLength="6"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="md-form mb-0">
                            <label htmlFor="Pin" className="">
                              Your Pin<span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              type="text"
                              id="Pin"
                              name="Pin"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="md-form mb-0">
                            <label htmlFor="ConfirmPin" className="">
                              Confirm Your Pin
                              <span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              type="text"
                              id="ConfirmPin"
                              name="ConfirmPin"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-center text-md-left">
                        <div className="contactus-submit col-12 text-center">
                          <input
                            onChange={this.onChange}
                            type="submit"
                            className="submit-button"
                            value="Submit"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
