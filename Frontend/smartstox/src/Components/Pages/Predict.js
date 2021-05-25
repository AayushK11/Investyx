import React from "react";
import NavbarPostAuth from "../Navbar_PostAuth";
import "../Css/predict.css";
import "../Css/Loader.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class Predict extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Usercode: document.cookie,
      StockCode: "",
      UserImage: "",
      StockExchange: "",
      Open: "",
      Close: "",
      FiftyTwoLow: "",
      FiftyTwoHigh: "",
      PredClose: "",
      PredSentiment: "",
      PredChange: "",
      News: [],
      PredWord: "",
      PredSubtext1: "",
      PredSubtext2: "",
    };
  }

  componentDidMount() {
    var StockCode = window.location.search.split("?")[1];
    StockCode = StockCode.split("=")[1];
    var StockExchange = window.location.search.split("?")[2];
    StockExchange = StockExchange.split("=")[1];
    this.setState({ StockCode: StockCode, StockExchange: StockExchange });
    $(".disappearingcontainer").fadeTo(500, 0);
    $(".cssload-loader").fadeTo(500, 1);
    $(".cssload-text").fadeTo(500, 1);
    axios
      .post(Server_Path.concat("predict/"), {
        Requirement: "Predict",
        StockCode: StockCode,
      })
      .then((res) => {
        if (res.data["Status"] === "Success") {
          this.setState({
            PredSentiment: res.data["SentimentScore"],
            News: res.data["Sentiment"],
            PredClose: res.data["Price"],
            Close: res.data["Closing"],
            Open: res.data["Opening"],
            FiftyTwoHigh: res.data["52High"],
            FiftyTwoLow: res.data["52Low"],
            PredChange: res.data["Change"],
            PredWord: res.data["Outcome"],
            PredSubtext1: res.data["HelperText1"],
            PredSubtext2: res.data["HelperText2"],
          });
          $(".disappearingcontainer").fadeTo(500, 1);
          $(".cssload-loader").fadeTo(500, 0);
          $(".cssload-text").fadeTo(500, 0);
        }
      });
  }

  render() {
    return (
      <div className="predict">
        <Helmet>
          <title>Smart Stox | Prediction</title>
        </Helmet>
        <section id="loader">
          <div className="cssload-loader">
            <div className="cssload-inner cssload-one"></div>
            <div className="cssload-inner cssload-two"></div>
            <div className="cssload-inner cssload-three"></div>
          </div>
          <div className="cssload-text">
            Contacting Our Server. This Takes a few minutes
          </div>
        </section>
        <section id="predict">
          <NavbarPostAuth
            Usercode={this.state.Usercode}
            UserImage={this.state.UserImage}
            handleSearchClick={this.handleSearchClick}
          />

          <div className="predict container">
            <div className="disappearingcontainer">
              <div className=" predictcard card border-light">
                <div className="card-header">
                  <span className="pStockName">{this.state.StockCode}</span>{" "}
                  <span className="pExchange badge bg-primary">
                    {this.state.StockExchange}
                  </span>
                </div>
                <div className="card-body ">
                  <div className="row">
                    <div className="col">Opening Price - {this.state.Open}</div>
                    <div className="col">
                      Prev Closing Price - {this.state.Close}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      52 Week High Price - {this.state.FiftyTwoHigh}
                    </div>
                    <div className="col">
                      52 Week Low Price - {this.state.FiftyTwoLow}
                    </div>
                  </div>
                </div>
              </div>

              <div className=" predictcard2 card border-light">
                <div className="card-header">
                  <span className="pStockName">Predictions and Analysis</span>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      Predicted Closing Price - {this.state.PredClose}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      Expected Change - {this.state.PredChange}
                    </div>
                    <div className="col">
                      <span className="news badge badge-soft-danger">
                        News 1 : {this.state.News[0]}
                      </span>
                    </div>
                    <div className="col">
                      <span className="news badge badge-soft-success">
                        News 2 : {this.state.News[1]}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      Sentiment Value - {this.state.PredSentiment}
                    </div>

                    <div className="col">
                      <span className="news badge badge-soft-warning">
                        News 3 : {this.state.News[2]}
                      </span>
                    </div>
                    <div className="col">
                      <span className="news badge badge-soft-danger">
                        News 4 : {this.state.News[3]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="suggestions">
                <div className="buysell">
                  <div className="row">
                    <div className="col buysellText">{this.state.PredWord}</div>
                  </div>
                  <div className="row">
                    <div>{this.state.PredSubtext1}</div>
                    <div>{this.state.PredSubtext2}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
