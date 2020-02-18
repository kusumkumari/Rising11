
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import {
  Link
} from 'react-router-dom';
import Checkbox from "@material-ui/core/Checkbox";
import { isLoggedIn,createPaymentAPI, paymentConfigAPI,CreateContestUserAPI, walletProcessAPI, getPlayersAPI, selectedPlayerAPI,joinContestAPI,listwalletAPI, selectCaptiansAPI, retriveCaptiansAPI, listMyTeamAPI,checkAmountValidityAPI } from '../../App/ApiIntegration'
import Cookies from 'universal-cookie';

class UserJoinContestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      successMsg: '',
      allPlayersData: [],
      wkPlayers: [],
      batPlayers: [],
      bowlPlayers: [],
      allPlayers: [],
      playerIds: [],
      teama_name: '',
      teamb_name: '',
      is_captain: false,
      is_vicecaptain: false,
      selectedCaptain: "",
      selectVC: "",
      isSave: false,
      playerStates: [],
      playerPoints: [],
      myTeams: [],
      isConfirm:false,
      teamName:"",
      requiredAmt:"",
      keyId: "",
      currency: "",
      keySecret: "",
    }
  }
 
  teamPreview() {

    document.getElementById("myDIV").className = "bg-background block";
    document.getElementById("myteam").className = "team-header none";

  }

  teamPreviewClose() {
    document.getElementById("myDIV").className = "bg-background none ";
    document.getElementById("myteam").className = "team-header block ";

  }
  listwallet() {
    listwalletAPI((response) => {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxx", response.response.data)
      if (response.response.data.success == true) {
        this.setState({
          bonusMoney: response.response.data.bonus_amount,
          transferMonney: response.response.data.transfer_amount,
          winningMoney: response.response.data.winning_amount,
          totalMoney: response.response.data.exact_amount,
          depositMoney: response.response.data.add_amount,
          usableMoney: response.response.data.exact_use_amount
        });
        // localStorage.setItem("match_title",response.response.data.short_title);
        // localStorage.setItem("time_left",response.response.data.timeleft);
      }
      else {
        this.setState({ errorMsg: "Unable to load wallet Data" });
      }
    });
  }
  handleChange(e){
    console.log("hhhhhhhhhhhhhhhhhaaaaaaaaaaaannnnnnn",e.target.name)
    this.setState({teamName:e.target.name})
    this.listwallet();
  }
  componentDidMount() {
    const { cid, matchid } = this.props.queryString;
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
    this.listMyTeam(cid, matchid, myCookie);
    this.checkAmountValidity(this.props.queryString.entryfee);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true;
    document.body.appendChild(script);
    this.paymentConfig();
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
    createPaymentAPI({ amount: this.state.requiredAmt, keyid: keyId, keySecret: keySecret, currency: currency }, (response) => {
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
        // this.joinContest();
      }
      else {
        alert(response.response.data.message)
      }
    });
  }

  saveContest=()=>{
    const { matchid, cid, contestName, prize, winner, ratio } = this.props.queryString;
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
     CreateContestUserAPI({cookie_id:myCookie, contest_name: contestName,match_id:matchid,cid:cid, total_prize: prize, wining: winner, ratio:ratio }, (response) => {
        console.log("ccccccccccccccccccc", response)
        if (response.response.data.success == true) {
          alert(response.response.data.message)
          this.joinContest(response.response.data.id)
        }
        else {
          this.setState({
            errorMsg: "unable to load data"
          });
        }
      });
    
    
    }

  checkAmountValidity(e){
  checkAmountValidityAPI({ entry_fee: e ? e:"" }, (response) => {
    console.log("dddddddddddddddddddddd", response)
    if (response.response.data.status == true) {
      this.setState({
        isConfirm: response.response.data.is_confirmation,
        requiredAmt: response.response.data.required_amount,
        entryFee: e
      });
    
    }
    else {
      this.setState({ errorMsg: "Unable to load wallet Data" });
    }
  });
}

  listMyTeam(cid, matchid, myCookie) {
    listMyTeamAPI({ cookie_id: myCookie, cid: cid, match_id: matchid }, (response) => {
      console.log("1111111111111111111", response)
      if (response.response.data.status == true) {
        this.setState({
          myTeams: response.response.data.myteam,
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load Players Data" });
      }
    });


  }

  retriveCaptians(cid, matchid, team) {
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
    retriveCaptiansAPI({ cookie_id: myCookie, cid: cid, match_id: matchid, team_count: team }, (response) => {
      console.log("88888888888888", response)
      if (response.response.data.success == true) {
        this.setState({
          selectedCaptain: response.response.data.is_captain,
          selectVC: response.response.data.is_vicecaptain,
          isSave: response.response.data.is_save,
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load Players Data" });
      }
    });


  }
  getAllTypePlayers = (team) => {
    const { cid, matchid } = this.props.queryString;
    let types = ""
    getPlayersAPI(cid, matchid, types, (response) => {
      console.log("000000000000000", response.response.data)
      if (response.response.data.status == true) {
        this.setState({
          allPlayersData: response.response.data.profile_data,
          teama_name: response.response.data.teama_name,
          teamb_name: response.response.data.teamb_name,
        });
        this.selectedPlayer(cid, matchid, types, team);
        this.retriveCaptians(cid, matchid, team);
      }
      else {
        this.setState({ errorMsg: "Unable to load Players Data" });
      }
    });

  }

  selectedPlayer(cid, matchid, type, team) {
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
    selectedPlayerAPI({ cookie_id: myCookie, cid: cid, match_id: matchid, player_role: type, team_count: team }, (response) => {
      console.log("66666666666666", response)
      if (response.response.data.success == true) {

        this.setState({
          wkPlayers: response.response.data.wkplayer,
          batPlayers: response.response.data.batplayer,
          bowlPlayers: response.response.data.bowlplayer,
          allPlayers: response.response.data.allplayer,
          playerIds: response.response.data.player,


        });
      }
      else {
        this.setState({ errorMsg: "Unable to load Players Data" });
      }
    });
  }
  selectCaptians(pid, is_captain, is_vicecaptain) {
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
    const { cid, matchid } = this.props.queryString;
    selectCaptiansAPI({ cookie_id: myCookie, cid: cid, match_id: matchid, pid: pid, is_captain: is_captain, is_vicecaptain: is_vicecaptain }, (response) => {
      console.log("777777777777", response)
      if (response.response.data.success == true) {
        this.setState({
          selectedCaptain: response.response.data.is_captain,
          selectVC: response.response.data.is_vicecaptain,
          isSave: response.response.data.is_save,
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load Players Data" });
      }
    });
  }
  joinContest(contestid){
    const { matchid, cid } = this.props.queryString;

    const {entryFee, teamName} =this.state;
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
    joinContestAPI({ cookie_id: myCookie, cid: cid, match_id: matchid, team_count:teamName,amount:entryFee,contest:contestid }, (response) => {
      console.log("jjjjjoooooiiiiinnnn", response)
      if (response.response.data.status == true) {
        console.log("jjjjjoooooiiiiinnnn", response)
        window.location.href="/contestcode/"+contestid;

      }
      else {
        alert(response.response.data.message);
      }
    });

  } 
  render() {
    console.log("nnnnnnnnnnnnnnnn",this.props.queryString)
    const { allPlayersData, wkPlayers, batPlayers, bowlPlayers, allPlayers, myTeams } = this.state;

    const wkplayerData = []
    const batplayerData = []
    const bowlplayerData = []
    const allplayerData = []

    for (let index = 0; index < allPlayersData.length; index++) {
      const { pid, short_name, credit, country, thumb_url, } = allPlayersData[index];

      wkplayerData.push(
        wkPlayers.includes(pid) ?
          <div className="players-cards-1" key={pid + "2"}>
            {pid == this.state.selectedCaptain ?
              <div className="role-btn-player">
                C
            </div>
              : ""}
            {pid == this.state.selectVC ?
              <div className="role-btn-player">
                VC
            </div>
              : ""}
            {thumb_url ?
              <img src={thumb_url} className="players-pic" />
              :
              <img src={require("../../../img/teams/default-player-image.png")} className="players-pic" />
            }

            <div className={country == this.state.teama_name ? "players-name-box" : "players-name-box players-name-box_active"}>
              <h5 className="players-h5">{short_name}</h5>
            </div>
            <p className="cr-players">{credit} Cr</p>
          </div>
          : ""
      )

      batplayerData.push(
        batPlayers.includes(pid) ?
          <div className="players-cards-1" key={pid + "3"}>
            {pid == this.state.selectedCaptain ?
              <div className="role-btn-player">
                C
            </div>
              : ""}
            {pid == this.state.selectVC ?
              <div className="role-btn-player">
                VC
            </div>
              : ""}
            {thumb_url ?
              <img src={thumb_url} className="players-pic" />
              :
              <img src={require("../../../img/teams/default-player-image.png")} className="players-pic" />
            }

            <div className={country == this.state.teama_name ? "players-name-box" : "players-name-box players-name-box_active"}>
              <h5 className="players-h5">{short_name}.</h5>
            </div>
            <p className="cr-players">{credit} Cr</p>
          </div>
          : ""
      )


      bowlplayerData.push(
        bowlPlayers.includes(pid) ?
          <div className="players-cards-1" key={pid + "4"}>
            {pid == this.state.selectedCaptain ?
              <div className="role-btn-player">
                C
            </div>
              : ""}
            {pid == this.state.selectVC ?
              <div className="role-btn-player">
                VC
            </div>
              : ""}
            {thumb_url ?
              <img src={thumb_url} className="players-pic" />
              :
              <img src={require("../../../img/teams/default-player-image.png")} className="players-pic" />
            }

            <div className={country == this.state.teama_name ? "players-name-box" : "players-name-box players-name-box_active"}>
              <h5 className="players-h5">{short_name}.</h5>
            </div>
            <p className="cr-players">{credit} Cr</p>
          </div>
          : ""
      )

      allplayerData.push(
        allPlayers.includes(pid) ?
          <div className="players-cards-1" key={pid + "5"}>
            {pid == this.state.selectedCaptain ?
              <div className="role-btn-player">
                C
            </div>
              : ""}
            {pid == this.state.selectVC ?
              <div className="role-btn-player">
                VC
            </div>
              : ""}
            {thumb_url ?
              <img src={thumb_url} className="players-pic" />
              :
              <img src={require("../../../img/teams/default-player-image.png")} className="players-pic" />
            }

            <div className={country == this.state.teama_name ? "players-name-box" : "players-name-box players-name-box_active"}>
              <h5 className="players-h5">{short_name}.</h5>
            </div>
            <p className="cr-players">{credit} Cr</p>
          </div>
          : ""
      )

    }
    return (
      <>
        <header className="team-header" id="myteam">
          <div class="logo-box">
          <marquee className="alert-red">
              This is a Beta Version of Rising11
            </marquee>
            <div class="row">
              <div class="col-md-2 col-xs-3">
                {/* <Link to={"/contest/" + this.props.queryString.matchid + "/" + this.props.queryString.cid} key={this.props.queryString.cid}>
                  </Link> */}
                <i class='fa fa-chevron-left ch p-14' onClick={() => history.go(-1)}></i>

              </div>
              <div class="col-md-8 col-xs-6">
                <h5 class="heading">My Team</h5>
              </div>
              <div class="col-md-2 col-xs-3">
                {isLoggedIn() ?
                  <a href="#" class="wallet-link" onClick={this.openNav}><i class="fa fa-wallet"></i></a>
                  :
                  <Link to="/login" class="login-btn contests-login-btn p-14">Sign In</Link>
                }
              </div>
            </div>
          </div>
          <div class="row" style={{ backgroundColor: "#00163f", marginRight: "0" }}>
            <div class="timer">
              <div class="col-md-6 col-xs-6">
                <p class="p1-1">{myTeams && myTeams.length > 0 ? myTeams[0].name : ""}</p>
              </div>
              <div class="col-md-6 col-xs-6">
                <p class="p1-1 text-red"><i class="far fa-clock"></i> {myTeams && myTeams.length > 0 ? myTeams[0].timeleft : ""}
                </p>
              </div>
            </div>

          </div>

          <div class="team hg-80">
            {/* loop */}
            <div class="my-teams__title">You can create up to 6 teams for a single contest</div>
            {myTeams.map((data, idx) => (
              <div className="my-teams__team" key={idx}>
                <div className="topSection_083bc">
                  <Checkbox

                    color="primary"
                    name={data.teamname}
                    id={data.teamname}
                    onClick={(e)=>this.handleChange(e)}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <div>Team: {data.teamname}</div>
                </div>
                <div>
                  <div className="my-teams__bottom-section bottomSection_d41f9">
                    <div className="my-teams__role-entity">
                      <div>
                        <div className="my-teams__role-entity__title my-teams__role-entity--even">Captain</div>
                        <div className="my-teams__role-entity__player-name">{data.captain}</div>
                      </div>
                    </div>
                    <div className="my-teams__role-entity">
                      <div>
                        <div className="my-teams__role-entity__title my-teams__role-entity--odd">Vice Captain</div>
                        <div className="my-teams__role-entity__player-name">{data.vicecaptain}</div></div></div></div></div>
                    <div className="buttonBar_09c83">
                      <a className="js--icon-edit resetButton_62ab8" href="">
                        <Link to={"/createteam/" + this.props.queryString.matchid + "/" + this.props.queryString.cid + "/" + data.teamname + "/wk"}>
                          <div className="primaryButtonAlign_02538">
                            <i className="fa fa-pencil" style={{ height: "14px", width: "14px", fontSize: "14px" }}></i>
                            <span className="iconContent_3cbfd">EDIT</span>
                          </div>
                        </Link>
                      </a>
                  <div className="js--my-teams-team-preview-btn">
                    <button className="new-button resetButton_62ab8">
                      <div className="primaryButtonAlign_02538" onClick={() => this.getAllTypePlayers(data.teamname)}>
                        <i className="fa fa-eye" style={{ height: "14px", width: "14px", fontSize: "14px" }}></i>
                        <span className="iconContent_3cbfd">PREVIEW</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="container_eee6d">
            <div className="innerContainer_b8f9b">
              <a className="btn btn--flat btn--background--white center">
                <div>
                  {this.state.teamName !="" ?
                  <div data-toggle="modal" data-target="#myModal1" >Join1</div>
                  :
                  <div onClick={()=>alert("Please select a team")}>Joins</div>
                  }
                </div>
              </a>
            </div>
          </div>
        </header>
        <div className="bg-background none" id="myDIV">
          <div className="bg-4">
            <div className="close-icon" onClick={this.teamPreviewClose}>X</div>
            <div className="col-7">
              {wkPlayers && wkPlayers.length > 0 ? 
                <div className="typeo">
                  Wicketkeeper
                </div>
              : ""}
              <div className="flex">
                {wkplayerData}
              </div>

              {batPlayers && batPlayers.length > 0 ? 
                <div className="typeo">
                  Batsmen
                </div>
              : ""}
              <div className="flex">
                {batplayerData}
              </div>

              {allPlayers && allPlayers.length > 0 ? 
                <div className="typeo">
                  All-Rounder
                </div>
              : ""}
              <div className="flex">
                {allplayerData}
              </div>
              {bowlPlayers && bowlPlayers.length > 0 ? 
                <div className="typeo">
                  Bowler
                </div>
              : ""}
              <div className="flex">
                {bowlplayerData}
              </div>
            </div>
          </div>
          <div className="modal" id="myModal1" role="dialog">
            <div className="modal-dialog">

              <div className="modal-content p-14">
                <div className="modal-header">

                  {/* there is use condition of Confirmation and low balance */}

                  <p className="ps-2 text-center">{this.state.isConfirm ? "Confirmation" : "Low Balance"}</p>
                 
                </div>
                <div className="modal-body">
                  <span className="flex pt-ser">
                    <div className="balance">Currently Balance</div>
                    <div className="balance-1"><i className="fa fa-inr" aria-hidden="true"></i>
                      {this.state.totalMoney ? this.state.totalMoney : "0"}
                    </div>
                  </span>
                  <span className="flex pt-ser">
                    <div className="balance">Usable Balance</div>
                    <div className="balance-1"><i className="fa fa-inr" aria-hidden="true"></i>
                      {this.state.usableMoney ? this.state.usableMoney : "0"}
                    </div>
                  </span>
                  <span className="flex pt-ser">
                    <div className="balance">Joining Amount</div>
                    <div className="balance-1"><i className="fa fa-inr" aria-hidden="true"></i>
                      {this.state.entryFee ? this.state.entryFee : ""}
                    </div>
                  </span>
                  <br />
                  {/* there is use condition of Confirmation and low balance */}
                  {!this.state.isConfirm ?
                    <>
                      <p className="p-14">Amount To Add</p>
                      <input type="number" value={this.state.requiredAmt} className="add-cash-input" onChange={(e) => { this.setState({ requiredAmt: e.target.value, }); }} />
                    </>
                    : ""
                  }
                </div>
                <div className="modal-footer flex">
                  {this.state.isConfirm ?
                    <button className="add-cash" onClick={() => this.saveContest()}>Join Contest</button>
                    :
                    <button className="add-cash" onClick={() => this.createPayment()}>ADD CASH</button>
                  }
                </div>
              </div>

            </div>
          </div>

        </div>
      </>
    );
  }
}
export default UserJoinContestCard;
