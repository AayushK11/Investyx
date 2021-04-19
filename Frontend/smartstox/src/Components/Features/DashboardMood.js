import React from "react";
import axios from "axios";
import Server_Path from "../Server.js";
import "../Css/DashboardMood.css";
// import $ from "jquery";

export default class DashboardMood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.updateMood = this.updateMood.bind(this);
    this.updateGauge = this.updateGauge.bind(this);
  }

  updateGauge(value) {

    const gaugeElement = document.querySelector(".gauge");

    if (value < 0 || value > 100) {
      return;
    }

    gaugeElement.querySelector(".gauge__fill").style.transform = `rotate(${
      value / 200
    }turn)`;
    if (value < 30) {

      gaugeElement.querySelector(".gauge__cover").textContent = `Extreme Fear`;

      gaugeElement.querySelector(".gauge__fill").style.backgroundColor = "#12be57";
    }
    if (value < 50 && value >= 30) {
      gaugeElement.querySelector(".gauge__cover").textContent = `Fear`;

      gaugeElement.querySelector(".gauge__fill").style.backgroundColor = "#f5d72b";
    }
    if (value < 70 && value >= 50) {
      gaugeElement.querySelector(".gauge__cover").textContent = `Greed`;

      gaugeElement.querySelector(".gauge__fill").style.backgroundColor = "#e65016";
    }
    if (value >= 70) {
      gaugeElement.querySelector(".gauge__cover").textContent = `Extreme Greed`;

      gaugeElement.querySelector(".gauge__fill").style.backgroundColor = "#d62020";
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

  componentDidMount() {
    this.interval = setInterval(() => {
      console.log("Start Mood");
      this.updateMood();
    }, 15000);
  }

  render() {
    return (
      <div className="dashboard-mood">
        <div className="container-fluid">
          <div className="mood-row row">
            <div className="mood-heading">Market Live Sentiments</div>
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
    );
  }
}
