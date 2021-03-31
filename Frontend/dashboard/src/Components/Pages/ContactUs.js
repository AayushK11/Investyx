import React from "react";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
import "bootstrap";
import "../Css/ContactUs.css";
import "../Css/Loader.css";
import axios from "axios";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneno: "",
      emailid: "",
      issue: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFields = this.checkFields.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var flag = this.checkFields();
    if (flag === 0) {
      $(".contactus").fadeTo(500, 0.5);
      $(".cssload-loader").fadeTo(500, 1);
      axios
        .post(Server_Path.concat("support/"), {
          Support: this.state,
        })
        .then((res) => {
          if (res.data["Status"] === "Success") {
            alert(
              "Your Issue was Forwarded to our team, They will get back to you as soon as possible"
            );
            $(".contactus").fadeTo(500, 1);
            $(".cssload-loader").fadeTo(500, 0);
          }
        });
    }
  }

  checkFields() {
    var flag = 0;
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    Array.from(document.getElementsByTagName("label")).forEach(function (
      element
    ) {
      element.style.color = "#212529";
    });

    if (!Number(this.state.phoneno) || this.state.phoneno.length != 10) {
      document.getElementsByTagName("label")[2].style.color = "red";
      flag = 1;
    }
    if (reg.test(String(this.state.emailid).toLowerCase()) === false) {
      document.getElementsByTagName("label")[1].style.color = "red";
      flag = 1;
    }
    if (this.state.name === "") {
      document.getElementsByTagName("label")[0].style.color = "red";
      flag = 1;
    }
    if (this.state.issue === "") {
      document.getElementsByTagName("label")[3].style.color = "red";
      flag = 1;
    }
    return flag;
  }

  render() {
    return (
      <div className="contactus">
        <div className="container-fluid">
          <Navbar />
          <section id="loader">
            <div class="cssload-loader">
              <div class="cssload-inner cssload-one"></div>
              <div class="cssload-inner cssload-two"></div>
              <div class="cssload-inner cssload-three"></div>
            </div>
          </section>
          <section id="contactus-section">
            <div className="container">
              <div className="row">
                <div className="col-md-6 contactus-text">
                  <div className="row contactus-text-heading">
                    <h2>Need Support?</h2>
                  </div>
                  <div className="row contactus-text-passage">
                    <h5>
                      Fill out the corresponding form and try to be as precise
                      as possible. One of our team members will get back to you
                      as soon as they wake the fuck up from sleep
                    </h5>
                  </div>
                </div>
                <div className="col-md-6 contactus-form">
                  <div class="col-md-9 mb-md-0 mb-5">
                    <form
                      id="contact-form"
                      name="contact-form"
                      onSubmit={this.handleSubmit}
                    >
                      <div class="row">
                        <div class="col-md-12">
                          <div class="md-form mb-0">
                            <label for="name" class="">
                              Your name
                            </label>
                            <input
                              onChange={this.onChange}
                              type="text"
                              id="name"
                              name="name"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="md-form mb-0">
                            <label for="email" class="">
                              Your email
                            </label>
                            <input
                              onChange={this.onChange}
                              type="email"
                              id="emailid"
                              name="emailid"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="md-form mb-0">
                            <label for="phoneno" class="">
                              Your Phone Number
                            </label>
                            <input
                              onChange={this.onChange}
                              type="tel"
                              id="phoneno"
                              maxLength="10"
                              name="phoneno"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="md-form">
                            <label for="issue">Your message</label>
                            <textarea
                              onChange={this.onChange}
                              type="text"
                              id="issue"
                              name="issue"
                              rows="3"
                              class="form-control md-textarea"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div class="text-center text-md-left">
                        <div className="contactus-submit col-12 text-center">
                          <input
                            onChange={this.onChange}
                            type="submit"
                            className="submit-button"
                            value="Submit"
                          />
                        </div>
                      </div>
                    </form>
                    <div class="status"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    );
  }
}
