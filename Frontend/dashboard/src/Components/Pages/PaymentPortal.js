import React from "react";

export default class PaymentPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: this.props.price,
    };
  }

  render() {
    return (
      <div className="payment">
        <div class="row mb-4 payment-heading">
          <div class="col-lg-8 mx-auto text-center payment-heading-col">
            <h1>Payment Gateway - {this.state.plan}</h1>
          </div>
        </div>
        <div class="row mb-4 payment-form">
          <div class="col-lg-6 mx-auto">
            <div class="card ">
              <div class="card-header">
                <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                  <ul
                    role="tablist"
                    class="nav bg-light nav-pills rounded nav-fill mb-3"
                  >
                    <li class="nav-item">
                      <a
                        data-toggle="pill"
                        href="#credit-card"
                        class="nav-link active "
                      >
                        <i class="fas fa-credit-card mr-2"></i> Credit Card
                      </a>
                    </li>
                    <li class="nav-item">
                      <a data-toggle="pill" href="#paypal" class="nav-link ">
                        <i class="fab fa-paypal mr-2"></i> Paypal
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        data-toggle="pill"
                        href="#net-banking"
                        class="nav-link "
                      >
                        <i class="fas fa-mobile-alt mr-2"></i> Net Banking
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="tab-content">
                  <div id="credit-card" class="tab-pane fade show active pt-3">
                    <form>
                      <div class="form-group">
                        <label for="username">
                          <h6>Card Owner</h6>
                        </label>
                        <input
                          type="text"
                          name="username"
                          placeholder="Card Owner Name"
                          required
                          class="form-control "
                        />
                      </div>
                      <div class="form-group">
                        <label for="cardNumber">
                          <h6>Card number</h6>
                        </label>
                        <div class="input-group">
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="Valid card number"
                            class="form-control "
                            required
                          />
                          <div class="input-group-append">
                            <span class="input-group-text text-muted">
                              <i class="fab fa-cc-visa mx-1"></i>
                              <i class="fab fa-cc-mastercard mx-1"></i>
                              <i class="fab fa-cc-amex mx-1"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-8">
                          <div class="form-group">
                            <label>
                              <span class="hidden-xs">
                                <h6>Expiration Date</h6>
                              </span>
                            </label>
                            <div class="input-group">
                              <input
                                type="number"
                                placeholder="MM"
                                name=""
                                class="form-control"
                                required
                              />
                              <input
                                type="number"
                                placeholder="YY"
                                name=""
                                class="form-control"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group mb-4">
                            <label
                              data-toggle="tooltip"
                              title="Three digit CV code on the back of your card"
                            >
                              <h6>
                                CVV
                                <i class="fa fa-question-circle d-inline"></i>
                              </h6>
                            </label>
                            <input type="text" required class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="card-footer">
                        <button
                          type="button"
                          class="subscribe btn btn-primary btn-block shadow-sm"
                          onClick={this.props.onClick}
                          name="next"
                        >
                          Confirm Payment
                        </button>
                      </div>
                    </form>
                  </div>
                  <div id="paypal" class="tab-pane fade pt-3">
                    <h6 class="pb-2">Select your paypal account type</h6>
                    <div class="form-group">
                      <label class="radio-inline px-2">
                        <input type="radio" name="optradio" checked /> Domestic
                      </label>
                      <label class="radio-inline px-2">
                        <input type="radio" name="optradio" class="ml-5" />
                        International
                      </label>
                    </div>
                    <p>
                      <button
                        type="button"
                        class="btn btn-primary mt-4"
                        onClick={this.props.onClick}
                        name="next"
                      >
                        <i class="fab fa-paypal mr-2"></i> Log into my Paypal
                      </button>
                    </p>
                    <p class="text-muted">
                      Note: After clicking on the button, you will be directed
                      to a secure gateway for payment. After completing the
                      payment process, you will be redirected back to the
                      website to view details of your order.
                    </p>
                  </div>
                  <div id="net-banking" class="tab-pane fade pt-3">
                    <div class="form-group ">
                      <label for="Select Your Bank">
                        <h6>Select your Bank</h6>
                      </label>
                      <select class="form-control" id="ccmonth">
                        <option value="" selected disabled hidden>
                          --Please select your Bank--
                        </option>
                        <option value="State Bank of India">
                          State Bank of India
                        </option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">
                          Kotak Mahindra Bank
                        </option>
                        <option value="IndusInd Bank">IndusInd Bank</option>
                        <option value="Bank of Baroda">Bank of Baroda</option>
                        <option value="Punjab National Bank">
                          Punjab National Bank
                        </option>
                        <option value="YES Bank">YES Bank</option>
                        <option value="IDBI Bank">IDBI Bank</option>
                        <option value="Bank of Maharashtra">
                          Bank of Maharashtra
                        </option>
                      </select>
                    </div>
                    <div class="form-group mt-4">
                      <p>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={this.props.onClick}
                          name="next"
                        >
                          <i class="fas fa-mobile-alt mr-2"></i> Proceed Payment
                        </button>
                      </p>
                    </div>
                    <p class="text-muted">
                      Note: After clicking on the button, you will be directed
                      to a secure gateway for payment. After completing the
                      payment process, you will be redirected back to the
                      website to view details of your order.
                    </p>
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
