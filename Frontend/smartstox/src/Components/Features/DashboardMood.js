import React from "react";
import axios from "axios";
import Server_Path from "../Server.js";
import "../Css/DashboardMood.css";
// import $ from "jquery";

export default class DashboardMood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 50,
    };
    this.updateMood = this.updateMood.bind(this);
  }

  updateMood() {
    axios
      .post(Server_Path.concat("dashboardmood/"), {
        Requirement: "Dashboard Mood",
      })
      .then((res) => {
        if (res.data["Status"] === "Success") {
          this.setState({ mood: res.data["Mood"] });
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
              <div className="mood ">
                <div className="mood-guide">
                  <div className="mood-guide-left">Bullish</div>
                  <div className="mood-guide-right">Bearish</div>
                </div>
                <meter
                  min="0"
                  max="100"
                  low="0"
                  high="60"
                  optimum="50"
                  value={this.state.mood}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
