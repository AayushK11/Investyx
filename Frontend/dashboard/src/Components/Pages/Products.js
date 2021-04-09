import React from "react";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
import "bootstrap";
import "../Css/Products.css";
import { Helmet } from "react-helmet";
import Smart_Stox_Symbol from "../Images/Smart_Stox_Symbol.png";
import Smart_Funds_Symbol from "../Images/Smart_Funds_Symbol.png";
import Smart_Coin_Symbol from "../Images/Smart_Coin_Symbol.png";
import Smart_Case_Symbol from "../Images/Smart_Case_Symbol.png";

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.href,
    };
  }

  render() {
    return (
      <div className="products">
        <Helmet>
          <title>Investyx | Products</title>
        </Helmet>
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
                    <img
                      src={Smart_Stox_Symbol}
                      alt="Smart Stox"
                      className="products-logo"
                    />
                  </a>
                </div>
                <div className="products-text col-md-6 my-auto">
                  <div className="row products-heading">
                    <h2>Smart Stox</h2>
                  </div>
                  <div className="row products-sub-heading me-5">
                    <h5>
                      Predict how each stock will perform over a period of a
                      time. Plan your investment in stocks the right way.
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
                    href="https://smartfunds.netlify.app/"
                  >
                    <img
                      src={Smart_Funds_Symbol}
                      alt="Smart Funds"
                      className="products-logo"
                    />
                  </a>
                </div>
                <div className="products-text col-md-6 my-auto">
                  <div className="row products-heading">
                    <h2>Smart Funds</h2>
                  </div>
                  <div className="row products-sub-heading me-5">
                    <h5>
                      Mutual Funds may be subject to Market Risk, but with our
                      predictions, the risk definitely comes down.
                    </h5>
                  </div>
                  <div className="row products-have-a-look ">
                    <a
                      className="products-button"
                      href="https://smartfunds.netlify.app/"
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
                    <img
                      src={Smart_Case_Symbol}
                      alt="Smart Case"
                      className="products-logo"
                    />
                  </a>
                </div>
                <div className="products-text col-md-6 my-auto">
                  <div className="row products-heading">
                    <h2>Smart Case</h2>
                  </div>
                  <div className="row products-sub-heading me-5">
                    <h5>
                      Invest in a Basket of Stocks knowing which stock will
                      yield how much. Create the best possible basket.
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
                    href="https://smartcoin.netlify.app/"
                  >
                    <img
                      src={Smart_Coin_Symbol}
                      alt="Smart Coin"
                      className="products-logo"
                    />
                  </a>
                </div>
                <div className="products-text col-md-6 my-auto">
                  <div className="row products-heading">
                    <h2>Smart Coin</h2>
                  </div>
                  <div className="row products-sub-heading me-5">
                    <h5>
                      Investing in Currency is Highly Profitable if you know
                      which Currency to trade. That's where we come in.
                    </h5>
                  </div>
                  <div className="row products-have-a-look ">
                    <a
                      className="products-button"
                      href="https://smartcoin.netlify.app/"
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
