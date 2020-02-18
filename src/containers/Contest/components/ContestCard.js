
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { isLoggedIn, listContestAPI, listwalletAPI, checkAmountValidityAPI, getProfileAPI } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';
import Cookies from 'universal-cookie';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getDayOfYear } from 'date-fns';

class ContestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      timeLeft: "",
      mtitle: "",
      short_title: "",
      is_created_team: "",
      is_profile: localStorage.getItem("is_profile"),
      is_verified: localStorage.getItem("is_verified"),
      entryFee: "",
      addAmount: "",
      isConfirm: false,
      requiredAmt: "",
    }
  }
  openNav() {
    document.getElementById("myNav").style.display = "block";
    this.listwallet();
  }

  closeNav() {
    document.getElementById("myNav").style.display = "none";
  }
  componentDidMount() {
    const { cid, matchid } = this.props.queryString;
    this.listContest(cid, matchid);
    if(isLoggedIn()){
    getProfileAPI((response) => {
      console.log("jjjjjjjjjjjjj",response)
      if (response.response.data['status'] == true) {
        this.setState({
          is_verified: response.response.data.is_verified,
        });
        localStorage.setItem("is_verified", response.response.data.is_verified)
      }
    });
  }
   

  }
  listContest(cid, matchid) {
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
    listContestAPI({ cookie_id: myCookie, cid: cid, match_id: matchid }, (response) => {
      console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz", response)
      if (response.response.data.status == true) {
        this.setState({
          data: response.response.data.contextData,
          timeLeft: response.response.data.timeleft,
          mtitle: response.response.data.mtitle,
          short_title: response.response.data.short_title,
          is_created_team: response.response.data.is_created_team,
          is_join_contest: response.response.data.is_join_contest,
        });
        localStorage.setItem("match_title", response.response.data.short_title);
        localStorage.setItem("time_left", response.response.data.timeleft);
      }
      else {
        this.setState({ errorMsg: "Unable to load Contest Data" });
      }
    });
  }
  listwallet() {
    listwalletAPI((response) => {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxx", response)
      if (response.response.data.success == true) {
        this.setState({
          totalMoney: response.response.data.exact_amount,
        });

      }
      else {
        this.setState({ errorMsg: "Unable to load wallet Data" });
      }
    });
  }
  checkAmountValidity(e, id) {
    checkAmountValidityAPI({ entry_fee: e }, (response) => {
      console.log("dddddddddddddddddddddd", response)
      if (response.response.data.status == true) {
        this.setState({
          isConfirm: response.response.data.is_confirmation,
          requiredAmt: response.response.data.required_amount,
          entryFee: e
        });
        localStorage.setItem("entryFee", e);
        localStorage.setItem("contest", id);
        window.location.href = "/myteam/" + this.props.queryString.matchid + "/" + this.props.queryString.cid + "/c=1"
      }
      else {
        this.setState({ errorMsg: "Unable to load wallet Data" });
      }
    });

  }


  // createPayment(){
  //   alert(this.state.entryFee)
  //   alert(this.state.addAmount)
  // }
  render() {
    const { data, is_created_team, is_join_contest, is_profile, is_verified } = this.state;
    const { matchid, cid } = this.props.queryString;
    console.log("kkkkkkkkkkkkk",typeof(is_profile), is_verified)
    // alert(is_created_team)
    return (
      <div className="bg">
        <header>
          <div className="logo-box">
          <marquee className="alert-red">
              This is a Beta Version of Rising11
            </marquee>
            <div className="row">
              <div className="col-md-3 col-xs-4">

                <Link to={"/"}><i className='fa fa-home fa-home1 ch'></i></Link>

              </div>
              <div className="col-md-6 col-xs-4">
                <h5 className="heading">Contests</h5>
              </div>
              <div className="col-md-3 col-xs-4">
                {isLoggedIn() ?
                  <i className="material-icons wallet-link" onClick={() => this.openNav()}>account_balance_wallet</i>
                  :
                  <Link to="/login" className="login-btn sign-in-top-space">Sign In</Link>
                }
              </div>
            </div>
          </div>
          <div className="row row-s-2-3">
            <div className="timer">
              <div className="col-md-6 col-xs-6">
                <p className="p1-1">{this.state.short_title}</p>
              </div>
              <div className="col-md-6 col-xs-6">
                <p className="p1-1 text-red"><i className="far fa-clock"></i>{this.state.timeLeft}
                </p>
              </div>
            </div>
          </div>

          {isLoggedIn() ?
            <>
              <div className="sort">
                <span style={{ marginTop: "7px", display: "flex" }}>
                  <a href="#myModalcontest" data-toggle="modal" className="sort-link">Enter Contest Code</a>
                  {is_created_team >= 1 ?
                  <Link to={"/createcontest/" + matchid + "/" + cid} className="sort-link">
                    Create a Contest
                  </Link>
                  :
                  <span  className="sort-link" data-toggle="modal" data-target="#myModal2">Create a Contest</span>
                  }
                </span>
              </div>
            </>
            :
            <img src={require("../../../img/1-steps.png")} style={{ padding: "10px", background: "#FFFFFF", width: "100%" }} className="img-responsive" />
          }
          <div className="sortingHeader_7b795">
            <div className="sortLabel_c5373">Sort By:</div>
          </div>
          <div className="sort">
            <span style={{ marginTop: "7px" }}>
              <a href="#" className="sort-link">Entry Fee</a>
              <a href="#" className="sort-link">Contest Size</a>
            </span>
          </div>
          <div className="team hg-74">
            {/* loop */}
            {data.map((data, idx) => (
              <div key={idx}>
                <div className="segmentHeaderContainer_a4483 webkitSticky_3d076 segmentHeaderContainerTopOnboarding_0eb2e" >
                  <div className="headerTitle_ba6eb">{data.contest_name}</div>
                </div>
                {data.subcategory.map((datas, idy) => (
                  <div className="teams-1">

                    <div className="row">
                      <div className="col-md-6 col-xs-6">
                        <p className="contest-p">Prize Pool</p>
                        <h3 className="contest-h3"> {datas.total_prize} </h3>
                      </div>
                      <div className="col-md-6 col-xs-6">
                        <p className="contest-p contest-p-right">
                          <i className="fa fa-inr" aria-hidden="true"></i> {datas.registration_fee}
                        </p>
                        {isLoggedIn() ?
                          <>
                            {is_created_team >= 1 && is_profile == "true" && is_verified == true ?
                              <div className="login-btn btn1" onClick={() => this.checkAmountValidity(datas.registration_fee, datas.id)}>Join</div>

                              :
                              <div className="login-btn btn1" data-toggle="modal" data-target="#myModal2">Join</div>


                            }


                          </>
                          :
                          <Link to="/registration/">
                            <div className="login-btn btn1">Join</div>
                          </Link>

                        }

                      </div>
                    </div>
                    <div className="contestProgressBarContainer_0efc1">
                      <LinearProgress variant="determinate"
                        value={parseInt(((datas.totalcontext - datas.leftcontext) / datas.totalcontext * 100))} />

                      {/* <div className="contestProgressBar_eba45">
                        <div className="contestProgressInner_ead13"></div>
                      </div> */}
                    </div>
                    <div className="contestSpecRow_01429">
                      <div className="spotLefts_8d583 contestFilling_14509">{datas.leftcontext} spots left</div>
                      <div className="totalSpots_b62ba">Total {datas.totalcontext}  spots</div>
                    </div>
                    <Link to={isLoggedIn() ? "/contestdetail/" + matchid + "/" + cid + "/" + datas.id : "/registration/"} >
                      <div className="contestSpec_a3ebb">
                        <div className="iconLabelGroup_f55e1">
                          <div className="iconLabelWrapper_43690">
                            <i className="fa fa-trophy" style={{ marginRight: "5px" }}></i>
                            <span>{datas.winning_percentage}%</span>
                          </div>
                        </div>
                        <div className="iconLabelGroup_f55e1" style={{ justifyContent: "flex-end" }}>
                          {/* <div className="squareWithTwoRoundCorner_1291a">C</div> */}
                          {/* <div style={{ paddingeft: "12px" }}><div className="squareWithTwoRoundCorner_1291a">M</div></div> */}
                        </div>
                      </div>
                    </Link>
                  </div>

                ))}
              </div>

            ))}
            <div className="clearfix">
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
          </div>
          {isLoggedIn() ?

            <div className="container_eee6d">
              <div className="innerContainer_b8f9b">
                <a className="btn btn--flat btn--bordered btn--bordered--white text-color--white">
                  <div >
                    {/* if there is team count is 1 or greater then then display my team page 
                else create team is visibal */}
                    {is_created_team >= 1 ?
                      <Link to={"/myteam/" + matchid + "/" + cid + "/c=0"} className="align-center white-text">
                        <div>My Team</div> <div className="contestFooterCount_ac17c">{is_created_team}</div>
                      </Link>
                      :
                      <Link to={"/createteam/" + matchid + "/" + cid + "/0/wk"} className="align-center white-text">
                        <div>Create Team</div>
                      </Link>
                    }
                  </div>
                </a>

                <a className="btn btn--flat btn--background--white">
                  <div>
                    <Link to={"/joinedcontest/" + matchid + "/" + cid} className="align-center">
                      <div>Joined Contests</div>
                      {is_join_contest ?
                        <div className="contestFooterCount_ac17c">{is_join_contest}</div>
                        : ""}
                      {/* <div className="contestFooterCount_ac17c">1</div> */}
                    </Link>
                  </div>
                </a>

              </div>
            </div>
            : ""}

        </header>

        <div className="modal fade" id="myModalcontest" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content p-14">
              <div className="modal-header">
                <h4 className="modal-title title">CONTEST INVITE CODE</h4>

              </div>
              <div className="modal-body">
                <h5>If you have a Contest Invite Code, enter it below  </h5>
                <input type="text" className="add-cash-input" />

              </div>
              <div className="modal-footer flex">
                <button className="add-cash auto">Join Contest</button>
              </div>

            </div>

          </div>
        </div>

        <div className="modal " id="myNav" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content border-0 p-14">
              <div className="modal-header">
                <p className="ps-2 text-center">Account Balance</p>
                <button type="button" onClick={()=>this.closeNav()} class="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <span className="flex">
                  <div className="balance text-red">Total Balance</div>
                  <div className="balance-1 text-red"><i className="fa fa-inr" aria-hidden="true"></i> &nbsp;
                      {this.state.totalMoney ? this.state.totalMoney : "0"}
                  </div>
                </span>


              </div>
              <div className="modal-footer flex">
                <Link to="/mywallet"><div className="my-acc auto">My Account</div></Link>
                <br />
                <Link to="/mywallet" className="add-cash" style={{ float: "right", marginLeft: "5px" }} >ADD CASH</Link>
              </div>
            </div>

          </div>
        </div>

        <div className="modal fade" id="myModal2" role="dialog">
          <div className="modal-dialog">
            {is_created_team < 1 ?
              <div className="modal-content border-0 p-14">

                <div className="modal-body">

                  <p className="ps-2 text-center">Firstly create your Team then join/create contest</p>
                </div>
                <Link to={"/createteam/" + matchid + "/" + cid + "/0/wk"} >
                  <div className="modal-footer flex">

                    <button className="add-cash auto">Create Team</button>

                  </div>
                </Link>
              </div>
              :
              is_profile == false ?
                <div className="modal-content border-0 p-14">

                  <div className="modal-body">
                    <p className="ps-2 text-center">Firstly complete your Profile then join contest</p>
                  </div>
                  <Link to={"/editprofile/"} >
                    <div className="modal-footer flex">

                      <button className="add-cash auto">Complete Profile</button>

                    </div>
                  </Link>
                </div>
                :
                <div className="modal-content border-0 p-14">

                  <div className="modal-body">

                    <p className="ps-2 text-center">Firstly complete your verification then join contest</p>
                  </div>
                  <Link to={"/varification"} >
                    <div className="modal-footer flex">

                      <button className="add-cash auto">Verifiy</button>

                    </div>
                  </Link>
                </div>

            
            }


          </div>
        </div>


      </div >
    );
  }
}
export default ContestCard;
