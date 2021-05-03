import React from "react";
import NavbarPostAuth from "../Navbar_PostAuth";
import "../Css/WatchList.css";
import "../Css/Loader.css";
import axios from "axios";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    }




  render() {
    return (
      <div className="watchlist">
        <section id="loader">
          <div className="cssload-loader">
            <div className="cssload-inner cssload-one"></div>
            <div className="cssload-inner cssload-two"></div>
            <div className="cssload-inner cssload-three"></div>
          </div>
        </section>
        <section id="watchlist">
          <NavbarPostAuth
            Usercode={this.state.Usercode}
            UserImage={this.state.UserImage}
            handleSearchClick={this.handleSearchClick}
          />

        <div class="watchlist container">
            <div class=" WatchListcard card border-light">

            <div class="card-header">
                <div class="row">
                    <div class="col-3">Stock Name</div>
                    <div class="col-3">Price</div>
                    <div class="col-3">Change</div>
                    <div class="col-3">Unrealised P/L</div>
                </div>
            </div>
            <div class="card-body">

                            <div class="row">
                                <div class="col-3">
                                    <h6 class="wStockName">PVR</h6>
                                    <span class="wExchange badge bg-primary">NSE</span>
                                </div>
                                <div class="col-3">
                                    <span class="wStockPrice">1189</span>
                                </div>
                                <div class="col-3">
                                    <span class="wPerChange badge badge-soft-danger">-3.4%</span>
                                    <br></br>
                                    <span class="wChange badge badge-soft-danger ">-67</span>
                                </div>
                                <div class="col-3">
                                    <span class="wUnrealized badge badge-soft-danger">-217</span>
                                </div>
                        </div>
                </div>
             </div>
          </div>
          
        </section>
      </div>
    );
  }
}
