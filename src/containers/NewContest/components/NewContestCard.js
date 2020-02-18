
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { isLoggedIn, contestPrizeBreakupAPI,CreateContestUserAPI,createPaymentAPI, paymentConfigAPI, walletProcessAPI } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';

import { Input } from 'reactstrap';
import Cookies from 'universal-cookie';


class NewContestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      winner: "",
      entryFee: "",
      errorMsg: "",
      contestData:[],
      keyId: "",
      currency: "",
      keySecret: "",
    }
  }
  openNav() {
    document.getElementById("myNav").style.display = "block";
    // this.checkAmountValidity(localStorage.getItem("entryFee"));

  }

  closeNav() {
    document.getElementById("myNav").style.display = "none";
  }
  componentDidMount() {
    const { matchid, cid, contestName, contestSize, prize } = this.props.queryString;
    this.contestPrizeBreakup(contestName, contestSize, prize);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true;
    document.body.appendChild(script);
    this.paymentConfig();
    
  }
  contestPrizeBreakup(contestName, contestSize, prize) {
    contestPrizeBreakupAPI({ contest_name: contestName, total_prize: prize, contest_size: contestSize }, (response) => {
      console.log("xxxxxxxxxxxxxxxxxxx", response)
      if (response.response.data.status == true) {
        this.setState({
          data: response.response.data.contextdata,
          data1: response.response.data.contextdata1,
          rank1: response.response.data.contextdataratio,
          rankOther: response.response.data.contextdata1ratio,
          winner: response.response.data.winner,
          entryFee: response.response.data.entry_fee,
        })
      }
      else {
        this.setState({
          errorMsg: "unable to load data"
        });
      }
    });
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

  createPayment() {
    const { keyId, keySecret, currency } = this.state;
    createPaymentAPI({ amount: this.state.entryFee, keyid: keyId, keySecret: keySecret, currency: currency }, (response) => {
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
        // document.getElementById('addModal').click();    
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
        this.saveContest();
      }
      else {
        alert(response.response.data.message)
      }
    });
  }

  saveContest=()=>{
 
    if(this.state.ratio){
    const { matchid, cid, contestName, prize } = this.props.queryString;
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
     CreateContestUserAPI({cookie_id:myCookie, contest_name: contestName,match_id:matchid,cid:cid, total_prize: prize, wining: this.state.winner, ratio:this.state.ratio }, (response) => {
        console.log("ccccccccccccccccccc", response)
        if (response.response.data.success == true) {
          alert(response.response.data.message)
          //joinContestAPI()
          window.location.href="/contestcode/"+response.response.data.id;
        }
        else {
          this.setState({
            errorMsg: "unable to load data"
          });
        }
      });
    }
    else{
      alert("Please Select Prize Brakup")
    }
    }

  choosePrizeBrakup=(id)=>{
  this.setState({ratio:id})

  }

  // checkAmountValidity(e){
  //   checkAmountValidityAPI({ entry_fee: e ? e:"" }, (response) => {
  //     console.log("dddddddddddddddddddddd", response)
  //     if (response.response.data.status == true) {
  //       this.setState({
  //         isConfirm: response.response.data.is_confirmation,
  //         requiredAmt: response.response.data.required_amount,
  //         entryFee: e
  //       });
      
  //     }
  //     else {
  //       this.setState({ errorMsg: "Unable to load wallet Data" });
  //     }
  //   });
  // }
 
  render() {

    const { data, winner, entryFee, data1, recommendDiv} = this.state;
    const { contestName, contestSize, prize } = this.props.queryString;
    return (
      <div className="bg">
        <header>
          <div className="logo-box">
          <marquee className="alert-red">
              This is a Beta Version of Rising11
            </marquee>
            <div className="row">
              <div className="col-md-4 col-xs-3">
                <Link to={"/contest/" + this.props.queryString.matchid + "/" + this.props.queryString.cid} key={this.props.queryString.cid}>
                  <i className='fa fa-chevron-left ch p-14'></i></Link>
              </div>
              <div className="col-md-4 col-xs-6">
                <h5 className="heading">New Contests</h5>
              </div>
              <div className="col-md-4 col-xs-3">
                {isLoggedIn() ?
                ""
                  // <a href="#" className="wallet-link" onClick={this.openNav}>
                  //   <i class="material-icons">account_balance_wallet</i></a>
                  :
                  <Link to="/login" className="login-btn contests-login-btn p-14">Sign In</Link>
                }
              </div>
            </div>
          </div>
          <div className="row row-s-2-3">
            <div className="timer">
              <div className="col-md-6 col-xs-6">
                <p className="p1-1">{localStorage.getItem("match_title")}</p>
              </div>
              <div className="col-md-6 col-xs-6">
                <p className="p1-1 text-red"><i className="far fa-clock"></i> {localStorage.getItem("time_left")}
                </p>
              </div>
            </div>
         
          </div>


          <div className="team hg-80 ">
            <div className="myContestDetail_ea02a" >
              <div>
                <div className="contestDetailItemHeader_a91f1">CONTEST SIZE</div>
                <div style={{ fontWeight: "normal" }}>{contestSize}</div>
              </div>
              <div>
                <div className="contestDetailItemHeader_a91f1">TOTAL WINNINGS</div>
                <div style={{ fontWeight: "bold" }}><span style={{ height: "24px" }}>₹ {prize}</span></div>
              </div>
              <div><div className="contestDetailItemHeader_a91f1">ENTRY FEE</div>
                <div style={{ fontWeight: "normal" }}>₹ {entryFee}</div></div></div>

            <div className="winnerBreakupSelectBoxContainer_1b00d" >
              <div className="winnerBreakupSelectorLabel_8ee3f">Choose total no. of winners</div>
              <div className="winnerBreakupSelectBox_92ac2" >
              <Input type="radio" name="ratio" onClick={()=>this.choosePrizeBrakup(this.state.rank1)} />
              <h3 style={{marginRight: "240px"}}>{winner + " Winners (Recommended)"} </h3>
              </div>
                  <br /><br/>
              <div className="winnerBreakupTable winnerBreakupTable_b4b25">
                <div className="scroll">
                  <div>
                    {data.map((rankData, idx) => (
                      <div className="winnerBreakupRowBig_d5608 partition_649b0" key={idx}>
                        <div className="rankRange_ffbbc">Rank {rankData.rank}</div>
                        <div className="winnerPercent_df867">{rankData.per} %</div>
                        <div className="prizeAmount_e10d2">₹ {rankData.peruser}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div><br /><br />
              <div className="winnerBreakupSelectorLabel_8ee3f">Choose total no. of winners</div>
              <div className="winnerBreakupSelectBox_92ac2">
              <Input type="radio" name="ratio" onClick={()=>this.choosePrizeBrakup(this.state.rankOther)} />
              <h3 style={{marginRight: "350px"}}>1 Winners</h3>
              </div>

              <div className="winnerBreakupTable winnerBreakupTable_b4b25">
                <div className="scroll">
                  <div>
                      <div className="winnerBreakupRowBig_d5608 partition_649b0" key={45}>
                        <div className="rankRange_ffbbc">Rank {data1? data1[0].rank :""}</div>
                        <div className="winnerPercent_df867">{data1? data1[0].per: ""} %</div>
                        <div className="prizeAmount_e10d2">₹ {data1? data1[0].peruser:""}</div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
          <div className="container_eee6d" style={{display:recommendDiv}}>
            <div className="innerContainer_b8f9b">

              <a className="btn btn--flat btn--background--white center wd-70s">
                <div>
               
                <div onClick={()=>this.openNav()} >Create Contest & Invite Friends</div>
                  {/* <div onClick={this.saveContest}>Create Contest & Invite Friends</div> */}
                </div>
              </a>

            </div>
          </div>
        </header>

        <div className="modal" id="myNav" style={{ display: "none" }} role="dialog">
          <div className="modal-dialog">

            <div className="modal-content p-14">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title title">ADD CASH for</h4>
              
              </div>
              <div className="modal-body">
                <p>Add Cash for join Contest</p>
                <p className="p-16">Amount To Add</p>
                <input type="number" value={this.state.entryFee}  className="add-cash-input" />
              </div>
              <div className="modal-footer flex">
                <button className="add-cash" onClick={() => this.createPayment()}>ADD CASH</button>
              </div>
            </div>

          </div>
        </div>

      </div >
    );
  }
}
export default NewContestCard;
