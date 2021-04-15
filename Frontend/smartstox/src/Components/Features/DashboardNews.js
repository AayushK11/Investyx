import React from "react";
import axios from "axios";
import Server_Path from "../Server.js";
import "../Css/DashboardNews.css";

export default class DashboardNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Headline: [
        "Initializing News",
        "Initializing News",
        "Initializing News",
        "Initializing News",
      ],
      Time: [],
      Subheading: [],
      Images: [],
      counter: 0,
    };
    this.updateNews = this.updateNews.bind(this);
  }

  updateNews() {
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
            ],
            Time: [
              res.data["News1"][1],
              res.data["News2"][1],
              res.data["News3"][1],
              res.data["News4"][1],
            ],
            Subheading: [
              res.data["News1"][2],
              res.data["News2"][2],
              res.data["News3"][2],
              res.data["News4"][2],
            ],
            Images: [
              res.data["News1"][3],
              res.data["News2"][3],
              res.data["News3"][3],
              res.data["News4"][3],
            ],
          });
        }
      });
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      console.log("Start News");
      this.updateNews();
    }, 15000);
  }

  render() {
    return (
      <div className="dashboard-news">
        <div className="container-fluid">
          <div className="row showing-news">
            <div className="col-3 image">
              <img src={this.state.Images[0]} alt="News" loading="lazy" />
            </div>
            <div className="col-9 news-section">
              <div className="row news-heading">{this.state.Headline[0]}</div>
              <div className="row news-time">{this.state.Time[0]}</div>
              <div className="row news-subheading">
                {this.state.Subheading[0]}
              </div>
            </div>
          </div>
          <div className="row showing-news">
            <div className="col-3 image">
              <img src={this.state.Images[1]} alt="News" loading="lazy" />
            </div>
            <div className="col-9 news-section">
              <div className="row news-heading">{this.state.Headline[1]}</div>
              <div className="row news-time">{this.state.Time[1]}</div>
              <div className="row news-subheading">
                {this.state.Subheading[1]}
              </div>
            </div>
          </div>
          <div className="row showing-news">
            <div className="col-3 image">
              <img src={this.state.Images[2]} alt="News" loading="lazy" />
            </div>
            <div className="col-9 news-section">
              <div className="row news-heading">{this.state.Headline[2]}</div>
              <div className="row news-time">{this.state.Time[2]}</div>
              <div className="row news-subheading">
                {this.state.Subheading[2]}
              </div>
            </div>
          </div>
          <div className="row showing-news">
            <div className="col-3 image">
              <img src={this.state.Images[3]} alt="News" loading="lazy" />
            </div>
            <div className="col-9 news-section">
              <div className="row news-heading">{this.state.Headline[3]}</div>
              <div className="row news-time">{this.state.Time[3]}</div>
              <div className="row news-subheading">
                {this.state.Subheading[3]}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
