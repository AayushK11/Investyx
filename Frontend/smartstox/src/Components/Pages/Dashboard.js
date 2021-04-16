import React from "react";
import NavbarPostAuth from "../Navbar_PostAuth";
import DashboardNews from "../Features/DashboardNews";
import DashboardMood from "../Features/DashboardMood";
import DashboardActive from "../Features/DashboardActive";
import "../Css/Dashboard.css";
import "../Css/Loader.css";
import axios from "axios";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Usercode: this.props.Usercode,
      UserImage: "",
      PinnedStocks: ["", "", "", ""],
      PinnedPrice: ["000.00", "000.00", "000.00", "000.00"],
      PinnedPercent: ["00.00", "00.00", "00.00", "00.00"],
      PinnedChange: ["00.00", "00.00", "00.00", "00.00"],
    };
    this.validateUser = this.validateUser.bind(this);
    this.updateChange = this.updateChange.bind(this);
    this.updateCards = this.updateCards.bind(this);
  }

  componentDidMount() {
    this.validateUser();
    this.interval = setInterval(() => {
      console.log("Start Cards");
      if (this.state.PinnedPrice[0] === "000.00") {
        $("#dashboard").fadeTo(500, 0.5);
        $(".cssload-loader").fadeTo(500, 1);
      } else {
        $("#dashboard").fadeTo(500, 1);
        $(".cssload-loader").fadeTo(500, 0);
      }
      this.updateCards();
      this.updateChange();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  validateUser() {
    if (this.state.Usercode === "") {
      this.props.history.push("/login");
      alert("Session Expired");
    }
  }

  updateChange() {
    if (this.state.PinnedChange[0] > 0) {
      document.getElementsByClassName("Card-Stock-Price-Live")[0].style.color =
        "#037948";
      document.getElementsByClassName(
        "badge-percent"
      )[0].style.backgroundColor = "#ccf7e5";
      document.getElementsByClassName("badge-percent")[0].style.color =
        "#037948";
      document.getElementsByClassName("badge-value")[0].style.backgroundColor =
        "#ccf7e5";
      document.getElementsByClassName("badge-value")[0].style.color = "#037948";
    }
    if (this.state.PinnedChange[1] > 0) {
      document.getElementsByClassName("Card-Stock-Price-Live")[1].style.color =
        "#037948";
      document.getElementsByClassName(
        "badge-percent"
      )[1].style.backgroundColor = "#ccf7e5";
      document.getElementsByClassName("badge-percent")[1].style.color =
        "#037948";
      document.getElementsByClassName("badge-value")[1].style.backgroundColor =
        "#ccf7e5";
      document.getElementsByClassName("badge-value")[1].style.color = "#037948";
    }
    if (this.state.PinnedChange[2] > 0) {
      document.getElementsByClassName("Card-Stock-Price-Live")[2].style.color =
        "#037948";
      document.getElementsByClassName(
        "badge-percent"
      )[2].style.backgroundColor = "#ccf7e5";
      document.getElementsByClassName("badge-percent")[2].style.color =
        "#037948";
      document.getElementsByClassName("badge-value")[2].style.backgroundColor =
        "#ccf7e5";
      document.getElementsByClassName("badge-value")[2].style.color = "#037948";
    }
    if (this.state.PinnedChange[3] > 0) {
      document.getElementsByClassName("Card-Stock-Price-Live")[3].style.color =
        "#037948";
      document.getElementsByClassName(
        "badge-percent"
      )[3].style.backgroundColor = "#ccf7e5";
      document.getElementsByClassName("badge-percent")[3].style.color =
        "#037948";
      document.getElementsByClassName("badge-value")[3].style.backgroundColor =
        "#ccf7e5";
      document.getElementsByClassName("badge-value")[3].style.color = "#037948";
    }
    if (this.state.PinnedChange[0] < 0) {
      document.getElementsByClassName("Card-Stock-Price-Live")[0].style.color =
        "#e63757";
      document.getElementsByClassName(
        "badge-percent"
      )[0].style.backgroundColor = "#fad7dd";
      document.getElementsByClassName("badge-percent")[0].style.color =
        "#e63757";
      document.getElementsByClassName("badge-value")[0].style.backgroundColor =
        "#fad7dd";
      document.getElementsByClassName("badge-value")[0].style.color = "#e63757";
    }
    if (this.state.PinnedChange[1] < 0) {
      document.getElementsByClassName("Card-Stock-Price-Live")[1].style.color =
        "#e63757";
      document.getElementsByClassName(
        "badge-percent"
      )[1].style.backgroundColor = "#fad7dd";
      document.getElementsByClassName("badge-percent")[1].style.color =
        "#e63757";
      document.getElementsByClassName("badge-value")[1].style.backgroundColor =
        "#fad7dd";
      document.getElementsByClassName("badge-value")[1].style.color = "#e63757";
    }
    if (this.state.PinnedChange[2] < 0) {
      document.getElementsByClassName("Card-Stock-Price-Live")[2].style.color =
        "#e63757";
      document.getElementsByClassName(
        "badge-percent"
      )[2].style.backgroundColor = "#fad7dd";
      document.getElementsByClassName("badge-percent")[2].style.color =
        "#e63757";
      document.getElementsByClassName("badge-value")[2].style.backgroundColor =
        "#fad7dd";
      document.getElementsByClassName("badge-value")[2].style.color = "#e63757";
    }
    if (this.state.PinnedChange[3] < 0) {
      document.getElementsByClassName("Card-Stock-Price-Live")[3].style.color =
        "#e63757";
      document.getElementsByClassName(
        "badge-percent"
      )[3].style.backgroundColor = "#fad7dd";
      document.getElementsByClassName("badge-percent")[3].style.color =
        "#e63757";
      document.getElementsByClassName("badge-value")[3].style.backgroundColor =
        "#fad7dd";
      document.getElementsByClassName("badge-value")[3].style.color = "#e63757";
    }
    if (this.state.PinnedChange[0] === 0) {
      document.getElementsByClassName("Card-Stock-Price-Live")[0].style.color =
        "#000000";
      document.getElementsByClassName(
        "badge-percent"
      )[0].style.backgroundColor = "#A9A9A9";
      document.getElementsByClassName("badge-value")[0].style.backgroundColor =
        "#A9A9A9";
    }
    if (this.state.PinnedChange[1] === 0) {
      document.getElementsByClassName("Card-Stock-Price-Live")[1].style.color =
        "#000000";
      document.getElementsByClassName(
        "badge-percent"
      )[1].style.backgroundColor = "#A9A9A9";
      document.getElementsByClassName("badge-value")[1].style.backgroundColor =
        "#A9A9A9";
    }
    if (this.state.PinnedChange[2] === 0) {
      document.getElementsByClassName("Card-Stock-Price-Live")[2].style.color =
        "#000000";
      document.getElementsByClassName(
        "badge-percent"
      )[2].style.backgroundColor = "#A9A9A9";
      document.getElementsByClassName("badge-value")[2].style.backgroundColor =
        "#A9A9A9";
    }
    if (this.state.PinnedChange[3] === 0) {
      document.getElementsByClassName("Card-Stock-Price-Live")[3].style.color =
        "#000000";
      document.getElementsByClassName(
        "badge-percent"
      )[3].style.backgroundColor = "#A9A9A9";
      document.getElementsByClassName("badge-value")[3].style.backgroundColor =
        "#A9A9A9";
    }
  }

  updateCards() {
    axios
      .post(Server_Path.concat("dashboardcards/"), {
        Usercode: this.state.Usercode,
        Requirement: "Dashboard Cards",
      })
      .then((res) => {
        if (res.data["Status"] === "Success") {
          if (res.data["Card1"].includes(0)) {
          } else {
            let PinnedStocks = this.state.PinnedStocks;
            let PinnedPrice = this.state.PinnedPrice;
            let PinnedPercent = this.state.PinnedPercent;
            let PinnedChange = this.state.PinnedChange;
            PinnedStocks[0] = res.data["Card1"][0];
            PinnedPrice[0] = res.data["Card1"][1];
            PinnedPercent[0] = res.data["Card1"][2];
            PinnedChange[0] = res.data["Card1"][3];
            this.setState({
              PinnedStocks: PinnedStocks,
              PinnedPrice: PinnedPrice,
              PinnedPercent: PinnedPercent,
              PinnedChange: PinnedChange,
            });
          }
          if (res.data["Card2"].includes(0)) {
          } else {
            let PinnedStocks = this.state.PinnedStocks;
            let PinnedPrice = this.state.PinnedPrice;
            let PinnedPercent = this.state.PinnedPercent;
            let PinnedChange = this.state.PinnedChange;
            PinnedStocks[1] = res.data["Card2"][0];
            PinnedPrice[1] = res.data["Card2"][1];
            PinnedPercent[1] = res.data["Card2"][2];
            PinnedChange[1] = res.data["Card2"][3];
            this.setState({
              PinnedStocks: PinnedStocks,
              PinnedPrice: PinnedPrice,
              PinnedPercent: PinnedPercent,
              PinnedChange: PinnedChange,
            });
          }
          if (res.data["Card3"].includes(0)) {
          } else {
            let PinnedStocks = this.state.PinnedStocks;
            let PinnedPrice = this.state.PinnedPrice;
            let PinnedPercent = this.state.PinnedPercent;
            let PinnedChange = this.state.PinnedChange;
            PinnedStocks[2] = res.data["Card3"][0];
            PinnedPrice[2] = res.data["Card3"][1];
            PinnedPercent[2] = res.data["Card3"][2];
            PinnedChange[2] = res.data["Card3"][3];
            this.setState({
              PinnedStocks: PinnedStocks,
              PinnedPrice: PinnedPrice,
              PinnedPercent: PinnedPercent,
              PinnedChange: PinnedChange,
            });
          }
          if (res.data["Card4"].includes(0)) {
          } else {
            let PinnedStocks = this.state.PinnedStocks;
            let PinnedPrice = this.state.PinnedPrice;
            let PinnedPercent = this.state.PinnedPercent;
            let PinnedChange = this.state.PinnedChange;
            PinnedStocks[3] = res.data["Card4"][0];
            PinnedPrice[3] = res.data["Card4"][1];
            PinnedPercent[3] = res.data["Card4"][2];
            PinnedChange[3] = res.data["Card4"][3];
            this.setState({
              PinnedStocks: PinnedStocks,
              PinnedPrice: PinnedPrice,
              PinnedPercent: PinnedPercent,
              PinnedChange: PinnedChange,
            });
          }
        }
      });
  }

  render() {
    return (
      <div className="dashboard">
        <section id="loader">
          <div className="cssload-loader">
            <div className="cssload-inner cssload-one"></div>
            <div className="cssload-inner cssload-two"></div>
            <div className="cssload-inner cssload-three"></div>
          </div>
        </section>
        <section id="dashboard">
          <NavbarPostAuth
            Usercode={this.state.Usercode}
            UserImage={this.state.UserImage}
          />
          <div className="dashboard-main">
            <div className="dashboard-main-card-row row">
              <div className="dashboard-main-card-col col-lg-3 col-6 col-md-3 col-sm-6">
                <div className="Dashboard-Card">
                  <div className="container">
                    <div className="Card-Stock-Name row">
                      <h6>{this.state.PinnedStocks[0]}</h6>
                    </div>
                    <div className="Card-Stock-Price-Live row">
                      <h3>{this.state.PinnedPrice[0]}</h3>
                    </div>
                    <div className="Card-Stock-Price-Change row pb-3">
                      <div className="Card-Stock-Price-Percent col-6">
                        <span className="badge badge-percent">
                          {this.state.PinnedPercent[0]}%
                        </span>
                      </div>
                      <div className="Card-Stock-Price-Value col-6">
                        <span className="badge badge-value">
                          {this.state.PinnedChange[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-main-card-col col-lg-3 col-6 col-md-3 col-sm-6">
                <div className="Dashboard-Card">
                  <div className="container">
                    <div className="Card-Stock-Name row">
                      <h6>{this.state.PinnedStocks[1]}</h6>
                    </div>
                    <div className="Card-Stock-Price-Live row">
                      <h3>{this.state.PinnedPrice[1]}</h3>
                    </div>
                    <div className="Card-Stock-Price-Change row pb-3">
                      <div className="Card-Stock-Price-Percent col-6">
                        <span className="badge badge-percent">
                          {this.state.PinnedPercent[1]}%
                        </span>
                      </div>
                      <div className="Card-Stock-Price-Value col-6">
                        <span className="badge badge-value">
                          {this.state.PinnedChange[1]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-main-card-col col-lg-3 col-6 col-md-3 col-sm-6">
                <div className="Dashboard-Card">
                  <div className="container">
                    <div className="Card-Stock-Name row">
                      <h6>{this.state.PinnedStocks[2]}</h6>
                    </div>
                    <div className="Card-Stock-Price-Live row">
                      <h3>{this.state.PinnedPrice[2]}</h3>
                    </div>
                    <div className="Card-Stock-Price-Change row pb-3">
                      <div className="Card-Stock-Price-Percent col-6">
                        <span className="badge badge-percent">
                          {this.state.PinnedPercent[2]}%
                        </span>
                      </div>
                      <div className="Card-Stock-Price-Value col-6">
                        <span className="badge badge-value">
                          {this.state.PinnedChange[2]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-main-card-col col-lg-3 col-6 col-md-3 col-sm-6">
                <div className="Dashboard-Card">
                  <div className="container">
                    <div className="Card-Stock-Name row">
                      <h6>{this.state.PinnedStocks[3]}</h6>
                    </div>
                    <div className="Card-Stock-Price-Live row">
                      <h3>{this.state.PinnedPrice[3]}</h3>
                    </div>
                    <div className="Card-Stock-Price-Change row pb-3">
                      <div className="Card-Stock-Price-Percent col-6">
                        <span className="badge badge-percent">
                          {this.state.PinnedPercent[3]}%
                        </span>
                      </div>
                      <div className="Card-Stock-Price-Value col-6">
                        <span className="badge badge-value">
                          {this.state.PinnedChange[3]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-main-content-row row">
              <div className="dashboard-main-stats-col col-lg-6">
                <div className="dashboard-main-mood-row row">
                  <DashboardMood />
                </div>
                <div className="dashboard-main-active-row row">
                  <DashboardActive />
                </div>
              </div>
              <div className="dashboard-main-news-col col-lg-6">
                <DashboardNews />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
