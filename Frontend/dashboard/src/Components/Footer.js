import React from "react";
import "bootstrap";
import "./Css/Footer.css";
import Investyx_H_1 from "./Images/Investyx_H_1.png";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
    };

    this.generateURLs = this.generateURLs.bind(this);
  }

  generateURLs() {
    this.setState({
      about: this.state.url.concat("/about"),
      products: this.state.url.concat("/products"),
      pricing: this.state.url.concat("/pricing"),
      contactus: this.state.url.concat("/contactus"),
      signup: this.state.url.concat("/signup"),
      videos: this.state.url.concat("/videos"),
    });
  }

  componentDidMount() {
    this.generateURLs();
    console.log(window.location.origin);
  }

  render() {
    return (
      <div className="footer-container">
        <hr className="footer-horoizontal-line" />
        <footer className="page-footer pt-4">
          <div className="container text-md-left">
            <div className="row custom_align ">
              <div className="col-sm-3 col-6 footer-section-1">
                <div className="footer-design">
                  <a className="footer-brand" href={this.state.url}>
                    <img
                      src={Investyx_H_1}
                      alt="Investyx"
                      className="footer-logo"
                    />
                  </a>
                </div>
                <div className="footer-list">
                  <ul>
                    <li className="footer-item">
                      <h4>
                        <i className="fas fa-phone-alt"></i>
                        +91 9988776655
                      </h4>
                    </li>
                    <li className="footer-item">
                      <h4>
                        <i className="far fa-copyright"></i>
                        2021 - Investyx
                      </h4>
                    </li>
                    <li className="footer-item">
                      <h4>All Rights Reserved</h4>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3 col-6 footer-section-2">
                <div className="footer-heading">
                  <h4>Company</h4>
                </div>
                <div className="footer-list">
                  <ul>
                    <li className="footer-item">
                      <a className="footer-link" href={this.state.about}>
                        About
                      </a>
                    </li>
                    <li className="footer-item">
                      <a className="footer-link" href={this.state.products}>
                        Products
                      </a>
                    </li>
                    <li className="footer-item">
                      <a className="footer-link" href={this.state.pricing}>
                        Pricing
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3 col-6 footer-section-3">
                <div className="footer-heading">
                  <h4>Support</h4>
                </div>
                <div className="footer-list">
                  <ul>
                    <li className="footer-item">
                      <a className="footer-link" href={this.state.contactus}>
                        Contact Us
                      </a>
                    </li>
                    <li className="footer-item">
                      <a className="footer-link" href={this.state.videos}>
                        Videos
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3 col-6 footer-section-4">
                <div className="footer-heading">
                  <h4>Account</h4>
                </div>
                <div className="footer-list">
                  <ul>
                    <li className="footer-item">
                      <a className="footer-link" href={this.state.signup}>
                        Create An Account
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="footer-horoizontal-line" />
          <div className="container under-the-footer">
            <div className="row text-center">
              <div className="col-sm-6 text-lg-end">
                <a
                  target="_blank"
                  href="/termsandconditions"
                  title="Opens in a new tab"
                >
                  Terms and Conditions
                </a>
              </div>
              <div className="col-sm-6 text-lg-start">
                <a
                  target="_blank"
                  href="/privacypolicy"
                  title="Opens in a new tab"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
