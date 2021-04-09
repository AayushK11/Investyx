import React from "react";
import "bootstrap";
import "../Css/ConfirmAccount.css";
import "../Css/Loader.css";
import { Helmet } from "react-helmet";
import Investyx_S from "../Images/Investyx_S.png";
import axios from "axios";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class ConfirmAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Usercode: "", Pin: "", ConfirmPin: "" };
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
          } else if (res.data["Status"] === "Exists") {
            alert("Authentication Pin Exists. Cannot Modify It");
            $(".confirmaccount").fadeTo(500, 1);
            $(".cssload-loader").fadeTo(500, 0);
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
            $(".confirmaccount").fadeTo(500, 1);
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
              <div className="row confirmaccount-card-row">
                <div className="col-12 confirmaccount-card-column ">
                  <div className="row confirmaccount-heading-design-row">
                    <div className="col-12 confirmaccount-heading-design d-flex justify-content-around align-items-center">
                      <img
                        src={Investyx_S}
                        alt="Investyx"
                        className="confirmaccount-design-left"
                      />
                      <h5>Confirm Your Investyx Account</h5>
                    </div>
                    <div className="col-12 confirmaccount-form">
                      <label htmlFor="Usercode" className="">
                        Usercode<span className="required-star">*</span>
                      </label>
                      <input
                        onChange={this.onChange}
                        value={this.state.Usercode}
                        type="text"
                        id="Usercode"
                        name="Usercode"
                        className="form-control"
                      />
                      <label htmlFor="Pin" className="">
                        Pin
                        <span className="required-star">*</span>
                      </label>
                      <input
                        onChange={this.onChange}
                        type="Pin"
                        id="Pin"
                        value={this.state.Pin}
                        name="Pin"
                        className="form-control"
                      />
                      <label htmlFor="ConfirmPin" className="">
                        Confirm Pin
                        <span className="required-star">*</span>
                      </label>
                      <input
                        onChange={this.onChange}
                        type="ConfirmPin"
                        id="ConfirmPin"
                        value={this.state.ConfirmPin}
                        name="ConfirmPin"
                        className="form-control"
                      />
                      <div
                        className="confirmaccount-button"
                        id="next"
                        onClick={this.onClick}
                      >
                        Confirm
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
