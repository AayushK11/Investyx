import React from "react";
import NavbarPostAuth from "../Navbar_PostAuth";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Usercode: this.props.Usercode,
      UserImage: "",
    };
    this.validateUser = this.validateUser.bind(this);
  }

  componentDidMount() {
    this.validateUser();
  }

  validateUser() {
    if (this.state.Usercode === "") {
      this.props.history.push("/login");
      alert("Session Expired");
    }
  }

  render() {
    return (
      <div className="dashboard">
        <section id="loader">
          <div className="cssload-loader">
            <div className="cssload-inner cssload-one"></div>
            <div className="cssload-inner cssload-two"></div>
            <div className="cssload-inner cssload-three"></div>
          </div>
        </section>
        <section id="dashboard">
          <NavbarPostAuth
            Usercode={this.state.Usercode}
            UserImage={this.state.UserImage}
          />
        </section>
      </div>
    );
  }
}
