import React from "react";
import axios from "axios";
import Server_Path from "../Server.js";
import "../Css/DashboardActive.css";

export default class DashboardMood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Company: ["Analysing the Market"],
      Price: [],
      Change: [],
      ValueChange: [],
    };
    this.updateActive = this.updateActive.bind(this);
    this.updateActiveChange = this.updateActiveChange.bind(this);
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

  componentDidMount() {
    this.interval = setInterval(() => {
      console.log("Start Active");
      this.updateActive();
      this.updateActiveChange();
    }, 15000);
  }

  render() {
    return (
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
    );
  }
}
