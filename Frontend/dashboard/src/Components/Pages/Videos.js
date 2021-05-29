import React from "react";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
import "bootstrap";
import "../Css/Videos.css";
import { Helmet } from "react-helmet";

export default class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="videos">
        <Helmet>
          <title>Investyx | Videos</title>
        </Helmet>
        <div className="container-fluid">
          <Navbar />
          <section id="video">
            <div className="container">
              <div className="row">
                <div className="video-column col-sm-6 col-12">
                  <iframe
                    src="https://www.youtube.com/embed/aoEMe8EsfJQ"
                    title="Advertisement Video"
                  ></iframe>
                </div>
                <div className="video-text col-sm-6 my-auto">
                  <div className="row video-heading">
                    <h2>Advertisement Video</h2>
                  </div>
                  <div className="row video-sub-heading me-5">
                    <h5>Created during the Launch of Investyx.</h5>
                  </div>
                  <div className="row video-have-a-look ">
                    <div className="video-watch col-12">
                      <a
                        className="video-watch-button"
                        href="https://www.youtube.com/watch?v=Sz_YPczxzZc"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    );
  }
}
