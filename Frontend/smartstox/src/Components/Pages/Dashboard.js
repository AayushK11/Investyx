import React from "react";
import NavbarPostAuth from "../Navbar_PostAuth";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "../Css/Dashboard.css";
import "../Css/DashboardStockCard.css";
import "../Css/DashboardNews.css";
import "../Css/DashboardActive.css";
import "../Css/DashboardMood.css";
import "../Css/Loader.css";
import axios from "axios";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardLevel: 0,
      Usercode: this.props.Usercode,
      UserImage: "",
      PinnedStocks: ["", "", "", ""],
      PinnedPrice: ["000.00", "000.00", "000.00", "000.00"],
      PinnedPercent: ["00.00", "00.00", "00.00", "00.00"],
      PinnedChange: ["00.00", "00.00", "00.00", "00.00"],
      StockCode: " -  -  - ",
      TopBar: [],
      Summary: [],
      ChartData: [],
      Statistics: [],
      Profile: [],
      Holders: [],
      Headline: [
        "Initializing News",
        "Initializing News",
        "Initializing News",
        "Initializing News",
        "Initializing News",
      ],
      Time: [],
      Subheading: [],
      Images: [],
      counter: 0,
      Company: ["Analysing the Market"],
      Price: [],
      Change: [],
      ValueChange: [],
    };
    this.validateUser = this.validateUser.bind(this);
    this.updateChange = this.updateChange.bind(this);
    this.updateCards = this.updateCards.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.updateStockDetails = this.updateStockDetails.bind(this);
    this.updateNews = this.updateNews.bind(this);
    this.updateMood = this.updateMood.bind(this);
    this.updateGauge = this.updateGauge.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updateActiveChange = this.updateActiveChange.bind(this);
  }

  componentDidMount() {
    this.validateUser();
    if (this.state.dashboardLevel === 0) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        if (this.state.PinnedPrice[0] === "000.00") {
          $("#dashboard").fadeTo(500, 0.5);
          $(".cssload-loader").fadeTo(500, 1);
        } else {
          $("#dashboard").fadeTo(500, 1);
          $(".cssload-loader").fadeTo(500, 0);
        }
        this.updateCards();
        this.updateChange();
        this.updateNews();
        this.updateMood();
        this.updateActive();
        this.updateActiveChange();
      }, 2000);
    }
  }

  updateActive() {
    axios
      .post(Server_Path.concat("dashboardactive/"), {
        Requirement: "Dashboard Active",
      })
      .then((res) => {
        if (res.data["Status"] === "Success") {
          this.setState({
            Company: [
              res.data["Active0"][0],
              res.data["Active1"][0],
              res.data["Active2"][0],
              res.data["Active3"][0],
              res.data["Active4"][0],
            ],
            Price: [
              res.data["Active0"][1],
              res.data["Active1"][1],
              res.data["Active2"][1],
              res.data["Active3"][1],
              res.data["Active4"][1],
            ],
            Change: [
              res.data["Active0"][2],
              res.data["Active1"][2],
              res.data["Active2"][2],
              res.data["Active3"][2],
              res.data["Active4"][2],
            ],
            ValueChange: [
              res.data["Active0"][3],
              res.data["Active1"][3],
              res.data["Active2"][3],
              res.data["Active3"][3],
              res.data["Active4"][3],
            ],
          });
        }
      });
  }

  updateActiveChange() {
    if (this.state.Change[0] < 0) {
      Array.from(document.getElementsByClassName("active-table-1")).forEach(
        function (element) {
          element.style.color = "red";
        }
      );
    }
    if (this.state.Change[1] < 0) {
      Array.from(document.getElementsByClassName("active-table-2")).forEach(
        function (element) {
          element.style.color = "red";
        }
      );
    }
    if (this.state.Change[2] < 0) {
      Array.from(document.getElementsByClassName("active-table-3")).forEach(
        function (element) {
          element.style.color = "red";
        }
      );
    }
    if (this.state.Change[3] < 0) {
      Array.from(document.getElementsByClassName("active-table-4")).forEach(
        function (element) {
          element.style.color = "red";
        }
      );
    }
    if (this.state.Change[4] < 0) {
      Array.from(document.getElementsByClassName("active-table-5")).forEach(
        function (element) {
          element.style.color = "red";
        }
      );
    }
    if (this.state.Change[0] > 0) {
      Array.from(document.getElementsByClassName("active-table-1")).forEach(
        function (element) {
          element.style.color = "green";
        }
      );
    }
    if (this.state.Change[1] > 0) {
      Array.from(document.getElementsByClassName("active-table-2")).forEach(
        function (element) {
          element.style.color = "green";
        }
      );
    }
    if (this.state.Change[2] > 0) {
      Array.from(document.getElementsByClassName("active-table-3")).forEach(
        function (element) {
          element.style.color = "green";
        }
      );
    }
    if (this.state.Change[3] > 0) {
      Array.from(document.getElementsByClassName("active-table-4")).forEach(
        function (element) {
          element.style.color = "green";
        }
      );
    }
    if (this.state.Change[4] > 0) {
      Array.from(document.getElementsByClassName("active-table-5")).forEach(
        function (element) {
          element.style.color = "green";
        }
      );
    }
  }

  updateGauge(value) {
    if (this.state.dashboardLevel === 0) {
      const gaugeElement = document.querySelector(".gauge");

      if (value < 0 || value > 100) {
        return;
      }

      gaugeElement.querySelector(".gauge__fill").style.transform = `rotate(${
        value / 200
      }turn)`;
      if (value < 30) {
        gaugeElement.querySelector(
          ".gauge__cover"
        ).textContent = `Extreme Fear`;

        gaugeElement.querySelector(".gauge__fill").style.backgroundColor =
          "#12be57";
      }
      if (value < 50 && value >= 30) {
        gaugeElement.querySelector(".gauge__cover").textContent = `Fear`;

        gaugeElement.querySelector(".gauge__fill").style.backgroundColor =
          "#f5d72b";
      }
      if (value < 70 && value >= 50) {
        gaugeElement.querySelector(".gauge__cover").textContent = `Greed`;

        gaugeElement.querySelector(".gauge__fill").style.backgroundColor =
          "#e65016";
      }
      if (value >= 70) {
        gaugeElement.querySelector(
          ".gauge__cover"
        ).textContent = `Extreme Greed`;

        gaugeElement.querySelector(".gauge__fill").style.backgroundColor =
          "#d62020";
      }
    }
  }

  updateMood() {
    axios
      .post(Server_Path.concat("dashboardmood/"), {
        Requirement: "Dashboard Mood",
      })
      .then((res) => {
        if (res.data["Status"] === "Success") {
          this.updateGauge(res.data["Mood"]);
        }
      });
  }

  updateNews() {
    if (this.state.dashboardLevel === 0) {
      axios
        .post(Server_Path.concat("dashboardnews/"), {
          Requirement: "Dashboard News",
        })
        .then((res) => {
          if (res.data["Status"] === "Success") {
            this.setState({
              Headline: [
                res.data["News1"][0],
                res.data["News2"][0],
                res.data["News3"][0],
                res.data["News4"][0],
                res.data["News5"][0],
              ],
              Time: [
                res.data["News1"][1],
                res.data["News2"][1],
                res.data["News3"][1],
                res.data["News4"][1],
                res.data["News5"][1],
              ],
              Subheading: [
                res.data["News1"][2],
                res.data["News2"][2],
                res.data["News3"][2],
                res.data["News4"][2],
                res.data["News5"][2],
              ],
              Images: [
                res.data["News1"][3],
                res.data["News2"][3],
                res.data["News3"][3],
                res.data["News4"][3],
                res.data["News5"][3],
              ],
            });
          }
        });
    }
  }

  updateStockDetails() {
    axios
      .post(Server_Path.concat("stockinfocard/"), {
        Requirement: "Stock Details",
        InputCode: this.state.StockCode,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data["Status"] === "Success") {
          let TopBar = [];
          let Summary = [];
          let ChartData = [];
          let Statistics = [];
          let Profile = [];
          let Holders = [];

          res.data["TopBar"].forEach(function (item, index) {
            TopBar = TopBar.concat(item);
          });
          res.data["Summary"].forEach(function (item, index) {
            Summary = Summary.concat(item);
          });
          res.data["Statistics"].forEach(function (item, index) {
            Statistics = Statistics.concat(item);
          });
          res.data["Profile"].forEach(function (item, index) {
            Profile = Profile.concat(item);
          });
          res.data["Holders"].forEach(function (item, index) {
            Holders = Holders.concat(item);
          });
          res.data["ChartData"].map((item) => {
            ChartData.push({
              Date: item[0],
              Price: parseFloat(item[1]),
            });
          });

          this.setState({
            TopBar: TopBar,
            Summary: Summary,
            ChartData: ChartData,
            Statistics: Statistics,
            Profile: Profile,
            Holders: Holders,
          });
        }
      });
  }

  handleSearchClick(data) {
    this.setState({ StockCode: data, dashboardLevel: 1 });
    console.log(this.state);
    clearInterval(this.interval);

    $("#dashboard").fadeTo(500, 0.5);
    $(".cssload-loader").fadeTo(500, 1);
    this.updateStockDetails();

    this.interval = setInterval(() => {
      console.log(this.state.StockCode);
      console.log("Start Info");
      if (this.state.TopBar.length > 0) {
        $("#dashboard").fadeTo(500, 1);
        $(".cssload-loader").fadeTo(500, 0);
      }
      this.updateStockDetails();
    }, 5000);
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
    if (this.state.dashboardLevel === 0) {
      if (this.state.PinnedChange[0] > 0) {
        document.getElementsByClassName(
          "Card-Stock-Price-Live"
        )[0].style.color = "#037948";
        document.getElementsByClassName(
          "badge-percent"
        )[0].style.backgroundColor = "#ccf7e5";
        document.getElementsByClassName("badge-percent")[0].style.color =
          "#037948";
        document.getElementsByClassName(
          "badge-value"
        )[0].style.backgroundColor = "#ccf7e5";
        document.getElementsByClassName("badge-value")[0].style.color =
          "#037948";
      }
      if (this.state.PinnedChange[1] > 0) {
        document.getElementsByClassName(
          "Card-Stock-Price-Live"
        )[1].style.color = "#037948";
        document.getElementsByClassName(
          "badge-percent"
        )[1].style.backgroundColor = "#ccf7e5";
        document.getElementsByClassName("badge-percent")[1].style.color =
          "#037948";
        document.getElementsByClassName(
          "badge-value"
        )[1].style.backgroundColor = "#ccf7e5";
        document.getElementsByClassName("badge-value")[1].style.color =
          "#037948";
      }
      if (this.state.PinnedChange[2] > 0) {
        document.getElementsByClassName(
          "Card-Stock-Price-Live"
        )[2].style.color = "#037948";
        document.getElementsByClassName(
          "badge-percent"
        )[2].style.backgroundColor = "#ccf7e5";
        document.getElementsByClassName("badge-percent")[2].style.color =
          "#037948";
        document.getElementsByClassName(
          "badge-value"
        )[2].style.backgroundColor = "#ccf7e5";
        document.getElementsByClassName("badge-value")[2].style.color =
          "#037948";
      }
      if (this.state.PinnedChange[3] > 0) {
        document.getElementsByClassName(
          "Card-Stock-Price-Live"
        )[3].style.color = "#037948";
        document.getElementsByClassName(
          "badge-percent"
        )[3].style.backgroundColor = "#ccf7e5";
        document.getElementsByClassName("badge-percent")[3].style.color =
          "#037948";
        document.getElementsByClassName(
          "badge-value"
        )[3].style.backgroundColor = "#ccf7e5";
        document.getElementsByClassName("badge-value")[3].style.color =
          "#037948";
      }
      if (this.state.PinnedChange[0] < 0) {
        document.getElementsByClassName(
          "Card-Stock-Price-Live"
        )[0].style.color = "#e63757";
        document.getElementsByClassName(
          "badge-percent"
        )[0].style.backgroundColor = "#fad7dd";
        document.getElementsByClassName("badge-percent")[0].style.color =
          "#e63757";
        document.getElementsByClassName(
          "badge-value"
        )[0].style.backgroundColor = "#fad7dd";
        document.getElementsByClassName("badge-value")[0].style.color =
          "#e63757";
      }
      if (this.state.PinnedChange[1] < 0) {
        document.getElementsByClassName(
          "Card-Stock-Price-Live"
        )[1].style.color = "#e63757";
        document.getElementsByClassName(
          "badge-percent"
        )[1].style.backgroundColor = "#fad7dd";
        document.getElementsByClassName("badge-percent")[1].style.color =
          "#e63757";
        document.getElementsByClassName(
          "badge-value"
        )[1].style.backgroundColor = "#fad7dd";
        document.getElementsByClassName("badge-value")[1].style.color =
          "#e63757";
      }
      if (this.state.PinnedChange[2] < 0) {
        document.getElementsByClassName(
          "Card-Stock-Price-Live"
        )[2].style.color = "#e63757";
        document.getElementsByClassName(
          "badge-percent"
        )[2].style.backgroundColor = "#fad7dd";
        document.getElementsByClassName("badge-percent")[2].style.color =
          "#e63757";
        document.getElementsByClassName(
          "badge-value"
        )[2].style.backgroundColor = "#fad7dd";
        document.getElementsByClassName("badge-value")[2].style.color =
          "#e63757";
      }
      if (this.state.PinnedChange[3] < 0) {
        document.getElementsByClassName(
          "Card-Stock-Price-Live"
        )[3].style.color = "#e63757";
        document.getElementsByClassName(
          "badge-percent"
        )[3].style.backgroundColor = "#fad7dd";
        document.getElementsByClassName("badge-percent")[3].style.color =
          "#e63757";
        document.getElementsByClassName(
          "badge-value"
        )[3].style.backgroundColor = "#fad7dd";
        document.getElementsByClassName("badge-value")[3].style.color =
          "#e63757";
      }
      if (this.state.PinnedChange[0] === 0) {
        document.getElementsByClassName(
          "Card-Stock-Price-Live"
        )[0].style.color = "#000000";
        document.getElementsByClassName(
          "badge-percent"
        )[0].style.backgroundColor = "#A9A9A9";
        document.getElementsByClassName(
          "badge-value"
        )[0].style.backgroundColor = "#A9A9A9";
      }
      if (this.state.PinnedChange[1] === 0) {
        document.getElementsByClassName(
          "Card-Stock-Price-Live"
        )[1].style.color = "#000000";
        document.getElementsByClassName(
          "badge-percent"
        )[1].style.backgroundColor = "#A9A9A9";
        document.getElementsByClassName(
          "badge-value"
        )[1].style.backgroundColor = "#A9A9A9";
      }
      if (this.state.PinnedChange[2] === 0) {
        document.getElementsByClassName(
          "Card-Stock-Price-Live"
        )[2].style.color = "#000000";
        document.getElementsByClassName(
          "badge-percent"
        )[2].style.backgroundColor = "#A9A9A9";
        document.getElementsByClassName(
          "badge-value"
        )[2].style.backgroundColor = "#A9A9A9";
      }
      if (this.state.PinnedChange[3] === 0) {
        document.getElementsByClassName(
          "Card-Stock-Price-Live"
        )[3].style.color = "#000000";
        document.getElementsByClassName(
          "badge-percent"
        )[3].style.backgroundColor = "#A9A9A9";
        document.getElementsByClassName(
          "badge-value"
        )[3].style.backgroundColor = "#A9A9A9";
      }
    }
  }

  updateCards() {
    if (this.state.dashboardLevel === 0) {
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
            handleSearchClick={this.handleSearchClick}
          />
          {(() => {
            if (this.state.dashboardLevel === 0) {
              return (
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
                        <div className="dashboard-mood">
                          <div className="container-fluid">
                            <div className="mood-row row">
                              <div className="mood-heading">
                                Market Live Sentiments
                              </div>
                              <div className="mood-col col-12">
                                <div class="gauge">
                                  <div class="gauge__body">
                                    <div class="gauge__fill"></div>
                                    <div class="gauge__cover"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="dashboard-main-active-row row">
                        <div className="dashboard-active">
                          <div className="container-fluid">
                            <div className="active-row row">Active Stocks</div>
                            <div className="active-table-row">
                              <table className="active-table">
                                <thead>
                                  <tr className="active-table-header">
                                    <th>Company</th>
                                    <th>Price</th>
                                    <th>Change</th>
                                    <th>Value Change</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="active-table-1">
                                    <td>{this.state.Company[0]}</td>
                                    <td>{this.state.Price[0]}</td>
                                    <td>{this.state.Change[0]}</td>
                                    <td>{this.state.ValueChange[0]}</td>
                                  </tr>
                                  <tr className="active-table-2">
                                    <td>{this.state.Company[1]}</td>
                                    <td>{this.state.Price[1]}</td>
                                    <td>{this.state.Change[1]}</td>
                                    <td>{this.state.ValueChange[1]}</td>
                                  </tr>
                                  <tr className="active-table-3">
                                    <td>{this.state.Company[2]}</td>
                                    <td>{this.state.Price[2]}</td>
                                    <td>{this.state.Change[2]}</td>
                                    <td>{this.state.ValueChange[2]}</td>
                                  </tr>
                                  <tr className="active-table-4">
                                    <td>{this.state.Company[3]}</td>
                                    <td>{this.state.Price[3]}</td>
                                    <td>{this.state.Change[3]}</td>
                                    <td>{this.state.ValueChange[3]}</td>
                                  </tr>
                                  <tr className="active-table-5">
                                    <td>{this.state.Company[4]}</td>
                                    <td>{this.state.Price[4]}</td>
                                    <td>{this.state.Change[4]}</td>
                                    <td>{this.state.ValueChange[4]}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dashboard-main-news-col col-lg-6">
                      <div className="dashboard-news">
                        <div className="container-fluid">
                          <div className="row showing-news">
                            <div className="col-3 image">
                              <img
                                src={this.state.Images[0]}
                                alt="News"
                                loading="lazy"
                              />
                            </div>
                            <div className="col-9 news-section">
                              <div className="row news-heading">
                                {this.state.Headline[0]}
                              </div>
                              <div className="row news-time">
                                {this.state.Time[0]}
                              </div>
                              <div className="row news-subheading">
                                {this.state.Subheading[0]}
                              </div>
                            </div>
                          </div>
                          <div className="row showing-news">
                            <div className="col-3 image">
                              <img
                                src={this.state.Images[1]}
                                alt="News"
                                loading="lazy"
                              />
                            </div>
                            <div className="col-9 news-section">
                              <div className="row news-heading">
                                {this.state.Headline[1]}
                              </div>
                              <div className="row news-time">
                                {this.state.Time[1]}
                              </div>
                              <div className="row news-subheading">
                                {this.state.Subheading[1]}
                              </div>
                            </div>
                          </div>
                          <div className="row showing-news">
                            <div className="col-3 image">
                              <img
                                src={this.state.Images[2]}
                                alt="News"
                                loading="lazy"
                              />
                            </div>
                            <div className="col-9 news-section">
                              <div className="row news-heading">
                                {this.state.Headline[2]}
                              </div>
                              <div className="row news-time">
                                {this.state.Time[2]}
                              </div>
                              <div className="row news-subheading">
                                {this.state.Subheading[2]}
                              </div>
                            </div>
                          </div>
                          <div className="row showing-news">
                            <div className="col-3 image">
                              <img
                                src={this.state.Images[3]}
                                alt="News"
                                loading="lazy"
                              />
                            </div>
                            <div className="col-9 news-section">
                              <div className="row news-heading">
                                {this.state.Headline[3]}
                              </div>
                              <div className="row news-time">
                                {this.state.Time[3]}
                              </div>
                              <div className="row news-subheading">
                                {this.state.Subheading[3]}
                              </div>
                            </div>
                          </div>
                          <div className="row showing-news">
                            <div className="col-3 image">
                              <img
                                src={this.state.Images[4]}
                                alt="News"
                                loading="lazy"
                              />
                            </div>
                            <div className="col-9 news-section">
                              <div className="row news-heading">
                                {this.state.Headline[4]}
                              </div>
                              <div className="row news-time">
                                {this.state.Time[4]}
                              </div>
                              <div className="row news-subheading">
                                {this.state.Subheading[4]}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            if (this.state.dashboardLevel === 1) {
              return (
                <div className="dashboard-stock-card">
                  <div className="Stock-Details">
                    <div className="container">
                      <div className="row">
                        <div className="col-12">
                          <div className="row">
                            <div className="col-11">
                              <div className="row">
                                <div className="col-3 stock-name">
                                  <div className="row">
                                    <b>
                                      {this.state.StockCode.split(" - ")[0]}
                                    </b>
                                  </div>
                                  <div className="row">
                                    {this.state.StockCode.split(
                                      " - "
                                    )[1].concat(
                                      " - ",
                                      this.state.StockCode.split(" - ")[2]
                                    )}
                                  </div>
                                </div>
                                <div className="col-3 add-to-watchlist">
                                  <button
                                    name="AddToWatchList"
                                    value="AddToWatchList"
                                    id="AddToWatchList"
                                  >
                                    <i class="far fa-star"></i>
                                    Add To Watch List
                                  </button>
                                </div>
                                <div className="col-3 add-to-marketwatch">
                                  <select
                                    name="AddToMarketWatch"
                                    id="AddToMarketWatch"
                                  >
                                    <option value="" selected disabled hidden>
                                      Add To Market Watch
                                    </option>
                                    <option value="NIFTY50">NIFTY50</option>
                                    <option value="NIFTYBANK">NIFTYBANK</option>
                                    <option value="ITC">ITC</option>
                                    <option value="PVR">PVR</option>
                                  </select>
                                </div>
                                <div className="col-3 predict">
                                  <button
                                    name="Predict"
                                    value="Predict"
                                    id="Predict"
                                  >
                                    <i class="fas fa-chart-line"></i>
                                    Predict
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="col-1">
                              <button name="Close" value="Close" id="Close">
                                <i class="fas fa-times"></i>
                              </button>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-11">
                              <div className="row">
                                <div className="col-6 stock-price">
                                  <div className="row">
                                    <b>{this.state.TopBar[0]}</b>
                                  </div>
                                  <div className="row">
                                    Live : {this.state.TopBar[3]}
                                  </div>
                                </div>
                                <div className="col-6 add-to-change">
                                  {this.state.TopBar[1]} ({this.state.TopBar[2]}
                                  )
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <ul
                            role="tablist"
                            className="nav bg-light nav-pills rounded nav-fill "
                          >
                            <li className="nav-item">
                              <a
                                data-toggle="pill"
                                href="#summary"
                                className="nav-link active "
                              >
                                <i class="fas fa-clipboard-list"></i> Summary
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                data-toggle="pill"
                                href="#chart"
                                className="nav-link "
                              >
                                <i class="fas fa-chart-bar"></i> Chart
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                data-toggle="pill"
                                href="#statistics"
                                className="nav-link "
                              >
                                <i class="fas fa-calculator"></i> Statistics
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                data-toggle="pill"
                                href="#profile"
                                className="nav-link "
                              >
                                <i class="far fa-address-card"></i> Profile
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                data-toggle="pill"
                                href="#holders"
                                className="nav-link "
                              >
                                <i class="fas fa-coins"></i> Holders
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content">
                            <div
                              id="summary"
                              className="tab-pane fade show active pt-3"
                            >
                              <div className="row">
                                <div className="col-6">
                                  Previous Close {this.state.Summary[0]}
                                </div>
                                <div className="col-6">
                                  Market Cap {this.state.Summary[6]}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  Open {this.state.Summary[1]}
                                </div>
                                <div className="col-6">
                                  PE Ratio {this.state.Summary[7]}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  Days Range {this.state.Summary[2]}
                                </div>
                                <div className="col-6">
                                  Earnings Date {this.state.Summary[8]}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  52 Week Range {this.state.Summary[3]}
                                </div>
                                <div className="col-6">
                                  Forward dividend & yield{" "}
                                  {this.state.Summary[9]}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  Volume {this.state.Summary[4]}
                                </div>
                                <div className="col-6">
                                  Average Volume {this.state.Summary[10]}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  Ex-Dividend Date {this.state.Summary[5]}
                                </div>
                                <div className="col-6">
                                  1Y Target Est {this.state.Summary[11]}
                                </div>
                              </div>
                            </div>
                            <div id="chart" className="tab-pane fade pt-3">
                              <ResponsiveContainer width="100%" height={400}>
                                <AreaChart data={this.state.ChartData}>
                                  <defs>
                                    <linearGradient
                                      id="color"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="0"
                                    >
                                      <stop
                                        offset="0%"
                                        stopColor="#037948"
                                        stopOpacity={1}
                                      />
                                      <stop
                                        offset="75%"
                                        stopColor="#037948"
                                        stopOpacity={0.2}
                                      />
                                    </linearGradient>
                                  </defs>
                                  <Area
                                    dataKey="Price"
                                    stroke="#037948"
                                    fill="url(#color)"
                                  />
                                  <XAxis dataKey="Date" />
                                  <YAxis dataKey="Price" />
                                  <Tooltip />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                            <div id="statistics" className="tab-pane fade pt-3">
                              <div className="row">
                                <div className="col-12">
                                  52-Week Change {this.state.Statistics[0]}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  52-Week High {this.state.Statistics[1]}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  52-Week Low {this.state.Statistics[2]}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  50-day moving average{" "}
                                  {this.state.Statistics[3]}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  200-day moving average{" "}
                                  {this.state.Statistics[4]}
                                </div>
                              </div>
                            </div>
                            <div id="profile" className="tab-pane fade pt-3">
                              <div className="row">
                                <div className="col-6">
                                  <div className="row">
                                    {this.state.Profile[0]}
                                  </div>
                                  <div className="row">
                                    {this.state.Profile[1]}
                                  </div>
                                  <div className="row">
                                    {this.state.Profile[2]}
                                  </div>
                                  <div className="row">
                                    {this.state.Profile[3]}
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="row">
                                    Sector(s): {this.state.Profile[4]}
                                  </div>
                                  <div className="row">
                                    Industry: {this.state.Profile[5]}
                                  </div>
                                  <div className="row">
                                    Full-time employees: {this.state.Profile[6]}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <div className="row">Description</div>
                                  <div className="row">
                                    {this.state.Profile[7]}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="holders" className="tab-pane fade pt-3">
                              <div className="row">
                                <div className="col-12">Major Holders</div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  {this.state.Holders[0]}
                                </div>
                                <div className="col-6">
                                  % of shares held by all insiders
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  {this.state.Holders[1]}
                                </div>
                                <div className="col-6">
                                  % of shares held by institutions
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  {this.state.Holders[2]}
                                </div>
                                <div className="col-6">
                                  % of float held by institutions
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  {this.state.Holders[3]}
                                </div>
                                <div className="col-6">
                                  Number of institutions holding shares
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })()}
        </section>
      </div>
    );
  }
}
