import React from "react";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
import "bootstrap";
import "../Css/Products.css";
import logo512 from "../Images/logo512.png";

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.href,
    };
  }

  render() {
    return (
      <div className="landing">
        <div className="container-fluid">
          <Navbar />
          <section id="products-stocks">
            <div className="container">
              <div className="row">
                <div className="products-design col-md-6 col-12">
                  <a
                    className="products-image-button"
                    href="https://smartstox.netlify.app/"
                  >
                    <img src={logo512} alt="LODA" className="products-logo" />
                  </a>
                </div>
                <div className="products-text col-md-6 my-auto">
                  <div className="row products-heading">
                    <h2>Smart Stox</h2>
                  </div>
                  <div className="row products-sub-heading me-5">
                    <h5>
                      Predict how each stock will perform over a period of a
                      time. Plan your investment in stocks the right way
                    </h5>
                  </div>
                  <div className="row products-have-a-look ">
                    <a
                      className="products-button"
                      href="https://smartstox.netlify.app/"
                    >
                      Take Me There
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="products-sips">
            <div className="container">
              <div className="row">
                <div className="products-design order-first order-md-last col-md-6 col-12">
                  <a
                    className="products-image-button"
                    href="https://smartsips.netlify.app/"
                  >
                    <img src={logo512} alt="LODA" className="products-logo" />
                  </a>
                </div>
                <div className="products-text col-md-6 my-auto">
                  <div className="row products-heading">
                    <h2>Smart SIPs</h2>
                  </div>
                  <div className="row products-sub-heading me-5">
                    <h5>
                      Find out how much will each SIP give in returns. Invest
                      with sureity
                    </h5>
                  </div>
                  <div className="row products-have-a-look ">
                    <a
                      className="products-button"
                      href="https://smartsips.netlify.app/"
                    >
                      Take Me There
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="products-case">
            <div className="container">
              <div className="row">
                <div className="products-design col-md-6 col-12">
                  <a
                    className="products-image-button"
                    href="https://smartcase.netlify.app/"
                  >
                    <img src={logo512} alt="LODA" className="products-logo" />
                  </a>
                </div>
                <div className="products-text col-md-6 my-auto">
                  <div className="row products-heading">
                    <h2>Smart Case</h2>
                  </div>
                  <div className="row products-sub-heading me-5">
                    <h5>
                      Invest in a Bucket of Stocks knowing which will yield how
                      much. Make the currect basket
                    </h5>
                  </div>
                  <div className="row products-have-a-look ">
                    <a
                      className="products-button"
                      href="https://smartcase.netlify.app/"
                    >
                      Take Me There
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="products-currency">
            <div className="container">
              <div className="row">
                <div className="products-design order-first order-md-last col-md-6 col-12">
                  <a
                    className="products-image-button"
                    href="https://smartcurrency.netlify.app/"
                  >
                    <img src={logo512} alt="LODA" className="products-logo" />
                  </a>
                </div>
                <div className="products-text col-md-6 my-auto">
                  <div className="row products-heading">
                    <h2>Smart Currency</h2>
                  </div>
                  <div className="row products-sub-heading me-5">
                    <h5>Invest in Currency and float in cash tomorrow</h5>
                  </div>
                  <div className="row products-have-a-look ">
                    <a
                      className="products-button"
                      href="https://smartcurrency.netlify.app/"
                    >
                      Take Me There
                    </a>
                  </div>
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
