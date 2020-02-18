
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { listwalletAPI, createPaymentAPI, paymentConfigAPI, walletProcessAPI } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';

class MyWalletCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "100",
      keyId: "",
      currency: "",
      keySecret: "",
    }
  }

  paymentConfig() {
    paymentConfigAPI((response) => {
      console.log("yyyyyyyyyyyyyyyyyyyyyyyy", response)
      if (response.response.data.success == true) {
        this.setState({
          keyId: response.response.data.data[0].keyid,
          currency: response.response.data.data[0].currency,
          keySecret: response.response.data.data[0].keySecret,
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load payment config API" });
      }
    });
  }
  listwallet() {
    listwalletAPI((response) => {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxx", response)
      if (response.response.data.success == true) {
        this.setState({
          bonusMoney: response.response.data.bonus_amount,
          transferMonney: response.response.data.transfer_amount,
          winningMoney: response.response.data.winning_amount,
          totalMoney: response.response.data.exact_amount,
          depositMoney: response.response.data.add_amount,
          usableMoney: response.response.data.exact_use_amount
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load wallet Data" });
      }
    });
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true;
    document.body.appendChild(script);
    this.listwallet();
    this.paymentConfig();
  }


  createPayment() {
    const { keyId, keySecret, currency } = this.state;
    createPaymentAPI({ amount: this.state.amount, keyid: keyId, keySecret: keySecret, currency: currency }, (response) => {
      console.log("qqqqqqqqqqqqqqqqqq", response)
      if (response.response.data.success == true) {
        let options = {
          "key": keyId,
          "order_id": response.response.data.data.id,
          "amount": response.response.data.data.amount, // 2000 paise = INR 20, amount in paisa
          "name": "Rising 11",
          "description": "Add/ Transfer/ Withdrawal Cash",
          "image": require("../../../img/1.png"),
          "handler": (response) => {
            if (response.razorpay_payment_id) {
              this.makePayment(response);
            }
            else {
              alert("Payment failed !!")
            }
          },
          "prefill": {
            "name": response.response.data.data.name,
            "contact": response.response.data.data.mobile,
            "email": response.response.data.data.email
          },
          "notes": {
            "address": "Hello World"
          },
          "theme": {
            "color": "#525f7f"
          }
        };

        let rzp = new window.Razorpay(options);
        rzp.open();
        document.getElementById('addModal').click();    
      }
      else {
        this.setState({ errorMsg: "Unable to load wallet Data" });
      }
    });
  }

  makePayment = (response) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
    walletProcessAPI({ order_id: razorpay_order_id, payment_id: razorpay_payment_id, signature: razorpay_signature }, (response) => {
      console.log("wwwwwwwwwwwwwwwwww", response)
      if (response.response.data.success == true) {
        alert(response.response.data.message);
        this.listwallet();
      }
      else {
        alert(response.response.data.message)
      }
    });
  }

  render() {
    return (
      <div className="bg">

        <header>
          <div className="logo-box">
            <div className="row">
              <div className="col-md-4 col-xs-3">
                <i className='fa fa-chevron-left ch' onClick={() => history.go(-1)}></i>
              </div>
              <div className="col-md-4 col-xs-6">
                <h5 className="heading">My Wallet</h5>
              </div>
              <div className="col-md-4 col-xs-3">
              </div>
            </div>
          </div>

          <div className="team white">
            <div id="myNav" >
              <div className="overlay-content mg-20">
                <h3>Total Balance</h3>
                <b className="p-14" style={{ color: "red", fontSize: "16px" }}><i className="fa fa-inr" aria-hidden="true"></i> {this.state.totalMoney}</b>
                <br /><br />
                <a href="#myModal1" data-toggle="modal" className="text-red add-cash p-14 ">Add Cash</a>
                <div className="clearfix">
                  <br />
                </div>
                <div className="content-container flex customize-css-1">
                  <div className="content">
                    <h5 className="cash-type">Winning</h5>
                    <p className="cash-amt lh-3"><i className="fa fa-inr" aria-hidden="true"></i>{this.state.winningMoney}</p>
                  </div>
                  <div className="content-right">
                    <a href="#" className="wallet-link-1 mg-04">Withdraw</a>
                    <a href="#" className="wallet-link-1 mg-04">Transfer</a>
                    <a href="#"><p className="i-icon"><i className="fa fa-info-circle"></i></p></a>
                  </div>
                </div>
                <div className="content-container flex customize-css-1">
                  <div className="content">
                    <h5 className="cash-type">Deposited </h5>
                    <p className="cash-amt lh-3"><i className="fa fa-inr" aria-hidden="true"></i>{this.state.transferMonney + this.state.depositMoney}</p>
                  </div>
                  <div className="content-right">
                    <a href="#"><p className="i-icon"><i className="fa fa-info-circle"></i></p></a>
                  </div>
                </div>

                <div className="content-container flex customize-css-1">
                  <div className="content">
                    <h5 className="cash-type">Bonus</h5>
                    <p className="cash-amt lh-3"><i className="fa fa-inr" aria-hidden="true"></i>{this.state.bonusMoney}</p>
                  </div>
                  <div className="content-right">
                    <a href="#"><p className="i-icon"><i className="fa fa-info-circle"></i></p></a>
                  </div>
                </div>

                <div className="pay-tabs content-container flex customize-css-1">
                  <div className="content">
                    <h5 className="cash-type">My Recent Transactions</h5>
                    <br /><br />
                  </div>
                  <div className="content-right">
                    <Link to="/wallet/Transaction"><p className="i-icon"><i className=" fa fa-chevron-right icon-c"></i></p></Link>
                  </div>
                </div>
{/* 
                <div className="pay-tabs content-container flex customize-css-1">
                  <div className="content">
                    <h5 className="cash-type">Manage Payements</h5>
                    <p className="wallet-text">Add / Remove cards, wallets, etc. </p>
                  </div>
                  <div className="content-right">
                    <p className="i-icon"><i className=" fa fa-chevron-right icon-c"></i></p>
                  </div>
                </div>
               */}
              </div>
            </div>
          </div>

          <div class="modal fade" id="myModal1" role="dialog">
            <div class="modal-dialog">

              <div class="modal-content p-14">
                <div class="modal-header">
                  <button type="button" id="addModal" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title title">ADD CASH</h4>
                  <span class="flex">
                    <div class="balance">Currently Balance</div>
                    <div class="balance-1"><i class="fa fa-inr" aria-hidden="true"></i>
                      {this.state.totalMoney}
                    </div>
                  </span>
                </div>
                <div class="modal-body">
                  <p>Add Cash to your account</p>

                  <input type="number" class="add-cash-input" value={this.state.amount} onChange={(e) => this.setState({ amount: e.target.value })} />
                </div>
                <div class="modal-footer flex">

                  <button class="add-cash" onClick={() => this.createPayment()}>ADD CASH</button>
                </div>
              </div>

            </div>
          </div>

        </header>

      </div >
    );
  }
}
export default MyWalletCard;
