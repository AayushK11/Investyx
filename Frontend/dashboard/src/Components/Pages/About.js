import React from "react";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
import "bootstrap";
import "../Css/About.css";
import logo512 from "../Images/logo512.png";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.href,
    };
  }

  render() {
    return (
      <div className="about">
        <div className="container-fluid">
          <Navbar />
          <section id="about-text">
            <div className="container">
              <div className="row">
                <div className="about-heading">
                  <h2>
                    Using Artificial Intelligence to Make the Pull Out Game
                    Strong
                  </h2>
                </div>
                <hr className="about-horizontal-line" />
                <div className="about-passage ">
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        We started creating this baby by having sex on 6th
                        September, 2069 with a goal of creating a single unique
                        platform that can solve all the issues when it comes to
                        investing.
                      </p>
                      <p>
                        After Suffering Innumerable losses at the hands of
                        Stocks such as Indian Tobacco Company (ITC) and
                        Prostitue Village (PVR) we decided to use our technical
                        skills to solve all our money problems
                      </p>
                      <p>
                        We created this platform as a submission for our Mini
                        Project where we showcased it to Randi Nilima Maam with
                        a classy advertisement video. But the only thing she was
                        concerned about is a Research Paper with her name on it.
                        So we took matters into our own hands and went to Shri.
                        Lord. Mangu Karad and showed him how to earn more money.
                        As expected, he became wet at the idea and supported us
                        with all his resources
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        MIT Incubation Center which looks sexy as fuck from
                        outside but could be as chutiya as MIT from the inside
                        has helped us harness our skills and increase our
                        stamina to last longer in Bed. They have done absolutely
                        nothing but advertise about their place and show that
                        same video of Lord Mangu cutting the ribbon for that
                        place
                      </p>
                      <p>
                        After a long and hard struggle, we have finally been
                        able to predict which stock to buy, which SIP to invest
                        in, and which Hoe to Fuck. But our journey does not end
                        there. We plan on creating more features where we can
                        use our technical skills to make people richer and
                        hopefully, make the world a better place
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="about-people">
            <div className="container">
              <div className="row">
                <div className="about-people-heading">
                  <h2>Parents of this Baby</h2>
                </div>
                <hr className="about-horizontal-line" />
                <div className="row about-people-photos justify-content-around align-items-center ">
                  <div className="col-md-3 col-sm-6 about-person">
                    <img
                      src={logo512}
                      alt="Aayush Kumaria"
                      className="about-photo"
                    />
                    <div className="about-overlay-text">
                      <h4>Aayush Kumaria</h4>
                      <br></br>
                      <h5>
                        The Guy Who Realized that buying a Fake Taxi is not a
                        Money Making Opportunity
                      </h5>
                      <div className="social-row row justify-content-center align-items-center">
                        <div className="social-list col-3">
                          <div className="social-item">
                            <a
                              href="https://github.com/AayushK11"
                              className="social-link"
                            >
                              <i className="fab fa-github"></i>
                            </a>
                          </div>
                        </div>
                        <div className="social-list col-3">
                          <div className="social-item">
                            <a
                              href="https://www.linkedin.com/in/aayushkumaria/"
                              className="social-link"
                            >
                              <i className="fab fa-linkedin"></i>
                            </a>
                          </div>
                        </div>
                        <div className="social-list col-3">
                          <div className="social-item">
                            <a
                              href="https://twitter.com/aayushkumaria11"
                              className="social-link"
                            >
                              <i className="fab fa-twitter"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 about-person">
                    <img
                      src={logo512}
                      alt="Ajinkya Rajkar"
                      className="about-photo"
                    />
                    <div className="about-overlay-text">
                      <h4>Ajinkya Rajkar</h4>
                      <br></br>
                      <h5>What are you Doing Step Bro</h5>
                      <div className="social-row row justify-content-center align-items-center">
                        <div className="social-list col-3">
                          <div className="social-item">
                            <a
                              href="https://github.com/ajinkyarajkar"
                              className="social-link"
                            >
                              <i className="fab fa-github"></i>
                            </a>
                          </div>
                        </div>
                        <div className="social-list col-3">
                          <div className="social-item">
                            <a
                              href="https://www.linkedin.com/in/ajinkya-rajkar-69553a1a7/"
                              className="social-link"
                            >
                              <i className="fab fa-linkedin"></i>
                            </a>
                          </div>
                        </div>
                        <div className="social-list col-3">
                          <div className="social-item">
                            <a
                              href="https://twitter.com/RajkarAjinkya"
                              className="social-link"
                            >
                              <i className="fab fa-twitter"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 about-person">
                    <img
                      src={logo512}
                      alt="Ajinkya Rajkar"
                      className="about-photo"
                    />
                    <div className="about-overlay-text">
                      <h4>Aniket Raut</h4>
                      <br></br>
                      <h5>The Real Reality King</h5>
                      <div className="social-row row justify-content-center align-items-center">
                        <div className="social-list col-3">
                          <div className="social-item">
                            <a
                              href="https://github.com/aniketraut6465"
                              className="social-link"
                            >
                              <i className="fab fa-github"></i>
                            </a>
                          </div>
                        </div>
                        <div className="social-list col-3">
                          <div className="social-item">
                            <a
                              href="https://www.linkedin.com/in/aniket-raut-9915a8205/"
                              className="social-link"
                            >
                              <i className="fab fa-linkedin"></i>
                            </a>
                          </div>
                        </div>
                      </div>
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
