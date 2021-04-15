import React from "react";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
import PaymentPortal from "./PaymentPortal.js";
import "bootstrap";
import "../Css/SignUp.css";
import "../Css/Loader.css";
import { Helmet } from "react-helmet";
import Register_Image_1 from "../Images/Register_Image_1.png";
import Register_Image_2 from "../Images/Register_Image_2.png";
import Register_Image_3 from "../Images/Register_Image_3.png";
import Investyx_V from "../Images/Investyx_V.png";
import axios from "axios";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationLevel: 0,
      firstname: "",
      lastname: "",
      address1: "",
      state: "",
      country: "",
      pincode: "",
      dateofbirth: "",
      username: "",
      password: "",
      pannumber: "",
      aadharnumber: "",
      bank: "",
      accounttype: "",
      accountnumber: "",
      ifsccode: "",
      bankaddress1: "",
      planvalue: "",
      TandC: "",
      PrivacyPolicy: "",
      RiskNotice: "",
      Paid: false,
      verifypassword: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChecked = this.onChecked.bind(this);
    this.checkFields = this.checkFields.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onClick(event) {
    event.preventDefault();

    Array.from(document.getElementsByTagName("label")).forEach(function (
      element
    ) {
      element.style.color = "#212529";
    });

    if (event.target.name === "next") {
      var flag = this.checkFields(this.state.registrationLevel);

      if (this.state.registrationLevel === 3) {
        var planprice = event.target.value;
        this.setState({ planvalue: planprice });
      }

      if (this.state.registrationLevel === 5) {
        this.setState({ Paid: true });
      }

      if (flag === 0) {
        $("#registration-section").fadeTo(500, 0.5);
        $(".cssload-loader").fadeTo(500, 1);

        if (this.state.registrationLevel === 0) {
          axios
            .post(Server_Path.concat("register/"), {
              Email: this.state.emailid,
              PhoneNumber: this.state.phonenumber,
            })
            .then((res) => {
              if (res.data["Status"] === "Success") {
                this.setState({
                  registrationLevel: this.state.registrationLevel + 1,
                });
                $("#registration-section").fadeTo(1000, 1);
                $(".cssload-loader").fadeTo(1000, 0);
              } else {
                alert(
                  "An Account Already Exists with This Email ID or Phone Number"
                );
                $("#registration-section").fadeTo(1000, 1);
                $(".cssload-loader").fadeTo(1000, 0);
              }
            })
            .catch((e) => {
              console.log(e);
              if (!e.Status) {
                alert("Something Went Wrong");
                $("#registration-section").fadeTo(1000, 1);
                $(".cssload-loader").fadeTo(1000, 0);
              }
            });
        } else if (this.state.registrationLevel === 1) {
          axios
            .post(Server_Path.concat("register/"), {
              Username: this.state.username,
            })
            .then((res) => {
              if (res.data["Status"] === "Success") {
                this.setState({
                  registrationLevel: this.state.registrationLevel + 1,
                });
                $("#registration-section").fadeTo(1000, 1);
                $(".cssload-loader").fadeTo(1000, 0);
              } else {
                alert("An Account Already Exists with This Username");
                $("#registration-section").fadeTo(1000, 1);
                $(".cssload-loader").fadeTo(1000, 0);
              }
            })
            .catch((e) => {
              console.log(e);
              if (!e.Status) {
                alert("Something Went Wrong");
                $("#registration-section").fadeTo(1000, 1);
                $(".cssload-loader").fadeTo(1000, 0);
              }
            });
        } else if (this.state.registrationLevel === 2) {
          axios
            .post(Server_Path.concat("register/"), {
              AadharNumber: this.state.aadharnumber,
              PanNumber: this.state.pannumber,
              AccountNumber: this.state.accountnumber,
            })
            .then((res) => {
              if (res.data["Status"] === "Success") {
                this.setState({
                  registrationLevel: this.state.registrationLevel + 1,
                });
                $("#registration-section").fadeTo(1000, 1);
                $(".cssload-loader").fadeTo(1000, 0);
              } else {
                alert("An Account Already Exists with These Details");
                $("#registration-section").fadeTo(1000, 1);
                $(".cssload-loader").fadeTo(1000, 0);
              }
            })
            .catch((e) => {
              console.log(e);
              if (!e.Status) {
                alert("Something Went Wrong");
                $("#registration-section").fadeTo(1000, 1);
                $(".cssload-loader").fadeTo(1000, 0);
              }
            });
        } else if (this.state.registrationLevel === 3) {
          this.setState({
            registrationLevel: this.state.registrationLevel + 1,
          });
          $("#registration-section").fadeTo(1000, 1);
          $(".cssload-loader").fadeTo(1000, 0);
        } else if (this.state.registrationLevel === 4) {
          this.setState({
            registrationLevel: this.state.registrationLevel + 1,
          });
          $("#registration-section").fadeTo(1000, 1);
          $(".cssload-loader").fadeTo(1000, 0);
        } else if (this.state.registrationLevel === 5) {
          if (String(this.state.address2) !== "undefined") {
            this.setState({
              address1: this.state.address1.concat(
                String(" ".concat(this.state.address2))
              ),
            });
          }
          if (String(this.state.bankaddress2) !== "undefined") {
            this.setState({
              bankaddress1: this.state.bankaddress1.concat(
                String(" ".concat(this.state.bankaddress2))
              ),
            });
          }

          axios
            .post(Server_Path.concat("register/"), {
              UserDetails: this.state,
            })
            .then((res) => {
              if (res.data["Status"] === "Success") {
                this.setState({
                  registrationLevel: this.state.registrationLevel + 1,
                });
                $("#registration-section").fadeTo(1000, 1);
                $(".cssload-loader").fadeTo(1000, 0);
              }
            })
            .catch((e) => {
              console.log(e);
              if (!e.Status) {
                alert("Something Went Wrong");
                $("#registration-section").fadeTo(1000, 1);
                $(".cssload-loader").fadeTo(1000, 0);
              }
            });
        }
      }
    }
    if (event.target.name === "previous") {
      this.setState({
        registrationLevel: this.state.registrationLevel - 1,
      });
    }
  }

  onChecked(e) {
    if (e.target.checked === true) {
      this.setState({ [e.target.name]: 1 });
    } else {
      this.setState({ [e.target.name]: 0 });
    }
  }

  checkFields(registrationLevel) {
    var flag = 0;

    if (registrationLevel === 0) {
      var emailreg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
      var pinreg = /^[1-9][0-9]{5}$/;
      var age =
        new Date(
          Date.now() - new Date(this.state.dateofbirth)
        ).getUTCFullYear() - 1970;

      if (
        !Number(this.state.phonenumber) ||
        this.state.phonenumber.length !== 10
      ) {
        document.getElementsByTagName("label")[5].style.color = "red";
        flag = 1;
      }
      if (emailreg.test(String(this.state.emailid).toLowerCase()) === false) {
        document.getElementsByTagName("label")[3].style.color = "red";
        flag = 1;
      }
      if (String(this.state.firstname) === "") {
        document.getElementsByTagName("label")[0].style.color = "red";
        flag = 1;
      }
      if (String(this.state.lastname) === "") {
        document.getElementsByTagName("label")[2].style.color = "red";
        flag = 1;
      }
      if (String(this.state.address1) === "") {
        document.getElementsByTagName("label")[7].style.color = "red";
        flag = 1;
      }
      if (String(this.state.state) === "") {
        document.getElementsByTagName("label")[9].style.color = "red";
        flag = 1;
      }
      if (String(this.state.country) === "") {
        document.getElementsByTagName("label")[10].style.color = "red";
        flag = 1;
      }
      if (pinreg.test(String(this.state.pincode).toLowerCase()) === false) {
        document.getElementsByTagName("label")[11].style.color = "red";
        flag = 1;
      }
      if (
        age < 18 ||
        isNaN(new Date(this.state.dateofbirth).getUTCFullYear())
      ) {
        document.getElementsByTagName("label")[4].style.color = "red";
        flag = 1;
      }
    }
    if (registrationLevel === 1) {
      var passreg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

      if (passreg.test(String(this.state.password).toLowerCase()) === false) {
        document.getElementsByTagName("label")[1].style.color = "red";
        document.getElementsByTagName("label")[2].style.color = "red";
        flag = 1;
      }
      if (this.state.verifypassword !== this.state.password) {
        document.getElementsByTagName("label")[1].style.color = "red";
        document.getElementsByTagName("label")[2].style.color = "red";
        flag = 1;
      }
      if (String(this.state.username) === "") {
        document.getElementsByTagName("label")[0].style.color = "red";
        flag = 1;
      }
    }
    if (registrationLevel === 2) {
      var accountreg = /[0-9]{9,18}/;

      if (
        String(this.state.pannumber) === "" ||
        this.state.pannumber.length !== 10
      ) {
        document.getElementsByTagName("label")[0].style.color = "red";
        flag = 1;
      }
      if (
        !Number(this.state.aadharnumber) ||
        this.state.aadharnumber.length !== 12
      ) {
        document.getElementsByTagName("label")[1].style.color = "red";
        flag = 1;
      }
      if (
        accountreg.test(String(this.state.accountnumber).toLowerCase()) ===
        false
      ) {
        document.getElementsByTagName("label")[4].style.color = "red";
        flag = 1;
      }
      if (
        String(this.state.ifsccode) === "" ||
        this.state.ifsccode.length !== 11
      ) {
        document.getElementsByTagName("label")[5].style.color = "red";
        flag = 1;
      }
      if (String(this.state.bank) === "") {
        document.getElementsByTagName("label")[2].style.color = "red";
        flag = 1;
      }
      if (String(this.state.accounttype) === "") {
        document.getElementsByTagName("label")[3].style.color = "red";
        flag = 1;
      }
      if (String(this.state.bankaddress1) === "") {
        document.getElementsByTagName("label")[6].style.color = "red";
        flag = 1;
      }
    }
    if (registrationLevel === 4) {
      if (this.state.TandC !== 1) {
        alert("Please Accept the Terms and Conditions");
        flag = 1;
      } else if (this.state.PrivacyPolicy !== 1) {
        alert("Please Accept the Privacy Notice");
        flag = 1;
      } else if (this.state.RiskNotice !== 1) {
        alert("Please Accept the Terms of Use");
        flag = 1;
      }
    }

    return flag;
  }

  render() {
    return (
      <div className="signup" >
        <Helmet>
          <title>Investyx | Register</title>
        </Helmet>
        <section id="loader">
          <div className="cssload-loader">
            <div className="cssload-inner cssload-one"></div>
            <div className="cssload-inner cssload-two"></div>
            <div className="cssload-inner cssload-three"></div>
          </div>
        </section>
        <section id="registration-section" >
          {(() => {
            if (this.state.registrationLevel === 0) {
              return (
                <div className="container-fluid">
                  <Navbar />
                  <div className="container">
                    <div className="row">
                      <div className="register-form col-md-6 col-12 my-auto">
                        <div className="register-heading row">
                          <h2>Lets Start With Some Basic Details</h2>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-sm-4 col-12">
                            <label htmlFor="firstname" className="">
                              First Name<span className="required-star">*</span>
                            </label>
                            <input
                              value={this.state.firstname}
                              onChange={this.onChange}
                              type="text"
                              id="firstname"
                              name="firstname"
                              className="form-control"
                            />
                          </div>
                          <div className="register-form-column col-sm-4 col-12">
                            <label htmlFor="middlename" className="">
                              Middle Name
                            </label>
                            <input
                              value={this.state.middlename}
                              onChange={this.onChange}
                              type="text"
                              id="middlename"
                              name="middlename"
                              className="form-control"
                            />
                          </div>
                          <div className="register-form-column col-sm-4 col-12">
                            <label htmlFor="lastname" className="">
                              Last Name<span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.lastname}
                              type="text"
                              id="lastname"
                              name="lastname"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-sm-8 col-12">
                            <label htmlFor="emailid" className="">
                              Email ID<span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.emailid}
                              type="text"
                              id="emailid"
                              name="emailid"
                              className="form-control"
                            />
                          </div>
                          <div className="register-form-column col-sm-4 col-12">
                            <label
                              htmlFor="dateofbirth"
                              className=""
                              data-toggle="tooltip"
                              title="You Should be 18+ Years of Age to use this platform"
                            >
                              Date Of Birth
                              <span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              type="date"
                              id="dateofbirth"
                              value={this.state.dateofbirth}
                              name="dateofbirth"
                              className="form-control"
                              placeholder="dd-mm-yyyy"
                              min="1900-01-01"
                              max="2099-12-31"
                            />
                          </div>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-sm-6 col-12">
                            <label htmlFor="phonenumber" className="">
                              Phone Number
                              <span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              type="tel"
                              maxLength="10"
                              id="phonenumber"
                              value={this.state.phonenumber}
                              name="phonenumber"
                              className="form-control"
                            />
                          </div>
                          <div className="register-form-column col-sm-6 col-12">
                            <label htmlFor="telephonenumber" className="">
                              Telephone Number
                            </label>
                            <input
                              onChange={this.onChange}
                              type="tel"
                              value={this.state.telephonenumber}
                              maxLength="10"
                              id="telephonenumber"
                              name="telephonenumber"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-md-12 col-12">
                            <label htmlFor="address1" className="">
                              Address Line 1
                              <span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              type="text"
                              value={this.state.address1}
                              id="address1"
                              name="address1"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-md-12 col-12">
                            <label htmlFor="address2" className="">
                              Address Line 2
                            </label>
                            <input
                              onChange={this.onChange}
                              type="text"
                              value={this.state.address2}
                              id="address2"
                              name="address2"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-sm-4 col-12">
                            <label htmlFor="state" className="">
                              State<span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              type="text"
                              value={this.state.state}
                              id="state"
                              name="state"
                              className="form-control"
                            />
                          </div>
                          <div className="register-form-column col-sm-4 col-12">
                            <label htmlFor="country" className="">
                              Country<span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.country}
                              type="text"
                              id="country"
                              name="country"
                              className="form-control"
                            />
                          </div>
                          <div className="register-form-column col-sm-4 col-12">
                            <label htmlFor="pincode" className="">
                              Pin Code<span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              type="tel"
                              value={this.state.pincode}
                              maxLength="6"
                              id="pincode"
                              name="pincode"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="register-input-form row justify-content-end">
                          <div className="register-form-column-button col-md-4 col-12">
                            <button
                              className="next-button"
                              name="next"
                              id="next"
                              onClick={this.onClick}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="register-graphic col-md-6">
                        <img
                          src={Register_Image_1}
                          alt="quote"
                          className="register-graphic-design"
                        />
                      </div>
                    </div>
                  </div>
                  <Footer />
                </div>
              );
            }
            if (this.state.registrationLevel === 1) {
              return (
                <div className="container-fluid">
                  <Navbar />
                  <div className="container">
                    <div className="row">
                      <div className="register-form col-md-6 col-12 my-auto">
                        <div className="register-heading row">
                          <h2>Create an Account</h2>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-sm-12 col-12">
                            <label htmlFor="username" className="">
                              Username<span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.username}
                              type="text"
                              id="username"
                              name="username"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-sm-6 col-12">
                            <label
                              htmlFor="password"
                              className=""
                              data-toggle="tooltip"
                              title="Password Should be 8+ Characters Long with Numbers and Special Symbols"
                            >
                              Password<span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.password}
                              type="password"
                              id="password"
                              name="password"
                              className="form-control"
                            />
                          </div>
                          <div className="register-form-column col-sm-6 col-12">
                            <label htmlFor="verifypassword" className="">
                              Verify Password
                              <span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              type="password"
                              id="verifypassword"
                              value={this.state.verifypassword}
                              name="verifypassword"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="register-input-form row justify-content-between">
                          <div className="register-form-column-button col-md-4 col-6">
                            <button
                              className="previous-button"
                              name="previous"
                              id="previous"
                              onClick={this.onClick}
                            >
                              Previous
                            </button>
                          </div>
                          <div className="register-form-column-button col-md-4 col-6">
                            <button
                              className="next-button"
                              name="next"
                              id="next"
                              onClick={this.onClick}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="register-graphic col-md-6">
                        <img
                          src={Register_Image_2}
                          alt="Quote"
                          className="register-graphic-design"
                        />
                      </div>
                    </div>
                  </div>
                  <Footer />
                </div>
              );
            }
            if (this.state.registrationLevel === 2) {
              return (
                <div className="container-fluid">
                  <Navbar />
                  <div className="container">
                    <div className="row">
                      <div className="register-form col-md-6 col-12 my-auto">
                        <div className="register-heading row">
                          <h2>A Little Bit Your Financial Details</h2>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-sm-6 col-12">
                            <label htmlFor="pannumber" className="">
                              Pan Number<span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.pannumber}
                              type="text"
                              id="pannumber"
                              name="pannumber"
                              className="form-control"
                            />
                          </div>
                          <div className="register-form-column col-sm-6 col-12">
                            <label htmlFor="aadharnumber" className="">
                              Aadhar Number
                              <span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.aadharnumber}
                              type="tel"
                              maxLength="12"
                              id="aadharnumber"
                              name="aadharnumber"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-sm-6 col-12">
                            <label htmlFor="bank" className="">
                              Bank<span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.bank}
                              list="banklist"
                              type="text"
                              id="bank"
                              name="bank"
                              className="form-control"
                            />
                            <datalist id="banklist">
                              <option value="State Bank of India" />
                              <option value="ICICI Bank" />
                              <option value="HDFC Bank" />
                              <option value="Axis Bank" />
                              <option value="Kotak Mahindra Bank" />
                              <option value="IndusInd Bank" />
                              <option value="Bank of Baroda" />
                              <option value="Punjab National Bank" />
                              <option value="YES Bank" />
                              <option value="IDBI Bank" />
                              <option value="Bank of Maharashtra" />
                            </datalist>
                          </div>
                          <div className="register-form-column col-sm-6 col-12">
                            <label htmlFor="accounttype" className="">
                              Account Type
                              <span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.accounttype}
                              list="accountlist"
                              type="text"
                              id="accounttype"
                              name="accounttype"
                              className="form-control"
                            />
                            <datalist id="accountlist">
                              <option value="Savings Account" />
                              <option value="Current Account" />
                            </datalist>
                          </div>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-sm-6 col-12">
                            <label htmlFor="accountnumber" className="">
                              Account Number
                              <span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.accountnumber}
                              type="tel"
                              maxLength="18"
                              id="accountnumber"
                              name="accountnumber"
                              className="form-control"
                            />
                          </div>
                          <div className="register-form-column col-sm-6 col-12">
                            <label htmlFor="ifsccode" className="">
                              IFSC Code
                              <span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.ifsccode}
                              type="text"
                              maxLength="11"
                              id="ifsccode"
                              name="ifsccode"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-md-12 col-12">
                            <label htmlFor="bankaddress1" className="">
                              Bank Address Line 1
                              <span className="required-star">*</span>
                            </label>
                            <input
                              onChange={this.onChange}
                              type="text"
                              value={this.state.bankaddress1}
                              id="bankaddress1"
                              name="bankaddress1"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-md-12 col-12">
                            <label htmlFor="bankaddress2" className="">
                              Bank Address Line 2
                            </label>
                            <input
                              onChange={this.onChange}
                              type="text"
                              value={this.state.bankaddress2}
                              id="bankaddress2"
                              name="bankaddress2"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="register-input-form row justify-content-between">
                          <div className="register-form-column-button col-md-4 col-6">
                            <button
                              className="previous-button"
                              name="previous"
                              id="previous"
                              onClick={this.onClick}
                            >
                              Previous
                            </button>
                          </div>
                          <div className="register-form-column-button col-md-4 col-6">
                            <button
                              className="next-button"
                              name="next"
                              id="next"
                              onClick={this.onClick}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="register-graphic col-md-6">
                        <img
                          src={Register_Image_3}
                          alt="quote"
                          className="register-graphic-design"
                        />
                      </div>
                    </div>
                  </div>
                  <Footer />
                </div>
              );
            }
            if (this.state.registrationLevel === 3) {
              return (
                <div className="container-fluid">
                  <Navbar />

                  <div className="register-form ">
                    <div className="register-heading ">
                      <h2>Choose a Plan Right For You</h2>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="register-input-form col-lg-4 col-sm-4 ">
                          <div className="register-form-column ">
                            <div className="register-form-plan ">
                              <div className="register-plan-price ">
                                <h4>Amateur Plan</h4>
                              </div>
                              <div className="register-plan-details">
                                <ul className="register-plan-details-list my-auto px-0">
                                  <li className="register-plan-detail-item text-primary">
                                    <i className="fas fa-check-circle"></i> Set
                                    triggers for upto 5 Stocks
                                  </li>
                                  <li className="register-plan-detail-item text-primary">
                                    <i className="fas fa-check-circle"></i>{" "}
                                    Predict Future of Select Stock Prices
                                  </li>
                                  <hr></hr>
                                  <h4>Additional Benefits</h4>
                                  <li className="register-plan-detail-item text-muted">
                                    <i className="fas fa-times-circle"></i>{" "}
                                    Predict Performance of SIP / Mutual Fund
                                  </li>
                                  <li className="register-plan-detail-item text-muted">
                                    <i className="fas fa-times-circle"></i>{" "}
                                    Predict Performance of SmartCase
                                  </li>
                                  <li className="register-plan-detail-item text-muted">
                                    <i className="fas fa-times-circle"></i>{" "}
                                    Predict Performance of a Currency
                                  </li>
                                </ul>
                              </div>
                              <div className="register-plan-select ">
                                <button
                                  className="next-button"
                                  name="next"
                                  value="99"
                                  id="previous"
                                  onClick={this.onClick}
                                >
                                  ₹99
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="register-input-form col-lg-4 col-sm-4 ">
                          <div className="register-form-column ">
                            <div className="register-form-plan ">
                              <div className="register-plan-price ">
                                <h4>Pro Plan</h4>
                              </div>
                              <div className="register-plan-details">
                                <ul className="register-plan-details-list my-auto px-0">
                                  <li className="register-plan-detail-item text-primary">
                                    <i className="fas fa-check-circle"></i> Set
                                    triggers for upto 10 Stocks
                                  </li>
                                  <li className="register-plan-detail-item text-primary">
                                    <i className="fas fa-check-circle"></i>{" "}
                                    Predict Future of Select Stock Prices
                                  </li>
                                  <hr></hr>
                                  <h4>Additional Benefits</h4>
                                  <li className="register-plan-detail-item text-primary">
                                    <i className="fas fa-check-circle"></i>{" "}
                                    Predict Performance of SIP / Mutual Fund
                                  </li>
                                  <li className="register-plan-detail-item text-muted">
                                    <i className="fas fa-times-circle"></i>{" "}
                                    Predict Performance of SmartCase
                                  </li>
                                  <li className="register-plan-detail-item text-muted">
                                    <i className="fas fa-times-circle"></i>{" "}
                                    Predict Performance of a Currency
                                  </li>
                                </ul>
                              </div>
                              <div className="register-plan-select ">
                                <button
                                  className="next-button"
                                  name="next"
                                  value="249"
                                  id="previous"
                                  onClick={this.onClick}
                                >
                                  ₹249
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="register-input-form col-lg-4 col-sm-4 ">
                          <div className="register-form-column ">
                            <div className="register-form-plan">
                              <div className="register-plan-price ">
                                <h4>Ultra Pro Max Plan</h4>
                              </div>
                              <div className="register-plan-details ">
                                <ul className="register-plan-details-list my-auto px-0">
                                  <li className="register-plan-detail-item text-primary">
                                    <i className="fas fa-check-circle"></i> Set
                                    triggers for upto 20 Stocks
                                  </li>
                                  <li className="register-plan-detail-item text-primary">
                                    <i className="fas fa-check-circle"></i>{" "}
                                    Predict Future of Select Stock Prices
                                  </li>
                                  <hr></hr>
                                  <h4>Additional Benefits</h4>
                                  <li className="register-plan-detail-item text-primary">
                                    <i className="fas fa-check-circle"></i>{" "}
                                    Predict Performance of SIP / Mutual Fund
                                  </li>
                                  <li className="register-plan-detail-item text-primary">
                                    <i className="fas fa-check-circle"></i>{" "}
                                    Predict Performance of SmartCase
                                  </li>
                                  <li className="register-plan-detail-item text-primary">
                                    <i className="fas fa-check-circle"></i>{" "}
                                    Predict Performance of a Currency
                                  </li>
                                </ul>
                              </div>
                              <div className="register-plan-select ">
                                <button
                                  className="next-button"
                                  name="next"
                                  value="499"
                                  id="previous"
                                  onClick={this.onClick}
                                >
                                  ₹499
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="register-input-form row justify-content-between">
                          <div className="register-form-column-button col-md-4 col-6">
                            <button
                              className="previous-button"
                              name="previous"
                              id="previous"
                              onClick={this.onClick}
                            >
                              Previous
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Footer />
                </div>
              );
            }
            if (this.state.registrationLevel === 4) {
              return (
                <div className="container-fluid fullpage">
                  <Navbar />
                  <div className="container">
                    <div className="row">
                      <div className="register-form col-md-6 col-12 my-auto">
                        <div className="register-heading row">
                          <h2>Just One Last Thing</h2>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-sm-12 col-12">
                            <span className="register-form-checkbox">
                              <input
                                title="Please Read and Accept the Terms and Conditions"
                                id="AcceptTandC"
                                name="TandC"
                                type="checkbox"
                                className="required"
                                onClick={this.onChecked}
                              />
                            </span>
                            <span title="text-tnc"> I accept the </span>{" "}
                            <a
                              target="_blank"
                              href="/termsandconditions"
                              title="Opens in a new tab"
                            >
                              Terms and Conditions
                            </a>
                          </div>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-sm-12 col-12">
                            <span className="register-form-checkbox">
                              <input
                                title="Please Read and Accept the Privacy Policy"
                                id="AcceptPP"
                                name="PrivacyPolicy"
                                type="checkbox"
                                className="required"
                                onClick={this.onChecked}
                              />
                            </span>
                            <span title="text-pp"> I accept the </span>
                            <a
                              target="_blank"
                              href="/privacypolicy"
                              title="Opens in a new tab"
                            >
                              Privacy Policy
                            </a>
                          </div>
                        </div>
                        <div className="register-input-form row">
                          <div className="register-form-column col-sm-12 col-12">
                            <span className="register-form-checkbox">
                              <input
                                id="AcceptPP"
                                name="RiskNotice"
                                type="checkbox"
                                className="required"
                                onClick={this.onChecked}
                              />
                            </span>
                            <span title="text-pp">
                              {" "}
                              I accept that all Trades made by me will be solely
                              my responsibility
                            </span>
                          </div>
                        </div>
                        <div className="register-input-form row justify-content-between">
                          <div className="register-form-column-button col-md-4 col-6">
                            <button
                              className="previous-button"
                              name="previous"
                              id="previous"
                              onClick={this.onClick}
                            >
                              Previous
                            </button>
                          </div>
                          <div className="register-form-column-button col-md-4 col-6">
                            <button
                              className="next-button"
                              name="next"
                              id="next"
                              onClick={this.onClick}
                            >
                              Create Account
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="register-graphic col-md-6">
                        <img
                          src={Investyx_V}
                          alt="Investyx_V"
                          className="register-graphic-design"
                        />
                      </div>
                    </div>
                  </div>
                  <Footer />
                </div>
              );
            }
            if (this.state.registrationLevel === 5) {
              return (
                <div className="container-fluid" >
                  <div className="container">
                    <div className="row">
                      <PaymentPortal
                        price={this.state.planvalue}
                        onClick={this.onClick}
                      />
                    </div>
                  </div>
                </div>
              );
            }
            if (this.state.registrationLevel === 6) {
              return (
                <div className="container-fluid">
                  <Navbar />
                  <div className="container">
                    <div className="row">
                      <div className="register-completion-graphic col-12">
                        <div className="register-graphic col-12">
                          <img
                            src={Investyx_V}
                            alt="LODA"
                            className="register-graphic-design"
                          />
                        </div>
                        <div className="register-completion-text col-12 text-center">
                          <h2>Your Account Was Created Succesfully</h2>
                          <h4>
                            All That's Left Now is Confirming Your Account which
                            can be done via your email
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Footer />
                </div>
              );
            }
          })()}
        </section>
      </div>
    );
  }
}
