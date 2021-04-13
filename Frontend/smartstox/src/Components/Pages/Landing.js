import React from "react";
import NavbarPreAuth from "../Navbar_PreAuth.js";
// import Footer from "../Footer.js";
import { Helmet } from "react-helmet";
import "../Css/Landing.css";
import logo512 from "../Images/symbol.png";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: window.location.origin };
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
      <div className="landing">
        <Helmet>
          <title>Smart Stox</title>
        </Helmet>
        <NavbarPreAuth />
        <section id="smartstox-intro">
          <div className="container">
            <div className="row">
              <div className="intro-design order-first order-md-last col-md-6 col-12">
                <img
                  src={logo512}
                  alt="Intro Design"
                  className="intro-design"
                />
              </div>
              <div className="intro-text col-md-6 my-auto">
                <div className="row intro-heading">
                  <h2>Stocks Just Became Smarter</h2>
                </div>
                <div className="row intro-sub-heading me-5">
                  <h5>
                    Smart Stox is Invetyx's state of the art Stock Prediction
                    Platform, which analyses the trend a particular stock
                    follows and advises you to invest or sell.
                  </h5>
                </div>
                <div className="row intro-have-a-look ">
                  <a className="intro-button" href={this.state.login}>
                    Log-in using Investyx
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="smartstox-search">
          <div className="container">
            <div className="row">
              <div className="search-design order-first col-md-6 col-12">
                <img
                  src={logo512}
                  alt="Search Design"
                  className="search-design"
                />
              </div>
              <div className="search-text col-md-6 my-auto">
                <div className="row search-heading">
                  <h2>Search Just About Every Stock</h2>
                </div>
                <div className="row search-sub-heading me-5">
                  <h5>
                    Search over more than 1000 stocks listed on NSE and BSE. Oh,
                    and did we mention, you can add them to your watchlist and
                    set price triggers too.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="smartstox-ui">
          <div className="container">
            <div className="row">
              <div className="ui-design order-first order-md-last col-md-6 col-12">
                <img src={logo512} alt="UI Design" className="ui-design" />
              </div>
              <div className="ui-text col-md-6 my-auto">
                <div className="row ui-heading">
                  <h2>Simplistic and Interactive</h2>
                </div>
                <div className="row ui-sub-heading me-5">
                  <h5>
                    It took some time, but we created a simple and
                    easy-to-navigate User Interface. Everything is just a click
                    away from your Dashboard.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="smartstox-ml">
          <div className="container">
            <div className="row">
              <div className="ml-design order-first col-md-6 col-12">
                <img
                  src={logo512}
                  alt="Machine Learning Design"
                  className="ml-design"
                />
              </div>
              <div className="ml-text col-md-6 my-auto">
                <div className="row ml-heading">
                  <h2>Powerful Machine Learning Algorithm</h2>
                </div>
                <div className="row ml-sub-heading me-5">
                  <h5>
                    Smart Stox runs on a Carefully Designed, Powerful Machine
                    Learning Algorithm that ensures your profit margin increases
                    drastically.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="smartstox-chart">
          <div className="container">
            <div className="row">
              <div className="chart-design order-first order-md-last col-md-6 col-12">
                <img
                  src={logo512}
                  alt="Chart Design"
                  className="chart-design"
                />
              </div>
              <div className="chart-text col-md-6 my-auto">
                <div className="row chart-heading">
                  <h2>Beautiful Yet Accurate Charts</h2>
                </div>
                <div className="row chart-sub-heading me-5">
                  <h5>
                    Smart Stox uses Industry Level Chart APIs that ensures that
                    you always get Beautiful and Accurate Charts with a single
                    click
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="smartstox-prices">
          <div className="container">
            <div className="row">
              <div className="prices-design order-first col-md-6 col-12">
                <img
                  src={logo512}
                  alt="Prices Design"
                  className="prices-design"
                />
              </div>
              <div className="prices-text col-md-6 my-auto">
                <div className="row prices-heading">
                  <h2>To The Exact Rupee</h2>
                </div>
                <div className="row prices-sub-heading me-5">
                  <h5>
                    We use an Advanced Scraping Algorithm to deliver the exact
                    value of a particular stock as soon as it is updated.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="smartstox-mobile">
          <div className="container">
            <div className="row">
              <div className="mobile-design order-first order-md-last col-md-6 col-12">
                <img
                  src={logo512}
                  alt="Mobile Design"
                  className="mobile-design"
                />
              </div>
              <div className="mobile-text col-md-6 my-auto">
                <div className="row mobile-heading">
                  <h2>Mobile Friendly</h2>
                </div>
                <div className="row mobile-sub-heading me-5">
                  <h5>
                    Smart Stox adapts, improvises, and resizes to your device to
                    ensure you get the best possible experience.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="smartstox-register-now">
          <div className="container">
            <dic className="row">
              <div className="register-text col-12 text-center">
                <h2>Don't Have a Investyx Account?</h2>
                <h5>Three Plans, Four Platforms, Hundereds of Features.</h5>
              </div>
              <div className="register-button-row col-12 text-center">
                <a
                  className="register-button"
                  href="https://investyx.netlify.app/signup"
                >
                  Join the Family Now
                </a>
              </div>
            </dic>
          </div>
        </section>
      </div>
    );
  }
}
