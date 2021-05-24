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
import "../Css/WatchList.css";
import "../Css/Loader.css";
import axios from "axios";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Usercode: document.cookie,
      StockCode: " -  -  - ",
      watchlistLevel: 0,
      StockRow: [],
      UserImage: "",
      TopBar: [],
      Summary: [],
      ChartData: [],
      Statistics: [],
      Profile: [],
      Holders: [],
    };
    this.validateUser = this.validateUser.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.updateStockDetails = this.updateStockDetails.bind(this);
    this.onClick = this.onClick.bind(this);
    this.addToWatchList = this.addToWatchList.bind(this);
    this.updateWatchlist = this.updateWatchlist.bind(this);
  }

  validateUser() {
    if (this.state.Usercode === "") {
      this.props.history.push("/login");
      alert("Session Expired");
    }
  }

  updateStockDetails() {
    axios
      .post(Server_Path.concat("stockinfocard/"), {
        Requirement: "Stock Details",
        InputCode: this.state.StockCode,
      })
      .then((res) => {
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

  onClick(event) {
    event.preventDefault();
    if (event.target.name === "AddToWatchList") {
      this.addToWatchList(this.state.StockCode);
    }
    if (event.target.name === "Close") {
      console.log("Close");
      window.location.reload();
    }
    if (event.target.name === "Predict") {
      console.log("Predict");
      window.location = "/predict?Pred="
        .concat(this.state.StockCode.split(" - ")[0])
        .concat("?Exch=")
        .concat(this.state.StockCode.split(" - ")[2]);
    }
  }

  addToWatchList(StockCode) {
    axios
      .post(Server_Path.concat("addtowatchlist/"), {
        Requirement: "Add To Watchlist",
        StockCode: StockCode,
        Usercode: this.state.Usercode,
      })
      .then((res) => {
        alert(res.data["Status"]);
      });
  }

  updateWatchlist() {
    axios
      .post(Server_Path.concat("getwatchlist/"), {
        Requirement: "Watchlist",
        Usercode: this.state.Usercode,
      })
      .then((res) => {
        if (res.data["Status"] === "Success") {
          this.setState({ StockRow: res.data["Watchlist"] });
          $(".watchlist container").fadeTo(500, 1);
          $(".cssload-loader").fadeTo(500, 0);
          $(".cssload-text").fadeTo(500, 0);
        }
      });
  }

  componentDidMount() {
    this.validateUser();
    $(".watchlist container").fadeTo(500, 0);
    $(".cssload-loader").fadeTo(500, 1);
    $(".cssload-text").fadeTo(500, 1);
    if (this.state.watchlistLevel === 0) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.updateWatchlist();
      }, 10000);
    }
  }

  handleSearchClick(data) {
    this.setState({ StockCode: data, watchlistLevel: 1 });
    $("#watchlist").fadeTo(500, 0);
    $(".cssload-loader").fadeTo(500, 1);
    $(".cssload-text").fadeTo(500, 1);
    this.updateStockDetails();

    this.interval = setInterval(() => {
      if (this.state.TopBar.length > 0) {
        $("#watchlist").fadeTo(500, 1);
        $(".cssload-loader").fadeTo(500, 0);
        $(".cssload-text").fadeTo(500, 0);
      }
      this.updateStockDetails();
    }, 5000);
  }

  render() {
    return (
      <div className="watchlist">
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
        <section id="watchlist">
          <NavbarPostAuth
            Usercode={this.state.Usercode}
            UserImage={this.state.UserImage}
            handleSearchClick={this.handleSearchClick}
          />
          {(() => {
            if (this.state.watchlistLevel === 0) {
              return (
                <div class="watchlist container">
                  {(() => {
                    if (this.state.StockRow.length > 0) {
                      return (
                        <div class=" WatchListcard card border-light">
                          <div className="watchlistnotempty">
                            <div class="card-header">
                              <div class="row">
                                <div class="col-3">Stock Name</div>
                                <div class="col-3">Price</div>
                                <div class="col-3">Change</div>
                                <div class="col-3">Unrealised P/L</div>
                              </div>
                            </div>
                            {this.state.StockRow.map((item) => (
                              <div class="card-body">
                                <div class="row">
                                  <div class="col-3">
                                    <h6 class="wStockName">{item[0]}</h6>
                                    <span class="wExchange badge bg-primary">
                                      {item[1]}
                                    </span>
                                  </div>
                                  <div class="col-3">
                                    <span class="wStockPrice">{item[2]}</span>
                                  </div>
                                  <div class="col-3">
                                    <span class="wPerChange badge badge-soft-danger">
                                      {item[3]}%
                                    </span>
                                    <br></br>
                                    <span class="wChange badge badge-soft-danger ">
                                      {item[4]}
                                    </span>
                                  </div>
                                  <div class="col-3">
                                    <span class="wUnrealized badge badge-soft-danger">
                                      {item[5]}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div class=" WatchListcard card border-light">
                          No Stock in the Watchlist.Yet...
                        </div>
                      );
                    }
                  })()}
                </div>
              );
            }
            if (this.state.watchlistLevel === 1) {
              return (
                <div className="dashboard-stock-card">
                <div className="Stock-Details">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-11">
                            <div className="row">
                              <div className="col-8 stock-name">
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
                              <div className="col-2 add-to-watchlist">
                                <button
                                className="btn btn-secondary"
                                  name="AddToWatchList"
                                  value="AddToWatchList"
                                  id="AddToWatchList"
                                  onClick={this.onClick}
                                >
                                  <i class="far fa-star"></i>
                                  Add To Watch List
                                </button>
                              </div>
                              <div className="col-2 predict-button">
                                <button
                                className="btn btn-secondary"
                                  name="Predict"
                                  value="Predict"
                                  id="Predict"
                                  onClick={this.onClick}
                                >
                                  <i class="fas fa-chart-line"></i>
                                  Predict
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-1">
                            <button
                            className="btn btn-secondary"
                              name="Close"
                              value="Close"
                              id="Close"
                              onClick={this.onClick}
                            >
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
                              <div className="col-3">
                                {this.state.Holders[0]}
                              </div>
                              <div className="col-6">
                                % of shares held by all insiders
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-3">
                                {this.state.Holders[1]}
                              </div>
                              <div className="col-6">
                                % of shares held by institutions
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-3">
                                {this.state.Holders[2]}
                              </div>
                              <div className="col-6">
                                % of float held by institutions
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-3">
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
