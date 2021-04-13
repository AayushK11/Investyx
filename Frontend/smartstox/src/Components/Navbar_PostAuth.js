import React from "react";
import "./Css/Navbar_PostAuth.css";
import "bootstrap";
import smartstox from "./Images/hlogo.png";
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
    };
    this.getUserData = this.getUserData.bind(this);
    this.clearNotif = this.clearNotif.bind(this);
  }

  generateURLs() {
    this.setState({
      profile: this.state.url.concat("/profile"),
      support: "https://investyx.netlify.app/contactus",
      logout: "http://localhost:3000/login",
    });
    console.log(this.state);
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
          console.log(res.data);
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
    console.log(this.state.Notifications);
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
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="NavbarPostAuth">
          <nav className="navbar navbar-custom-post navbar-expand-lg fixed-top">
            <a className="navbar-brand" href={this.state.url}>
              <img src={smartstox} alt="Smart Stox" className="navbar-logo" />
            </a>
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
                <li class="nav-item notification dropdown">
                  <button
                    type="button"
                    class="btn dropdown-toggle notifications"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-bell bell-icon d-none d-lg-inline-flex d-xl-inline-flex">
                      <span class="badge bg-warning">
                        {this.state.Notifications.length}
                      </span>
                    </i>
                    <h6 className="d-lg-none d-inline-flex">
                      Notifications <span class="badge bg-warning">0</span>
                    </h6>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
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
