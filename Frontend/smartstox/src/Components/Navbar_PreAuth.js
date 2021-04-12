import React from "react";
import "./Css/Navbar_PreAuth.css";
import "bootstrap";
import smartstox from "./Images/hlogo.png";

export default class NavbarPreAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
    };

    this.generateURLs = this.generateURLs.bind(this);
  }

  generateURLs() {
    this.setState({
      login: this.state.url.concat("/login"),
    });
  }

  componentDidMount() {
    this.generateURLs();
  }

  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-custom navbar-expand-lg fixed-top">
          <div className="container">
            <a className="navbar-brand" href={this.state.url}>
              <img src={smartstox} alt="Smart Stox" className="navbar-logo" />
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
                  <a
                    className="nav-link active join-now"
                    href={this.state.login}
                  >
                    Join Now
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
