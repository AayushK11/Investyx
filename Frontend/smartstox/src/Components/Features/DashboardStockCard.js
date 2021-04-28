import React from "react";
import axios from "axios";
import Server_Path from "../Server.js";
import "../Css/DashboardStockCard.css";

export default class DashboardStockCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      StockCode: this.props.StockCode,
    };
  }

  render() {
    return (
      <div className="Stock-Details">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-11">
                  <div className="row">
                    <div className="col-3 stock-name">
                      <div className="row stockId">
                        ITC
                      </div>
                      <div className="row stockName">Indian Tobacco Company - NSE</div>
                    </div>
                    <div className="col-3 add-to-watchlist noPadding">
                      <button
                        name="AddToWatchList"
                        value="AddToWatchList"
                        id="AddToWatchList"
                        className="btn btn-primary">
                        <i class="far fa-star"></i>
                        Add To Watch List
                      </button>
                    </div>
                    
                    <div className="col-3 add-to-marketwatch noPadding ">
                      <select name="AddToMarketWatch" id="AddToMarketWatch" className="btn btn-primary">
                        <option value="" selected disabled hidden>
                          Add To Market Watch
                        </option>
                        <option value="NIFTY50">NIFTY50</option>
                        <option value="NIFTYBANK">NIFTYBANK</option>
                        <option value="ITC">ITC</option>
                        <option value="PVR">PVR</option>
                      </select>
                    </div>
                    <div className="col-3 predict noPadding">
                      <button name="Predict" value="Predict" id="Predict" className="btn btn-primary">
                        <i class="fas fa-chart-line"></i>
                        Predict
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-1 noPadding">
                  <button name="Close" value="Close" id="Close" class="btn btn-light closeBtn">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-11">
                  <div className="row">
                    <div className="col-1 stock-price">
                      <div className="row livePrice">
                        205.60
                      </div>
                      <div className="row">Live : 3:30pm</div>
                    </div>
                    <div className="col-2 add-to-change noPadding">-2.35 (-1.13%)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 tabList">
              <ul
                role="tablist"
                className="nav bg-light nav-pills rounded nav-fill "
              >
                <li className="nav-item">
                  <a
                    data-toggle="pill"
                    href="#summary"
                    className="nav-link active "
                  >
                    <i class="fas fa-clipboard-list"></i> Summary
                  </a>
                </li>
                <li className="nav-item">
                  <a data-toggle="pill" href="#chart" className="nav-link ">
                    <i class="fas fa-chart-bar"></i> Chart
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-toggle="pill"
                    href="#statistics"
                    className="nav-link "
                  >
                    <i class="fas fa-calculator"></i> Statistics
                  </a>
                </li>
                <li className="nav-item">
                  <a data-toggle="pill" href="#profile" className="nav-link ">
                    <i class="far fa-address-card"></i> Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a data-toggle="pill" href="#holders" className="nav-link ">
                    <i class="fas fa-coins"></i> Holders
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-toggle="pill"
                    href="#sustainability"
                    className="nav-link "
                  >
                    <i class="fas fa-coins"></i> Sustainability
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div id="summary" className="tab-pane fade show active pt-3">
                  <div className="row">
                    <div className="col-6">Previous Close 207.95</div>
                    <div className="col-6">Market Cap 2.531T</div>
                  </div>
                  <div className="row">
                    <div className="col-6">Open 205.00</div>
                    <div className="col-6">PE Ratio 0.61</div>
                  </div>
                  <div className="row">
                    <div className="col-6">Days Range 203.75 - 206.10</div>
                    <div className="col-6">
                      Earnings Date 23-May-2021 - 27-May-2021
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">52 Week Range 157.10 - 239.20</div>
                    <div className="col-6">
                      Forward dividend & yield 15.15 (7.29%)
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">Volume 15,787,978</div>
                    <div className="col-6">Average Volume 39,105,161</div>
                  </div>
                  <div className="row">
                    <div className="col-6">Ex-Dividend Date 21-Feb-2021</div>
                    <div className="col-6">1Y Target Est 339.53</div>
                  </div>
                </div>
                <div id="chart" className="tab-pane fade pt-3">
                  Coming Soon
                </div>
                <div id="statistics" className="tab-pane fade pt-3">
                  <div className="row">
                    <div className="col-12">52-Week Range 15.08%</div>
                  </div>
                  <div className="row">
                    <div className="col-12">52-Week High 239.20</div>
                  </div>
                  <div className="row">
                    <div className="col-12">52-Week Low 157.10</div>
                  </div>
                  <div className="row">
                    <div className="col-12">50-day moving average 211.91</div>
                  </div>
                  <div className="row">
                    <div className="col-12">200-day moving average 200.93</div>
                  </div>
                </div>
                <div id="profile" className="tab-pane fade pt-3">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">ITC Limited</div>
                      <div className="row">
                        Virginia House 37 Jawaharlal Nehru Road Kolkata 700071
                        India
                      </div>
                      <div className="row">91 33 2288 9371</div>
                      <div className="row">http://www.itcportal.com</div>
                    </div>
                    <div className="col-6">
                      <div className="row">Sector(s): Consumer Defensive</div>
                      <div className="row">Industry: Tobacco</div>
                      <div className="row">Full-time employees: 28,115</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="row">Description</div>
                      <div className="row">
                        ITC Limited engages in the fast moving consumer goods,
                        hotels, paperboards, paper and packaging, agri, and
                        information technology (IT) businesses in India and
                        internationally. The company primarily offers cigarettes
                        and cigars; staples, spices, biscuits, confectionery and
                        gums, snacks, noodles and pasta, beverages, dairy, ready
                        to eat meals, chocolate, coffee, and frozen foods;
                        personal care products; education and stationery
                        products; safety matches; and incense sticks under
                        various brands. It also retails formals and casual wear
                        products, and other lifestyle products under the WLS
                        brand. In addition, the company offers paper boards and
                        specialty paper products; and packaging products, such
                        as carton board, flexible, tobacco, and green packaging
                        products, as well as operates approximately 100 hotels
                        under the ITC Hotel, WelcomHotel, Fortune, and
                        WelcomHeritage brands. Further, it exports feed
                        ingredients, food grains, marine products, processed
                        fruits, coffee products, leaf tobacco products, and
                        spices; and offers IT services and solutions.
                        Additionally, the company offers technology services and
                        solutions for the banking, financial services, consumer
                        packaged goods, manufacturing, travel, hospitality, and
                        healthcare industries. The company also provides
                        property infrastructure and real estate maintenance,
                        business consulting, real estate development, and
                        agro-forestry and other related services; manages and
                        operates golf courses; fabricates and assembles
                        machinery for tube filling, cartoning, wrapping,
                        conveyor solutions, and engineering services; and
                        produces and commercializes seed potato technology
                        products. ITC Limited was incorporated in 1910 and is
                        headquartered in Kolkata, India.
                      </div>
                    </div>
                  </div>
                </div>
                <div id="holders" className="tab-pane fade pt-3">
                  <div className="row">
                    <div className="col-12">Major Holders</div>
                  </div>
                  <div className="row">
                    <div className="col-6">29.98%</div>
                    <div className="col-6">
                      % of shares held by all insiders
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">44.96%</div>
                    <div className="col-6">
                      % of shares held by institutions
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">64.04%</div>
                    <div className="col-6">% of float held by institutions</div>
                  </div>
                  <div className="row">
                    <div className="col-6">209</div>
                    <div className="col-6">
                      Number of institutions holding shares
                    </div>
                  </div>
                </div>
                <div id="sustainability" className="tab-pane fade pt-3">
                  <div className="row">
                    <div className="col-12">
                      Environment, social and governance (ESG) risk ratings
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <div className="row">Total ESG risk score</div>
                      <div className="row">
                        <div className="col-6">27</div>
                        <div className="col-6">48th percentile</div>
                      </div>
                      <div className="row">Medium</div>
                    </div>
                    <div className="col-3">
                      <div className="row">Environment risk score</div>
                      <div className="row">7.2</div>
                    </div>
                    <div className="col-3">
                      <div className="row">Social risk score</div>
                      <div className="row">12.3</div>
                    </div>
                    <div className="col-3">
                      <div className="row">Governance risk score</div>
                      <div className="row">8.0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
