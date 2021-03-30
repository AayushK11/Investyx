import React from "react";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
import "bootstrap";
import "../Css/Landing.css";
import logo512 from "../Images/logo512.png";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.href,
    };
    this.generateURLs = this.generateURLs.bind(this);
  }

  generateURLs() {
    if (window.location.pathname === "/") {
      this.setState({
        signup: this.state.url.concat("signup"),
        products: this.state.url.concat("products"),
      });
    }
  }

  componentDidMount() {
    this.generateURLs();
  }

  render() {
    return (
      <div className="landing">
        <div className="container-fluid">
          <Navbar />
          <section id="home">
            <div className="container">
              <div className="row">
                <div className="welcome-design col-12 ">
                  <img src={logo512} alt="LODA" className="welcome-logo" />
                </div>
              </div>
              <div className="welcome-text col-12 text-center">
                <h2>Welcome to Smart Sex</h2>
                <h4>The one platform which provides free sex</h4>
              </div>
              <div className="welcome-sign-up col-12 text-center">
                <a className="signup-button" href={this.state.signup}>
                  Join the Prostitute Family Now
                </a>
              </div>
            </div>
          </section>
          <section id="services">
            <div className="container">
              <div className="row">
                <div className="service-design col-md-6 col-12">
                  <img src={logo512} alt="LODA" className="service-logo" />
                </div>
                <div className="service-text col-md-6 my-auto">
                  <div className="row service-heading">
                    <h2>Invest dont (In)Waste</h2>
                  </div>
                  <div className="row service-sub-heading me-5">
                    <h5>
                      Smart Sex tells you place your dick and the possible
                      returns you can receive from it to help you plan your next
                      Goa Vacation
                    </h5>
                  </div>
                  <div className="row service-services">
                    <div className="col-6">
                      <ul className="Finanical-UL">
                        <li>
                          <h6>Stocks</h6>
                        </li>
                        <li>
                          <h6>Systematic Investment Plans</h6>
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <ul className="Finanical-UL">
                        <li>
                          <h6>Mutual Funds</h6>
                        </li>
                        <li>
                          <h6>Currency Trends</h6>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="universe">
            <div className="container">
              <div className="row">
                <div className="universe-text col-md-6 col-12 my-auto px-5">
                  <div className="row universe-heading">
                    <h2>The Prostitute Family</h2>
                  </div>
                  <div className="row universe-sub-heading ">
                    <h5>
                      A Variety of Products all Powered by a Powerful Machine
                      Learning Alogorithm helping you fuck the correct place
                    </h5>
                  </div>
                  <div className="row universe-have-a-look ">
                    <a className="products-button" href={this.state.products}>
                      Have a Look at the Prostitutes
                    </a>
                  </div>
                </div>
                <div className="universe-design order-first order-md-last col-md-6 col-12">
                  <img src={logo512} alt="LODA" className="universe-logo" />
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}
