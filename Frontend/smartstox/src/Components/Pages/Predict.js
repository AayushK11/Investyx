import React from "react";
import NavbarPostAuth from "../Navbar_PostAuth";
import "../Css/predict.css";
import "../Css/Loader.css";
import axios from "axios";
import Server_Path from "../Server.js";
import $ from "jquery";

export default class Predict extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    }




  render() {
    return (
      <div className="predict">
        <section id="loader">
          <div className="cssload-loader">
            <div className="cssload-inner cssload-one"></div>
            <div className="cssload-inner cssload-two"></div>
            <div className="cssload-inner cssload-three"></div>
          </div>
        </section>
        <section id="predict">
          <NavbarPostAuth
            Usercode={this.state.Usercode}
            UserImage={this.state.UserImage}
            handleSearchClick={this.handleSearchClick}
          />

        <div class="predict container">
            <div class=" predictcard card border-light">

            <div class="card-header">
               
                  <span className="pStockName">PVR</span> <span class="pExchange badge bg-primary">NSE</span>
                
            </div>
            <div class="card-body ">
              
              <div className="row">
                <div className="col">Opening Price - 1201</div>
                <div className="col">Prev Closing Price - 1785</div>
              </div>
              <div className="row">
                <div className="col">52 Week High Price - 1612</div>
                <div className="col">52 Week Low Price - 989</div>
              </div>      
            </div>
            </div>

            <div class=" predictcard2 card border-light">
            <div class="card-header">
               
               <span className="pStockName">Predictions and Analysis</span> 
             
         </div>
         <div class="card-body">
           
           <div className="row">
             <div className="col">Predicted Closing Price - 1250</div>
           </div>
           <div className="row">
             <div className="col">Expected Change - 50</div>
             <div className="col"><span class="news badge badge-soft-danger">News - 1</span></div>
             <div className="col"><span class="news badge badge-soft-success">News - 2</span></div>
           </div>
           <div className="row">
             <div className="col">sentiment Value - 74</div>
             
             <div className="col"><span class="news badge badge-soft-warning">News - 3</span></div>
             <div className="col"><span class="news badge badge-soft-danger">News - 4</span></div>
           </div>      
         </div>
        </div>
          <div className="suggestions">
          <div className="buysell">

                  <div className="row">
                   <div className="col buysellText"> SELL</div>
                  </div>
                  <div className="row">
                   <div> *Best time to buy.</div>
                   <div> *Remain invested if you already own</div>
                  </div>

          </div>
          </div>
          </div>
        </section>
      </div>
    );
  }
}
