import React from "react";
import "bootstrap";
import "./Css/Navbar.css";
import Investyx_H from "./Images/Investyx_H.png";

export default class NavigationBar extends React.Component {
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
      support: this.state.url.concat("/contactus"),
    });

    if (window.location.pathname === "/about") {
      document.getElementsByClassName("nav-link")[0].style.color = "#387ed1";
    }
    if (window.location.pathname === "/products") {
      document.getElementsByClassName("nav-link")[1].style.color = "#387ed1";
    }
    if (window.location.pathname === "/pricing") {
      document.getElementsByClassName("nav-link")[2].style.color = "#387ed1";
    }
    if (window.location.pathname === "/contactus") {
      document.getElementsByClassName("nav-link")[3].style.color = "#387ed1";
    }
  }

  componentDidMount() {
    this.generateURLs();
  }

  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-custom navbar-expand-lg navbar-fixed-top">
          <div className="container">
            <a className="navbar-brand" href={this.state.url}>
              <img src={Investyx_H} alt="Investyx" className="navbar-logo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              name="navbar-toggler"
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
