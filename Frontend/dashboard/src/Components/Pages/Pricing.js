import React from "react";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
import { Helmet } from "react-helmet";
import "bootstrap";
import "../Css/Pricing.css";

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
        <Helmet>
          <title>Investyx | Pricing</title>
        </Helmet>
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
                <div className="register-input-form col-lg-4 col-sm-4 ">
                  <div className="register-form-column ">
                    <div className="register-form-plan ">
                
                      <div className="register-plan-price ">
                        
                        <h4 className="h4size">Amateur Plan</h4>
                      </div>
                      <div className="register-plan-details">
                        <ul className="register-plan-details-list my-auto px-0">
                          <li className="register-plan-detail-item text-primary">
                            <i className="fas fa-check-circle"></i> Set triggers
                            for upto 5 Stocks
                          </li>
                          <li className="register-plan-detail-item text-primary">
                            <i className="fas fa-check-circle"></i> Predict
                            Future of Select Stock Prices
                          </li>
                          <hr></hr>
                          <h4 className="h4size">Additional Benefits</h4>
                          <li className="register-plan-detail-item text-muted">
                            <i className="fas fa-times-circle"></i> Predict
                            Performance of SIP / Mutual Fund
                          </li>
                          <li className="register-plan-detail-item text-muted">
                            <i className="fas fa-times-circle"></i> Predict
                            Performance of SmartCase
                          </li>
                          <li className="register-plan-detail-item text-muted">
                            <i className="fas fa-times-circle"></i> Predict
                            Performance of a Currency
                          </li>
                        </ul>
                        <hr></hr>
                        <h4 className="h4size">₹99</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="register-input-form col-lg-4 col-sm-4 ">
                  <div className="register-form-column ">
                    <div className="register-form-plan ">
                      <div className="register-plan-price ">
                        <h4 className="h4size">Pro Plan</h4>
                      </div>
                      <div className="register-plan-details">
                        <ul className="register-plan-details-list my-auto px-0">
                          <li className="register-plan-detail-item text-primary">
                            <i className="fas fa-check-circle"></i> Set triggers
                            for upto 10 Stocks
                          </li>
                          <li className="register-plan-detail-item text-primary">
                            <i className="fas fa-check-circle"></i> Predict
                            Future of Select Stock Prices
                          </li>
                          <hr></hr>
                          <h4 className="h4size">Additional Benefits</h4>
                          <li className="register-plan-detail-item text-primary">
                            <i className="fas fa-check-circle"></i> Predict
                            Performance of SIP / Mutual Fund
                          </li>
                          <li className="register-plan-detail-item text-muted">
                            <i className="fas fa-times-circle"></i> Predict
                            Performance of SmartCase
                          </li>
                          <li className="register-plan-detail-item text-muted">
                            <i className="fas fa-times-circle"></i> Predict
                            Performance of a Currency
                          </li>
                        </ul>
                        <hr></hr>
                        <h4 className="h4size">₹249</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="register-input-form col-lg-4 col-sm-4 ">
                  <div className="register-form-column ">
                    <div className="register-form-plan">
                      <div className="register-plan-price ">
                        <h4 className="h4size" >Ultra Pro Max Plan</h4>
                      </div>
                      <div className="register-plan-details ">
                        <ul className="register-plan-details-list my-auto px-0">
                          <li className="register-plan-detail-item text-primary">
                            <i className="fas fa-check-circle"></i> Set triggers
                            for upto 20 Stocks
                          </li>
                          <li className="register-plan-detail-item text-primary">
                            <i className="fas fa-check-circle"></i> Predict
                            Future of Select Stock Prices
                          </li>
                          <hr></hr>
                          <h4 className="h4size"> Additional Benefits</h4>
                          <li className="register-plan-detail-item text-primary">
                            <i className="fas fa-check-circle"></i> Predict
                            Performance of SIP / Mutual Fund
                          </li>
                          <li className="register-plan-detail-item text-primary">
                            <i className="fas fa-check-circle"></i> Predict
                            Performance of SmartCase
                          </li>
                          <li className="register-plan-detail-item text-primary">
                            <i className="fas fa-check-circle"></i> Predict
                            Performance of a Currency
                          </li>
                        </ul>
                        <hr></hr>
                        <h4 className="h4size">₹499</h4>
                      </div>
                    </div>
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
