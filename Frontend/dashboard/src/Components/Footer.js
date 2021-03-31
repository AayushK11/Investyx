import React from "react";
import "bootstrap";
import "./Css/Footer.css";
import logo512 from "./Images/logo512.png";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
    };

    this.generateURLs = this.generateURLs.bind(this);
  }

  generateURLs() {
    if (window.location.pathname === "/") {
      this.setState({
        about: this.state.url.concat("/about"),
        products: this.state.url.concat("/products"),
        pricing: this.state.url.concat("/pricing"),
        contactus: this.state.url.concat("/contactus"),
        signup: this.state.url.concat("/signup"),
        videos: this.state.url.concat("/videos"),
      });
    }
    if (window.location.pathname === "/about") {
      this.setState({
        about: window.location.href,
        products: this.state.url.concat("/products"),
        pricing: this.state.url.concat("/pricing"),
        contactus: this.state.url.concat("/contactus"),
        signup: this.state.url.concat("/signup"),
        videos: this.state.url.concat("/videos"),
      });
    }
    if (window.location.pathname === "/products") {
      this.setState({
        about: this.state.url.concat("/about"),
        products: window.location.href,
        pricing: this.state.url.concat("/pricing"),
        contactus: this.state.url.concat("/contactus"),
        signup: this.state.url.concat("/signup"),
        videos: this.state.url.concat("/videos"),
      });
    }
    if (window.location.pathname === "/pricing") {
      this.setState({
        about: this.state.url.concat("/about"),
        products: this.state.url.concat("/products"),
        pricing: window.location.href,
        contactus: this.state.url.concat("/contactus"),
        signup: this.state.url.concat("/signup"),
        videos: this.state.url.concat("/videos"),
      });
    }
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
            <div className="row space-between">
              <div className="col-sm-3 footer-section-1">
                <div className="footer-design">
                  <a className="footer-brand" href={this.state.url}>
                    <img
                      src={logo512}
                      alt="INWASTEMENt"
                      className="footer-logo"
                    />
                    Prostitution-Is-Life
                  </a>
                </div>
                <div className="footer-list">
                  <ul>
                    <li className="footer-item">
                      <h5>
                        <i className="fas fa-phone-alt"></i>
                        6969-Call-Your-Mom
                      </h5>
                    </li>
                    <li className="footer-item">
                      <h6>
                        <i className="far fa-copyright"></i>
                        2021 - Your Mom's Pussy
                      </h6>
                    </li>
                    <li className="footer-item">
                      <h6>All Rights Reserved</h6>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3 footer-section-2">
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
              <div className="col-sm-3 footer-section-3">
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
              <div className="col-sm-3 footer-section-4">
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
        </footer>
      </div>
    );
  }
}
