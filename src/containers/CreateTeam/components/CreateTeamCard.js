
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { playerStatesAPI, getPlayersAPI, PayerSelectionAPI, selectedPlayerAPI, isLoggedIn } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';
import Cookies from 'universal-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';

class CreateTeamCard extends Component {
  state = {
    errorMsg: '',
    successMsg: '',
    teama_logo: "",
    teamb_logo: "",
    teama_name: "",
    teamb_name: "",
    teama_count: 0,
    teamb_count: 0,
    time_left: "",
    playersinfo: [],
    playersData: [],
    playerIds: [],
    wkPlayers: [],
    batPlayers: [],
    bowlPlayers: [],
    allPlayers: [],
    allPlayersData: [],
    playerPoints: [],
    playerStates: [],
    cId: null,
    matchId: null,
    roleType: '',
    playerCount: 0,
    totalCredits: 100,
    NotifyHeading: "Pick 1-4 Wicket-Keepers",
    wkRoleCount: 0,
    bowlRoleCount: 0,
    AllRoleCount: 0,
    BatRoleCount: 0,
    flag: "",
    is_continue: false,
    loading: false,
    rules: [],
  }

  componentWillMount() {
    const { cid, matchid, type, team } = this.props.queryString;
    let roleType = ""
    this.getPlayers(cid, matchid, type);
    this.getAllTypePlayers(cid, matchid, roleType);
    this.selectedPlayer(cid, matchid, type, team);
  }
  // On page load get players detail
  getPlayers = (cid, matchid, type) => {
    getPlayersAPI(cid, matchid, type, (response) => {
      console.log("On page load get players detail", response)
      if (response.response.data.status == true) {
        this.setState({
          playersData: response.response.data.profile_data,
          teama_logo: response.response.data.teama,
          teamb_logo: response.response.data.teamb,
          teama_name: response.response.data.teama_name,
          teamb_name: response.response.data.teamb_name,
          time_left: response.response.data.time_left,
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load Players Data" });
      }
    });
  }

  getAllTypePlayers = (cid, matchid, type) => {
    getPlayersAPI(cid, matchid, type, (response) => {
      console.log("get All Type Players", response)
      if (response.response.data.status == true) {
        let notConfig = "Pick " + response.response.data.wktmin + " - " + response.response.data.wktmax + " Wicket-Keepers"

        this.setState({
          allPlayersData: response.response.data.profile_data,
          rules: response.response.data,
          NotifyHeading: notConfig,
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load Players Data" });
      }
    });
  }

  selectedPlayer(cid, matchid, type, team) {
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
    selectedPlayerAPI({ cookie_id: myCookie, cid: cid, match_id: matchid, player_role: type, team_count: team, }, (response) => {
      console.log("Selected Players", response)
      if (response.response.data.success == true) {
        let teama = 0
        let teamb = 0
        if (response.response.data.countrycount.length > 0 && response.response.data.countrycount["0"].country == this.state.teama_name) {
          teama = response.response.data.countrycount["0"].player_count
        }
        if (response.response.data.countrycount.length > 0 && response.response.data.countrycount["0"].country == this.state.teamb_name) {
          teamb = response.response.data.countrycount["0"].player_count
        }

        if (response.response.data.countrycount.length > 1 && response.response.data.countrycount["1"].country == this.state.teama_name) {
          teama = response.response.data.countrycount["1"].player_count
        }
        if (response.response.data.countrycount.length > 1 && response.response.data.countrycount["1"].country == this.state.teamb_name) {
          teamb = response.response.data.countrycount["1"].player_count
        }
        this.setState({
          playerIds: response.response.data.player,
          flag: response.response.data.flag,
          playerCount: response.response.data.totalplayer,
          AllRoleCount: response.response.data.allc,
          BatRoleCount: response.response.data.batc,
          bowlRoleCount: response.response.data.bowc,
          wkRoleCount: response.response.data.wkc,
          totalCredits: response.response.data.totalcredit,
          wkPlayers: response.response.data.wkplayer,
          batPlayers: response.response.data.batplayer,
          bowlPlayers: response.response.data.bowlplayer,
          allPlayers: response.response.data.allplayer,
          teama_count: teama,
          teamb_count: teamb,
          is_continue: response.response.data.is_continue,
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load Players Data", loading: false });
      }
    });
  }

  // user Select Type of players 
  handleRoleType(value) {
    const { cid, matchid } = this.props.queryString;
    this.getPlayers(cid, matchid, value);
    this.getNotifyPlayer(value);
  }

  // Selection Types of players notifications
  getNotifyPlayer = (type) => {
    console.log("notifyyyyyyyyyyyyyyyyyyyy", this.state.rules)
    const { rules } = this.state;
    let notConfig = ""
    if (type == "wk") {
      notConfig = "Pick " + rules.wktmin + " - " + rules.wktmax + " Wicket-Keepers"
    }
    if (type == "bat") {
      notConfig = "Pick " + rules.batmi + " - " + rules.batma + " Batsmen"
    }
    if (type == "bowl") {
      notConfig = "Pick " + rules.bowlmi + " - " + rules.bowlma + " Bowlers"
    }
    if (type == "all") {
      notConfig = "Pick " + rules.allsmi + " - " + rules.allsma + " All-Rounders"

    }
    this.setState({ NotifyHeading: notConfig })

  }


  selectPlayer = (pid, country, credit, totalCredits, playing_role, short_name, flag) => {
    const { cid, matchid, type, team } = this.props.queryString;
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
    this.setState({ loading: true })

    PayerSelectionAPI({
      cookie_id: myCookie, match_id: matchid, cid: cid, player_name: short_name, pid: pid,
      player_role: playing_role, credit: credit, totalcredit: totalCredits, flag: flag, country: country, team_count: team
    }, (response) => {

      console.log("when Player Select", response)
      console.log("when Player Select then totalcredit is", response.response.data.totalcredit)

      if (response.response.data.success == true) {
        let teama = 0
        let teamb = 0
        if (response.response.data.countrycount.length > 0 && response.response.data.countrycount["0"].country == this.state.teama_name) {
          teama = response.response.data.countrycount["0"].player_count
        }
        if (response.response.data.countrycount.length > 0 && response.response.data.countrycount["0"].country == this.state.teamb_name) {
          teamb = response.response.data.countrycount["0"].player_count
        }
        if (response.response.data.countrycount.length > 1 && response.response.data.countrycount["1"].country == this.state.teama_name) {
          teama = response.response.data.countrycount["1"].player_count
        }
        if (response.response.data.countrycount.length > 1 && response.response.data.countrycount["1"].country == this.state.teamb_name) {
          teamb = response.response.data.countrycount["1"].player_count
        }

        this.setState({
          playerIds: response.response.data.player,
          flag: response.response.data.flag,
          playerCount: response.response.data.totalplayer,
          AllRoleCount: response.response.data.allc,
          BatRoleCount: response.response.data.batc,
          bowlRoleCount: response.response.data.bowc,
          wkRoleCount: response.response.data.wkc,
          totalCredits: response.response.data.totalcredit,
          wkPlayers: response.response.data.wkplayer,
          batPlayers: response.response.data.batplayer,
          bowlPlayers: response.response.data.bowlplayer,
          allPlayers: response.response.data.allplayer,
          teama_count: teama,
          teamb_count: teamb,
          is_continue: response.response.data.is_continue,
        }, () => this.setState({ loading: false }));
      }
      else {
        this.setState({ loading: false })
        alert(response.response.data.message);
      }
    });
  }
  openNav(pid) {
    const { cid, matchid } = this.props.queryString;
    document.getElementById("myNav").style.height = "60%";
    document.getElementById("cont").style.display = "none";
    playerStatesAPI({ match_id: matchid, cid: cid, pid: pid }, (response) => {
      console.log("Player State API", response)
      if (response.response.data.success == true) {
        this.setState({
          playerStates: response.response.data,
          playerPoints: response.response.data.points,
        });
      }
    })
  }

  closeNav() {
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("cont").style.display = "block";
  }
  teamPreview() {
    document.getElementById("myDIV").className = "bg-background block";
    document.getElementById("myteam").className = "team-header none";

  }

  teamPreviewClose() {
    document.getElementById("myDIV").className = "bg-background none ";
    document.getElementById("myteam").className = "team-header block ";

  }
  render() {
    const { playerStates, playerPoints, playersData, allPlayersData, playerCount, NotifyHeading, teama_logo, teamb_logo, playerIds, wkRoleCount, bowlRoleCount, AllRoleCount, BatRoleCount, totalCredits, flag, wkPlayers, batPlayers, bowlPlayers, allPlayers, rules } = this.state;
    console.log("statettttttttttt", totalCredits, this.state.loading)
    const playerdata = []
    const wkplayerData = []
    const batplayerData = []
    const bowlplayerData = []
    const allplayerData = []
    for (let index = 0; index < playersData.length; index++) {
      const { pid, short_name, credit, thumb_url, country, playing_role, points } = playersData[index];
      playerdata.push(
        playerIds.includes(pid) ?
          <div className="player-box-1" key={pid} >
            
            <div className="row row-r-l">
              <div className="col-md-2 col-xs-2 pd-r-0 pd-l-0 flex" onClick={(e) => this.openNav(pid)}>
                {thumb_url ?
                  <img src={thumb_url} className="players" />
                  :
                  <img src={require("../../../img/teams/default-player-image.png")} className="players" />
                }

              </div>
              <div onClick={(e) => this.selectPlayer(pid, country, credit, totalCredits, playing_role, short_name, "0")}>
                <div className="col-md-4 col-xs-4 pd-r-0 pd-l-0">

                  <div className="cdn">
                    <div className="player-name">{short_name}</div>
                    <span className="short-p"><b>{country}</b> - {playing_role}</span>
                  </div>
                </div>
                <div className="col-md-2 col-xs-2 pd-r-0 pd-l-0">
                  <span className="player-cell ">{points}</span>
                </div>
                <div className="col-md-2 col-xs-2 pd-r-0 pd-l-0">
                  <span className="player-cell">{credit}</span>
                </div>
                <div className="col-md-2 col-xs-2 pd-r-0 pd-l-0" >
                  <div className="minus-btn">_</div>
                </div>
              </div>
            </div>
          </div>

          :
          <div className="player-box" key={pid}  >
            <div className="row row-r-l">
              <div className="col-md-2 col-xs-2 pd-r-0 pd-l-0 flex" onClick={(e) => this.openNav(pid)} >
                {thumb_url ?
                  <img src={thumb_url} className="players" />
                  :
                  <img src={require("../../../img/teams/default-player-image.png")} className="players" />
                }
              </div>
              <div onClick={(e) => this.selectPlayer(pid, country, credit, totalCredits, playing_role, short_name, "1")}>

                <div className="col-md-4 col-xs-4 pd-r-0 pd-l-0">
                  <div className="cdn">
                    <div className="player-name"> {short_name}</div>
                    <span className="short-p"><b>{country}</b> - {playing_role}</span>
                  </div>
                </div>

                <div className="col-md-2 col-xs-2 pd-r-0 pd-l-0">
                  <span className="player-cell ">{points}</span>
                </div>
                <div className="col-md-2 col-xs-2 pd-r-0 pd-l-0">
                  <span className="player-cell">{credit}</span>
                </div>

                <div className="col-md-2 col-xs-2 pd-r-0 pd-l-0">
                  <div className="add-btn" >+</div>
                </div>
              </div>
            </div>
          </div>

      )

    }
    for (let index = 0; index < allPlayersData.length; index++) {
      const { pid, short_name, credit, country, thumb_url } = allPlayersData[index];

      wkplayerData.push(
        wkPlayers.includes(pid) ?
          <div className="players-cards-1">
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
          <div className="players-cards-1">
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
          <div className="players-cards-1">
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
          <div className="players-cards-1">
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
      <div>

        <header className="team-header" id="myteam">
       
          <div className="logo-box">
          <marquee className="alert-red">
              This is a Beta Version of Rising11
            </marquee>
            <div className="row">
              <div className="col-md-4 col-xs-3">
                <i className='fa fa-angle-left ch wg-6 p-14' onClick={() => history.go(-1)}></i>
              </div>
              <div className="col-md-4 col-xs-6">
                <h5 className="heading">{this.state.time_left}  Left</h5>
              </div>
            </div>
          </div>
          {isLoggedIn() ?
            ""
            :
            <img src={require("../../../img/2-steps.png")} style={{ padding: "10px", background: "#FFFFFF", width: "100%" }} className="img-responsive" />
          }
          <div className="box-grey">
            <h4 className="h4-1s">Max 7 players from a team</h4>
            <div className="row">
              <div className="col-md-3 col-xs-3">
                <div className="playerSelectionContainer_bdd92 css-3">
                  <div style={{ textTransform: "uppercase", color: "#cacaca", fontWeight: "bold" }}>Players</div>
                  <div className="flexContainer_029e0">
                    <div className="selectedCount_e68c1">{playerCount}</div>
                    <div className="totalCount_5e151">/11</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xs-6">
                <ul className="flex-1">
                  <li className="css-1">
                    <div className="img-score">
                      <img src={teama_logo} className="flag-box-1" />
                    </div>
                  </li>
                  <li className="css-1" style={{ marginTop: "5px" }}>
                    <div style={{ textTransform: "uppercase", color: "#cacaca", fontWeight: "bold" }}>
                      {this.state.teama_name}
                    </div>
                    <div style={{ textTransform: "uppercase", color: "white", fontWeight: "bold", fontSize: "14px" }}>
                      {this.state.teama_count}
                    </div>

                  </li>
                  <li className="css-1" style={{ marginTop: "5px" }}>
                    <div style={{ textTransform: "uppercase", color: "#cacaca", fontWeight: "bold" }}>
                      {this.state.teamb_name}
                    </div>
                    <div style={{ textTransform: "uppercase", color: "white", fontWeight: "bold", fontSize: "14px" }}>
                      {this.state.teamb_count}
                    </div>
                  </li>
                  <li className="css-1">
                    <div className="img-score">
                      <img src={teamb_logo} className="flag-box-1" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-xs-3">
                <div className="playerSelectionContainer_bdd92 css-4">
                  <div className="css-2" style={{ textTransform: "uppercase", color: "#cacaca", fontWeight: "bold" }}>Credits</div>
                  <div className="selectedCount_e68c1 css-2">{totalCredits}</div>
                </div>
              </div>
            </div>
            <div className="progressContainer_00657">
              <div className="stepperContainer_b9ae4">
                <div className={playerCount >= 1 ? "stepperBlock_8b62f inactiveStepper_4d390 bg-green" : "stepperBlock_8b62f inactiveStepper_4d390"}>
                  <span style={playerCount == 1 ? { display: "block", color: "white" } : { display: "none" }}>1</span>
                </div>
                <div className={playerCount >= 2 ? "stepperBlock_8b62f inactiveStepper_4d390 bg-green" : "stepperBlock_8b62f inactiveStepper_4d390"}>
                  <span style={playerCount == 2 ? { display: "block", color: "white" } : { display: "none" }}>2</span>
                </div>
                <div className={playerCount >= 3 ? "stepperBlock_8b62f inactiveStepper_4d390 bg-green" : "stepperBlock_8b62f inactiveStepper_4d390"}>
                  <span style={playerCount == 3 ? { display: "block", color: "white" } : { display: "none" }}>3</span>
                </div>
                <div className={playerCount >= 4 ? "stepperBlock_8b62f inactiveStepper_4d390 bg-green" : "stepperBlock_8b62f inactiveStepper_4d390"}>
                  <span style={playerCount == 4 ? { display: "block", color: "white" } : { display: "none" }}>4</span>
                </div>
                <div className={playerCount >= 5 ? "stepperBlock_8b62f inactiveStepper_4d390 bg-green" : "stepperBlock_8b62f inactiveStepper_4d390"}>
                  <span style={playerCount == 5 ? { display: "block", color: "white" } : { display: "none" }}>5</span>
                </div>
                <div className={playerCount >= 6 ? "stepperBlock_8b62f inactiveStepper_4d390 bg-green" : "stepperBlock_8b62f inactiveStepper_4d390"}>
                  <span style={playerCount == 6 ? { display: "block", color: "white" } : { display: "none" }}>6</span>
                </div>
                <div className={playerCount >= 7 ? "stepperBlock_8b62f inactiveStepper_4d390 bg-green" : "stepperBlock_8b62f inactiveStepper_4d390"}>
                  <span style={playerCount == 7 ? { display: "block", color: "white" } : { display: "none" }}>7</span>
                </div>
                <div className={playerCount >= 8 ? "stepperBlock_8b62f inactiveStepper_4d390 bg-green" : "stepperBlock_8b62f inactiveStepper_4d390"}>
                  <span style={playerCount == 8 ? { display: "block", color: "white" } : { display: "none" }}>8</span>
                </div>
                <div className={playerCount >= 9 ? "stepperBlock_8b62f inactiveStepper_4d390 bg-green" : "stepperBlock_8b62f inactiveStepper_4d390"}>
                  <span style={playerCount == 9 ? { display: "block", color: "white" } : { display: "none" }}>9</span>
                </div>
                <div className={playerCount >= 10 ? "stepperBlock_8b62f inactiveStepper_4d390 bg-green" : "stepperBlock_8b62f inactiveStepper_4d390"}>
                  <span style={playerCount == 10 ? { display: "block", color: "white" } : { display: "none" }}>10</span>
                </div>
                <div className={playerCount == 11 ? "stepperBlock_8b62f inactiveStepper_4d390 bg-green" : "stepperBlock_8b62f inactiveStepper_4d390"}>
                  <span style={playerCount == 11 ? { color: "white" } : { color: "black" }}>11</span>
                </div>
              </div>
            </div>
          </div>
          <div className="sorts">
            <span style={{ marginTop: "7px", margin: "0 auto", display: "flex" }}>
              <a href="#" className="createteam-mini-nav" onClick={(e) => { this.handleRoleType("wk") }}>WK ({wkRoleCount})</a>
              <a href="#" className="createteam-mini-nav" onClick={(e) => { this.handleRoleType("bat") }}>BAT ({BatRoleCount})</a>
              <a href="#" className="createteam-mini-nav" onClick={(e) => { this.handleRoleType("all") }}>AR ({AllRoleCount})</a>
              <a href="#" className="createteam-mini-nav" onClick={(e) => { this.handleRoleType("bowl") }}>BOWL ({bowlRoleCount})</a>
            </span>
          </div>
          <div className="createTeamTabsHelpContainer_ce9c9 newHelpText_573ca"><div className="newLabelContainer_44b8a">
            <div className="newLabelText_5ab80">New!</div>
            <div className="newLabelTagStyle_01db0"></div>
          </div>
            <div className="notify-head">{NotifyHeading}</div>
            <button className="new-button whiteIconButton_6998a gh-1px " data-toggle="modal" data-target="#myModal">
              <i style={{ height: "24px", width: "24px", fontSize: "24px", color: "#91fd1e" }} className="fa fa-info-circle" ></i>
            </button>
          </div>
          <div className="bg-white ctSortingHeader_a6515">
            <div className="player-list-header sortactive">
              PLAYERS <i className="fa fa-sort" />
            </div>
            <div className="points-list-header">
              POINTS <i className="fa fa-sort" />
            </div>
            <div className="credits-list-header">
              CREDITS <i className="fa fa-sort" />
            </div>
          </div>


          <div className="team hg-57" >
            {this.state.loading ?
              <CircularProgress style={{ margin: "60px auto", display: "block" }} />
              :
              playerdata
            }
            <div className="clearfix"><br /><br /><br /><br /><br /><br /> </div>
          </div>
          <div className="footer_30a67" id="cont">
            <div className="footerButtonContainer_b9ae4">
              <button className="new-button team-preview" onClick={this.teamPreview}>Team Preview</button>
              {this.state.is_continue ?
                <Link to={"/createteamleader/" + this.props.queryString.matchid + "/" + this.props.queryString.cid + "/" + this.props.queryString.team} key={this.props.queryString.cid}>
                  <button className="new-button raisedGreenButton_20c05" disabled={false}>CONTINUE</button>
                </Link>
                :

                <button className="new-button raisedGreenButton_20c05 disabledButton_cf79e raisedGreenButtonDisabled_e0a23" disabled={true}>CONTINUE</button>

              }

            </div>
          </div>
          {/* <div className="player-box-1">
           <div className="row">
             <div className="col-md-4 col-xs-4">
               <img src={require("../../../img/teams/player-1.png")} className="players" />
               <span className="player-name"> &nbsp; asdsa1</span>
             </div>
             <div className="col-md-2 col-xs-2">
               <span className="player-cell">Credits &nbsp; 9.5</span>
             </div>
             <div className="col-md-2 col-xs-2">
               <span className="player-cell">Points &nbsp; 4</span>
             </div>
             <div className="col-md-4 col-xs-4">
               <Link to="/joincontest">
                 <div className="minus-btn">_</div>
               </Link>
             </div>
           </div>
         </div> */}
          <div className="modal modal-info-customize" id="myModal" role="dialog">
            <div className="modal-dialog modal-info-dialog">
              <div className="modal-content modal-info-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title black">RULES </h4>
                </div>
                <div className="modal-body">
                  <p className="p-fade">Now you can select upto {rules.wktmax} wicket-Keepers, {rules.batma} Batsmen,{rules.allsma} all-rounders & {rules.bowlma} bowlers.</p>
                  <div className="flex">
                    <div className="cat-g"></div>
                    <div className="cat-g">WK</div>
                    <div className="cat-g">BAT</div>
                    <div className="cat-g">AR</div>
                    <div className="cat-g">BOWL</div>
                  </div>
                  <div className="flex">
                    <div className="cat-g">Min</div>
                    <div className="cat-g">{rules.wktmin}</div>
                    <div className="cat-g">{rules.batmi}</div>
                    <div className="cat-g">{rules.allsmi}</div>
                    <div className="cat-g">{rules.bowlmi}</div>
                  </div>
                  <div className="flex aliceblue">
                    <div className="cat-g">Max</div>
                    <div className="cat-g">{rules.wktmax}</div>
                    <div className="cat-g">{rules.batma}</div>
                    <div className="cat-g">{rules.allsma}</div>
                    <div className="cat-g">{rules.bowlma}</div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn got-it" data-dismiss="modal">GOT IT</button>
                </div>
              </div>

            </div>
          </div>
          <div id="myNav" className="overlays">
            <div className="overlay-contents">
              <div className="player-profile-toolBar">
                <div className="btn--icon" onClick={this.closeNav}>
                  <i class="material-icons">keyboard_arrow_down</i>
                </div>
                {playerStates.playername}
              </div>
              <div className="player-profile-info player-profile-info--footer">
                <div className="player-profile-row--border player-profile-row flex">
                  <div className="player-profile-cell">
                    <div>
                      {playerStates.thumb_url ?
                        <img src={thumb_url} className="players" />
                        :
                        <img src={require("../../../img/teams/default-player-image.png")} className="players" />
                      }
                    </div>
                  </div>
                  <div className="player-profile-cell">
                    <div>
                      <div className="light text-upper player-profile-info__header">Credits</div>
                      <div className="player-profile-info__header-data">{playerStates.credit}</div>
                    </div>
                  </div>
                  <div className="player-profile-cell">
                    <div>
                      <div className="light text-upper player-profile-info__header">Total Points</div>
                      <div className="player-profile-info__header-data">{playerStates.totalpoints}</div>
                    </div>
                  </div>
                </div>
                <div className="player-profile-row--border player-profile-row flex">
                  <div className="player-profile-cell">
                    <div>
                      <div className="light text-upper player-profile-info__header">Team</div>
                      {playerStates.teamname}</div>
                  </div>
                  <div className="player-profile-cell">
                    <div>
                      <div className="light text-upper player-profile-info__header">Role</div>
                      {playerStates.player_roll}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="player-profile-stats-title bold">Match wise Fantasy Stats</div>
                  <div className="player-profile-stats-header text-upper player-profile-row flex">
                    <div className="player-profile-cell">
                      <div>Match</div>
                    </div>
                    <div className="player-profile-cell">
                      <div>Points</div>
                    </div>
                    <div className="player-profile-cell">
                      <div>Selected By</div>
                    </div>
                  </div>
                  <div>
                    {playerPoints.map((data, idx) => (
                      <div className="player-profile-row--border player-profile-row flex">
                        <div className="player-profile-cell"><div>
                          <div>{data.title}</div>
                          <div className="player-profile-row__time light">{data.starttime}</div>
                        </div>
                        </div>
                        <div className="player-profile-cell">
                          <div>{data.points}</div>
                        </div>
                        <div className="player-profile-cell">
                          <div>64.85%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="create-team__player-profile__footer">
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


      </div >
    );
  }
}

export default CreateTeamCard;
