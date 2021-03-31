import React from "react";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
import "bootstrap";
import "../Css/Pricing.css";
import logo512 from "../Images/logo512.png";

export default class Pricing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
    };
    this.generateURLs = this.generateURLs.bind(this);
  }

  generateURLs() {
    if (window.location.pathname === "/pricing") {
      this.setState({
        signup: this.state.url.concat("/signup"),
      });
    }
    console.log(this.state.signup);
  }

  componentDidMount() {
    this.generateURLs();
  }

  render() {
    return (
      <div className="pricing">
        <div className="container-fluid">
          <Navbar />
          <section id="pricing-text">
            <div className="container">
              <div className="row">
                <div className="pricing-heading">
                  <h2>Low Charges. High Returns</h2>
                </div>
                <div className="pricing-sub-heading ">
                  <div className="row">
                    <h4>3 Monthly Plans. No Intraday Fee. Thats about it</h4>
                  </div>
                </div>
                <hr className="pricing-horizontal-line" />
              </div>
            </div>
          </section>
          <section id="pricing-charges">
            <div className="container">
              <div className="row">
                <div className="row pricing-row justify-content-around align-items-center mx-auto">
                  <div className="col-md-3 col-sm-6 pricing-column align-items-center mx-auto">
                    <img
                      src={logo512}
                      alt="0 Intraday Prediction Fee"
                      className="pricing-photo align-items-center mx-auto"
                    />
                    <div className="pricing-image-text">
                      <h4>0 Intraday Prediction Fee</h4>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 pricing-column align-items-center mx-auto">
                    <img
                      src={logo512}
                      alt="0 SIP Prediction Charges"
                      className="pricing-photo align-items-center mx-auto"
                    />
                    <div className="pricing-image-text">
                      <h4>0 SIP Prediction Charges</h4>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 pricing-column align-items-center mx-auto">
                    <img
                      src={logo512}
                      alt="0 SmallCase Prediction Charges"
                      className="pricing-photo align-items-center mx-auto"
                    />
                    <div className="pricing-image-text">
                      <h4>0 SmallCase Prediction Charges</h4>
                    </div>
                  </div>
                </div>
                <div className="row pricing-join-now align-items-center align-items-center mx-auto">
                  <div className="pricing-sign-up col-12 text-center">
                    <a className="signup-button" href={this.state.signup}>
                      Join the Prostitute Family Now
                    </a>
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
