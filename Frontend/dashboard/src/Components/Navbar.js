import React from "react";
import "bootstrap";
import "./Css/Navbar.css";
import logo512 from "./Images/logo512.png";

export default class NavigationBar extends React.Component {
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
        support: this.state.url.concat("/contactus"),
      });
    }
    if (window.location.pathname === "/about") {
      this.setState({
        about: window.location.href,
        products: this.state.url.concat("/products"),
        pricing: this.state.url.concat("/pricing"),
        support: this.state.url.concat("/contactus"),
      });
      document.getElementsByClassName("nav-link")[0].style.color = "#387ed1";
    }
    if (window.location.pathname === "/products") {
      this.setState({
        about: this.state.url.concat("/about"),
        products: window.location.href,
        pricing: this.state.url.concat("/pricing"),
        support: this.state.url.concat("/contactus"),
      });
      document.getElementsByClassName("nav-link")[1].style.color = "#387ed1";
    }
    if (window.location.pathname === "/pricing") {
      this.setState({
        about: this.state.url.concat("/about"),
        products: this.state.url.concat("/products"),
        pricing: window.location.href,
        support: this.state.url.concat("/contactus"),
      });
      document.getElementsByClassName("nav-link")[2].style.color = "#387ed1";
    }
    if (window.location.pathname === "/contactus") {
      this.setState({
        about: this.state.url.concat("/about"),
        products: this.state.url.concat("/products"),
        pricing: this.state.url.concat("/pricing"),
        support: window.location.href,
      });
      document.getElementsByClassName("nav-link")[3].style.color = "#387ed1";
    }
  }

  componentDidMount() {
    this.generateURLs();
  }

  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-custom navbar-expand-lg navbar-static-top">
          <div className="container">
            <a className="navbar-brand" href={this.state.url}>
              <img src={logo512} alt="INWASTEMENt" className="navbar-logo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <a className="nav-link active" href={this.state.about}>
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href={this.state.products}>
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href={this.state.pricing}>
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href={this.state.support}>
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
