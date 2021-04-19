import React from "react";
import "./Css/Navbar_PostAuth.css";
import "bootstrap";
import smartstox from "./Images/hlogo.png";
import smartstoxsymbol from "./Images/symbol.png";
import UserProfile from "./Images/User Profile.png";
import axios from "axios";
import Server_Path from "./Server.js";
import Server_Root from "./Server_Root";
import $ from "jquery";

export default class NavbarPostAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
      Usercode: this.props.Usercode,
      UserImage: this.props.UserImage,
      Notifications: [],
      SearchList: [],
    };
    this.getUserData = this.getUserData.bind(this);
    this.clearNotif = this.clearNotif.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  generateURLs() {
    this.setState({
      profile: this.state.url.concat("/profile"),
      support: "https://investyx.netlify.app/contactus",
      logout: "http://localhost:3000/login",
    });
  }

  updateImage() {
    if (this.state.UserImage === "") {
      this.setState({ UserImage: UserProfile });
    }
  }

  getUserData() {
    $("#dashboard").fadeTo(500, 0);
    $(".cssload-loader").fadeTo(500, 1);
    axios
      .post(Server_Path.concat("userdetails/"), {
        Usercode: this.state.Usercode,
        Requirement: "UserImage, Notifications",
      })
      .then((res) => {
        if (res.data["Status"] === "Success") {
          this.setState({
            UserImage: Server_Root.concat(res.data["UserImage"]),
            Notifications: res.data["Notifications"],
          });
        } else if (res.data["Status"] === "Notifications") {
          this.setState({
            Notifications: res.data["Notifications"],
          });
        } else if (res.data["Status"] === "Image") {
          this.setState({
            UserImage: Server_Root.concat(res.data["UserImage"]),
          });
        }
      })
      .catch((e) => {
        console.log(e);
        if (!e.Status) {
          alert("Something Went Wrong");
        }
      });
    $("#dashboard").fadeTo(500, 1);
    $(".cssload-loader").fadeTo(500, 0);
  }

  updateNotifications() {
    if (this.state.Notifications.length === 0) {
      this.setState({
        Notifications: ["No Notifications To Display"],
      });
    }
  }

  clearNotif(event) {
    event.preventDefault();
    axios
      .post(Server_Path.concat("userdetails/"), {
        Usercode: this.state.Usercode,
        Requirement: "Clear Notification",
        NotificationValue: event.target.id,
      })
      .then((res) => {
        if (res.data["Status"] === "Success") {
          if (res.data["Notifications"].length === 0) {
            this.setState({
              Notifications: ["No Notifications To Display"],
            });
          } else {
            this.setState({
              Notifications: res.data["Notifications"],
            });
          }
        }
      })
      .catch((e) => {
        console.log(e);
        if (!e.Status) {
          alert("Something Went Wrong");
        }
      });
    $("#dashboard").fadeTo(500, 1);
    $(".cssload-loader").fadeTo(500, 0);
  }

  componentDidMount() {
    this.generateURLs();
    this.getUserData();
    this.updateImage();
    this.updateNotifications();

    let searchquer = "";
    const componentInstance = this;

    $("#searchbar").bind("input", function () {
      if (checkExists($("#searchbar").val()) === true) {
        console.log($("#searchbar").val());
        searchquer = $("#searchbar").val();
        handleSearch(searchquer);
      }
    });

    function checkExists(inputValue) {
      var x = document.getElementById("searchlist");
      var i;
      var flag;
      for (i = 0; i < x.options.length; i++) {
        if (inputValue === x.options[i].value) {
          flag = true;
        }
      }
      return flag;
    }

    function handleSearch(searchquer) {
      componentInstance.props.handleSearchClick(searchquer);
    }
  }

  onChange(event) {
    if (String(event.target.value).length > 2) {
      axios
        .post(Server_Path.concat("searchbar/"), {
          SearchQuery: String(event.target.value),
          Requirement: "Search Words",
        })
        .then((res) => {
          if (res.data["Status"] === "Success") {
            this.setState({
              SearchList: [],
            });
            for (var i = 0; i < res.data["SearchWords"].length; i++) {
              var SearchList = this.state.SearchList;
              var SearchCode = res.data["SearchWords"][i][0];
              var SearchName = res.data["SearchWords"][i][1];
              var SearchExchange = res.data["SearchWords"][i][3];
              SearchList.push(
                SearchCode.concat(" - ", SearchName, " - ", SearchExchange)
              );
              this.setState({
                SearchList: SearchList,
              });
            }
          }
        })
        .catch((e) => {
          console.log(e);
          if (!e.Status) {
            alert("Something Went Wrong");
          }
        });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="NavbarPostAuth">
          <nav className="navbar navbar-custom-post navbar-expand-lg fixed-top">
            <a
              className="navbar-brand d-block d-lg-none d-xl-none"
              href={this.state.url}
            >
              <img
                src={smartstoxsymbol}
                alt="Smart Stox"
                className="navbar-logo"
              />
            </a>
            <a
              className="navbar-brand d-none d-lg-block d-xl-block"
              href={this.state.url}
            >
              <img src={smartstox} alt="Smart Stox" className="navbar-logo" />
            </a>
            <div className="row">
              <div className="col-auto">
                <input
                  onChange={this.onChange}
                  list="searchlist"
                  data-toggle="tooltip"
                  title="Enter 2 or more characters for Getting Predictive Search Results"
                  type="text"
                  placeholder="Search Any Stock..."
                  id="searchbar"
                  name="searchbar"
                  className="form-control"
                />
                <datalist id="searchlist">
                  {this.state.SearchList.map((item) => (
                    <option value={item} />
                  ))}
                </datalist>
              </div>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                <li className="nav-item notification dropdown">
                  <button
                    type="button"
                    className="btn dropdown-toggle notifications"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-bell bell-icon d-none d-lg-inline-flex d-xl-inline-flex">
                      <span className="badge bg-warning">
                        {(() => {
                          if (
                            this.state.Notifications[0] ===
                            "No Notifications To Display"
                          ) {
                            return <div>0</div>;
                          } else {
                            return <div>{this.state.Notifications.length}</div>;
                          }
                        })()}
                      </span>
                    </i>
                    <h6 className="d-lg-none d-inline-flex">
                      Notifications <span className="badge bg-warning">0</span>
                    </h6>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    {this.state.Notifications.map((item) => (
                      <div key={"div".concat(item)}>
                        <button
                          key={"a".concat(item)}
                          id={item}
                          onClick={this.clearNotif}
                        >
                          {item}
                        </button>
                        <div
                          className="dropdown-divider"
                          key={"divider".concat(item)}
                        ></div>
                      </div>
                    ))}
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <h6>{this.state.Usercode} </h6>
                    <img
                      src={this.state.UserImage}
                      alt="Profile"
                      className="user-profile-picture"
                    />
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href={this.state.profile}>
                      Profile
                    </a>
                    <a className="dropdown-item" href={this.state.support}>
                      Support
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href={this.state.logout}>
                      Log-Out
                    </a>
                  </div>
                </li>
                <li className="nav-item d-lg-none">
                  <a
                    className="nav-link active join-now"
                    href={this.state.profile}
                  >
                    Dashboard
                  </a>
                </li>
                <li className="nav-item d-lg-none">
                  <a
                    className="nav-link active join-now"
                    href={this.state.profile}
                  >
                    Watchlist
                  </a>
                </li>
                <li className="nav-item d-lg-none">
                  <a
                    className="nav-link active join-now"
                    href={this.state.profile}
                  >
                    Indices Predictions
                  </a>
                </li>
                <li className="nav-item d-lg-none">
                  <a
                    className="nav-link active join-now"
                    href={this.state.profile}
                  >
                    Stocks Predictions
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="SidebarPostAuth ">
          <div
            className="col px-0 position-fixed sidebar-custom-post d-none d-lg-block d-xl-block"
            id="sticky-sidebar"
          >
            <div className="nav flex-column flex-nowrap vh-100 overflow-auto text-white p-2">
              <ul className="sidebar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link active join-now"
                    href={this.state.profile}
                  >
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active join-now"
                    href={this.state.profile}
                  >
                    Watchlist
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active join-now"
                    href={this.state.profile}
                  >
                    Indices Predictions
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active join-now"
                    href={this.state.profile}
                  >
                    Stocks Predictions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
