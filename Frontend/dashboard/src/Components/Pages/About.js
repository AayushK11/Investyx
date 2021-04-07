import React from "react";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
import { Helmet } from "react-helmet";
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
        <Helmet>
          <title>Investyx | About</title>
        </Helmet>
        <div className="container-fluid">
          <Navbar />
          <section id="about-text">
            <div className="container">
              <div className="row">
                <div className="about-heading">
                  <h2>
                    Using Artificial Intelligence to Make Investing Easier
                  </h2>
                </div>
                <hr className="about-horizontal-line" />
                <div className="about-passage ">
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        We started creating Investyx on the 1st of March 2021
                        with a clear Goal. To create a single unique platform
                        that could answer all the "When", "Where" and, "How
                        Much" kind of questions when it comes to Investing.
                      </p>
                      <p>
                        When we started Investing, we suffered innumerable
                        losses at the hands of various stocks, mainly because of
                        the lack of knowledge. To get back on our feet, we
                        decided to use our Technical Skills to solve all our
                        Financial Questions.
                      </p>
                      <p>
                        We created this platform as a submission for our Mini
                        Project in our 3rd Year but decided, why stop there? We
                        realized the Potential and Possible Future of this Idea,
                        and that's why we presented this to MIT ADT University's
                        Incubation Center.
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        MIT ADT University's Incubation Center has helped us
                        harness our skills and create something that could be
                        loved and used all over India. Along with Guidance and
                        Support, they have mentored us and helped in creating
                        the Start-Up we are today.
                      </p>
                      <p>
                        After a long and hard struggle, we have achieved a
                        Milestone in being one of the very few companies that
                        provide Financial Support at a Cheap Price. But our
                        journey does not end there. We plan on creating more
                        features using our technical skills to make people
                        wealthier and, hopefully, make the world a better place.
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
                  <h2>Founders</h2>
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
                      <h6>Co-Founder, CTO</h6>
                      <br></br>
                      <h5>
                        Aayush specializes in Deep Learning and is the Lead
                        Backend and API Developer. So if anything goes wrong,
                        you know who to blame
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
                      <h6>Co-Founder, COO</h6>
                      <br></br>
                      <h5>
                        Ajinkya is good (like Really Good) in the Frontend
                        Aspect of a Project and is the Lead Frontend Developer
                        for Investyx.
                      </h5>
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
                      alt="Aniket Raut"
                      className="about-photo"
                    />
                    <div className="about-overlay-text">
                      <h4>Aniket Raut</h4>
                      <h6>Co-Founder, CFO</h6>
                      <br></br>
                      <h5>
                        Aniket's strengths include managing Financial Risk,
                        giving Financial Advice, and basically ensuring we get
                        paid well enough
                      </h5>
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
