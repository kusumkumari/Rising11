
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { isLoggedIn, getContestDetailAPI, checkAmountValidityAPI, getProfileAPI } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';
import Cookies from 'universal-cookie';
import LinearProgress from '@material-ui/core/LinearProgress';

class ContestDetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prize_breakup:[],
      is_profile: localStorage.getItem("is_profile"),
      is_verified: localStorage.getItem("is_verified"),
    }
  }

  prizeBlock() {
    document.getElementById("prize-breakup").style.display = "block";
    document.getElementById("leaderboard").style.display = "none";
  }

  leaderboard() {
    document.getElementById("prize-breakup").style.display = "none";
    document.getElementById("leaderboard").style.display = "block";
  }
  
  componentWillMount(){
    console.log("pppppppppppppppp",this.props)
    const {matchid, cid, id}= this.props.queryString;
      const cookies = new Cookies();
      var myCookie = cookies.get('matchCookies');
      getContestDetailAPI({ id:id.toString(),cookie_id: myCookie, cid: cid, match_id: matchid }, (response) => {
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz", response)
        if (response.response.data.status == true) {
          this.setState({
            data: response.response.data.contextData,
            timeLeft: response.response.data.timeleft,
            mtitle: response.response.data.mtitle,
            short_title: response.response.data.short_title,
            is_created_team: response.response.data.is_created_team,
            is_join_contest: response.response.data.is_join_contest,
            prize_breakup: response.response.data.breakup_prize,

          });
          localStorage.setItem("match_title", response.response.data.short_title);
          localStorage.setItem("time_left", response.response.data.timeleft);
        }
        else {
          this.setState({ errorMsg: "Unable to load Contest Data" });
        }
      });

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
  checkAmountValidity(e,id) {
    checkAmountValidityAPI({ entry_fee: e }, (response) => {
      console.log("dddddddddddddddddddddd", response)
      if (response.response.data.status == true) {
        this.setState({
          isConfirm: response.response.data.is_confirmation,
          requiredAmt: response.response.data.required_amount,
          entryFee: e
        });
        localStorage.setItem("entryFee",e);
        localStorage.setItem("contest",id);
        window.location.href="/myteam/"+this.props.queryString.matchid+"/"+this.props.queryString.cid+"/c=1"
      }
      else {
        this.setState({ errorMsg: "Unable to load wallet Data" });
      }
    });

  }
  
  render() {
  const{ data, prize_breakup, is_created_team, is_profile, is_verified,wkPlayers,wkplayerData,batPlayers,batplayerData,allPlayers,allplayerData
  ,bowlPlayers,bowlplayerData
}=this.state;
  const {matchid, cid, id}= this.props.queryString;
    return (
      <div className="bg">
        <header style={{marginLeft:"0"}}>
          <div className="logo-box">
            <div className="row">
              <div className="col-md-3 col-xs-3">
                <Link to={"/contest/" + this.props.queryString.matchid + "/" + this.props.queryString.cid}><i className='fa fa-chevron-left ch p-14'></i></Link>
              </div>
              <div className="col-md-6 col-xs-6">
                <h5 className="heading">Contests Details</h5>
              </div>
              <div className="col-md-3 col-xs-3">
                
              </div>
            </div>
          </div>
          <div className="row">
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
         
        <div className="team hg-88">
          <div className="contest-details-team">
            <div className="row">
              <div className="share-it">
              <div className="share-it-text">Share this contest with your friends</div> 
              <a href="#myModalcontest" data-toggle="modal" ><i className="fa fa-share-alt" aria-hidden="true"></i></a>
              </div>
              <div className="col-md-6 col-xs-6">
                <p className="contest-p">Prize Pool</p>
                <h3 className="contest-h3"> {data && data.total_prize ? data.total_prize : ""}</h3>
              </div>
              <div className="col-md-6 col-xs-6">
                <p className="contest-p contest-p-right">
                  <i className="fa fa-inr" aria-hidden="true"></i>  {data && data.registration_fee ? data.registration_fee:"" }
                </p>
                {is_created_team >= 1 && is_profile == "true" && is_verified == true ?
                <div className="login-btn btn1"  onClick={() => this.checkAmountValidity(data.registration_fee, data.id)}>Join</div>
             :
             <div className="login-btn btn1" data-toggle="modal" data-target="#myModal2">Join</div>
                        
                        }
                </div>
            </div>
              <div className="contestProgressBarContainer_0efc1">
                {data ?
              <LinearProgress variant="determinate" 
                    value={parseInt(((data.totalcontext-data.leftcontext)/data.totalcontext*100))} />
                    :""}
              </div>
              <div className="contestSpecRow_01429">
                <div className="spotLefts_8d583 contestFilling_14509">{data ? data.leftcontext : "0"} spots left</div>
                <div className="totalSpots_b62ba">Total {data ? data.totalcontext : "0"} spots</div>
              </div>
          </div>
          <div className="leaderboardTab_74170">
          <div className="tab_4245a">
            <div className="tabItem_8556a">
              <div className="tab-item tabItem_48a55" onClick={this.prizeBlock}>Prize Breakup</div>
            </div>
            <div className="tabItem_8556a">
              <div className="tab-item tabItem_48a55" onClick={this.leaderboard}>Leaderboard</div>
            </div>
          </div>
        </div>
          <div className="mainContainer_1841f" id="prize-breakup">
          <div className="header_ef456">
            <span>Rank</span>
            <span>Prize</span>
          </div>
          {prize_breakup.map((datas, idy) => (
          <div className="rankContainer_a598a">
            <div>
              <span className="rankBullet_bba8f"># </span>
              <span className="rankText_6681c">{datas.rank}</span>
            </div>
            <div className="rankText_6681c">₹{datas.peruser}</div>
          </div>
          ))}
          <div className="clearfix">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
        </div>
        <div className="mainContainer_1841f mg-158" id="leaderboard">
            {/* <div className="leaderboard_3a041">
              <div className="compareTeamsCheckbox_50013">
                <div className="check-box">
                  <div className="check-box--selected">
                    <i className="material-icons">check_box</i>
                  </div>
                </div>
              <div>Compare Teams</div>
              </div><div>
            <div className="teamsDownloadMessage_73616">You can view all the teams in this</div>
            <div className="teamsDownloadMessage_73616">contest after the deadline!</div></div>
            <div className="js--pdf-download-btn"><i className="material-icons">get_app</i></div>
            </div>
             */}
            <div className="leaderboardRankingHeader_761ed">
              <div className="playerInfo_25904">ALL TEAMS (74000)</div>
              <div className="pointInfo_22baf">POINTS</div>
              <div className="rankInfoContainer_413a1">RANK</div>
            </div>
            <div className="leaderboardPlayers_e1534">
              <div className="playerInfo_25904">
              <img src="https://s3.amazonaws.com/pwaimages/public/imgs/pwa_default_user_avatar.png" className="playerImage_e2796"/>
              <div className="playerUserName_1ac16">BMNAK4QR</div>
              <div>(T6)</div>
              </div>
              <div className="pointInfo_22baf">135.5</div>
              <div className="rankInfoContainer_413a1">#1</div>
            </div>
            <div className="leaderboardPlayers_e1534">
              <div className="playerInfo_25904">
              <img src="https://s3.amazonaws.com/pwaimages/public/imgs/pwa_default_user_avatar.png" className="playerImage_e2796"/>
              <div className="playerUserName_1ac16">BMNAK4QR</div>
              <div>(T6)</div>
              </div>
              <div className="pointInfo_22baf">135.5</div>
              <div className="rankInfoContainer_413a1">#1</div>
            </div>
            <div className="leaderboardPlayers_e1534">
              <div className="playerInfo_25904">
              <img src="https://s3.amazonaws.com/pwaimages/public/imgs/pwa_default_user_avatar.png" className="playerImage_e2796"/>
              <div className="playerUserName_1ac16">BMNAK4QR</div>
              <div>(T6)</div>
              </div>
              <div className="pointInfo_22baf">135.5</div>
              <div className="rankInfoContainer_413a1">#1</div>
            </div>
            <div className="leaderboardPlayers_e1534">
              <div className="playerInfo_25904">
              <img src="https://s3.amazonaws.com/pwaimages/public/imgs/pwa_default_user_avatar.png" className="playerImage_e2796"/>
              <div className="playerUserName_1ac16">BMNAK4QR</div>
              <div>(T6)</div>
              </div>
              <div className="pointInfo_22baf">135.5</div>
              <div className="rankInfoContainer_413a1">#1</div>
            </div>
            <div className="leaderboardPlayers_e1534">
              <div className="playerInfo_25904">
              <img src="https://s3.amazonaws.com/pwaimages/public/imgs/pwa_default_user_avatar.png" className="playerImage_e2796"/>
              <div className="playerUserName_1ac16">BMNAK4QR</div>
              <div>(T6)</div>
              </div>
              <div className="pointInfo_22baf">135.5</div>
              <div className="rankInfoContainer_413a1">#1</div>
            </div>
            <div className="leaderboardPlayers_e1534">
              <div className="playerInfo_25904">
              <img src="https://s3.amazonaws.com/pwaimages/public/imgs/pwa_default_user_avatar.png" className="playerImage_e2796"/>
              <div className="playerUserName_1ac16">BMNAK4QR</div>
              <div>(T6)</div>
              </div>
              <div className="pointInfo_22baf">135.5</div>
              <div className="rankInfoContainer_413a1">#1</div>
            </div>
            <div className="leaderboardPlayers_e1534">
              <div className="playerInfo_25904">
              <img src="https://s3.amazonaws.com/pwaimages/public/imgs/pwa_default_user_avatar.png" className="playerImage_e2796"/>
              <div className="playerUserName_1ac16">BMNAK4QR</div>
              <div>(T6)</div>
              </div>
              <div className="pointInfo_22baf">135.5</div>
              <div className="rankInfoContainer_413a1">#1</div>
            </div>
            <div className="leaderboardPlayers_e1534">
              <div className="playerInfo_25904">
              <img src="https://s3.amazonaws.com/pwaimages/public/imgs/pwa_default_user_avatar.png" className="playerImage_e2796"/>
              <div className="playerUserName_1ac16">BMNAK4QR</div>
              <div>(T6)</div>
              </div>
              <div className="pointInfo_22baf">135.5</div>
              <div className="rankInfoContainer_413a1">#1</div>
            </div>
            <div className="leaderboardPlayers_e1534">
              <div className="playerInfo_25904">
              <img src="https://s3.amazonaws.com/pwaimages/public/imgs/pwa_default_user_avatar.png" className="playerImage_e2796"/>
              <div className="playerUserName_1ac16">BMNAK4QR</div>
              <div>(T6)</div>
              </div>
              <div className="pointInfo_22baf">135.5</div>
              <div className="rankInfoContainer_413a1">#1</div>
            </div>
            <div className="leaderboardPlayers_e1534">
              <div className="playerInfo_25904">
              <img src="https://s3.amazonaws.com/pwaimages/public/imgs/pwa_default_user_avatar.png" className="playerImage_e2796"/>
              <div className="playerUserName_1ac16">BMNAK4QR</div>
              <div>(T6)</div>
              </div>
              <div className="pointInfo_22baf">135.5</div>
              <div className="rankInfoContainer_413a1">#1</div>
            </div>
            
          </div>
        
          </div>
          
          <div class="modal fade" id="myModalcontest" role="dialog">
          <div class="modal-dialog">

            <div class="modal-content p-14">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title title">CONTEST INVITE CODE</h4>
              
              </div>
              <div class="modal-body">
                <h4>{data ? data.code : ""}</h4>
                <p style={{fontSize:"12px"}}>Copy and share the contest code with your friends on whatsApp, Facebook, email or SMS</p>
              </div>
            
            </div>

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
        </div>
        <div className="modal fade" id="myModal1" role="dialog">
            <div className="modal-dialog">

              <div className="modal-content p-14">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title title">ADD CASH</h4>
                  <span className="flex">
                    <div className="balance">Currently Balance</div>
                    <div className="balance-1"><i className="fa fa-inr" aria-hidden="true"></i>
                      82
                    </div>
                  </span>
                </div>
                <div className="modal-body">
                  <p>Add Cash to your account</p>
                  <p className="p-16">Amount To Add</p>
                <input type="number" className="add-cash-input" />
              </div>
              <div className="modal-footer flex">
                <button className="add-cash">ADD CASH</button>
              </div>
            </div>

          </div>
          </div>
          <div className="modal fade" id="myModal2" role="dialog">
          <div className="modal-dialog">
            {is_created_team < 1 ?
              <div className="modal-content border-0 p-14">

                <div className="modal-body">

                  <p className="ps-2 text-center">Firstly create your Team then join contest</p>
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
export default ContestDetailCard;
