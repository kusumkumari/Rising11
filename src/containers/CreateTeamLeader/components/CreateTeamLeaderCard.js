
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { getPlayersAPI, selectedPlayerAPI,selectCaptiansAPI, retriveCaptiansAPI, savePlayerDataAPI, playerStatesAPI, isLoggedIn } from '../../App/ApiIntegration'

import {
  Link
} from 'react-router-dom';
import Cookies from 'universal-cookie';

class CreateTeamLeaderCard extends Component {
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
      is_captain:false,
      is_vicecaptain:false,
      selectedCaptain:"",
      selectVC:"",
      isSave:false,
      playerStates:[],
      playerPoints:[],
      time_left:"",
      captain_point:"",
      viceC_point:"",
    }
  }
  openNav(pid) {
    const { cid, matchid } =this.props.queryString;
    document.getElementById("myNav").style.height = "60%";
    document.getElementById("cont").style.display = "none";
    playerStatesAPI({match_id: matchid, cid: cid, pid: pid }, (response) => {
      console.log("hhhhhh22222222222",response)
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
  componentWillMount() {
    const { cid, matchid, team } = this.props.queryString;
    let roleType = ""
    let types = "wk"
    this.getAllTypePlayers(cid, matchid, roleType);
    this.selectedPlayer(cid, matchid, types, team);
    this.retriveCaptians(cid, matchid, team);
  }
  retriveCaptians(cid, matchid, team){
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
    retriveCaptiansAPI({ cookie_id: myCookie, cid: cid, match_id: matchid, team_count:team }, (response) => {
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
  getAllTypePlayers = (cid, matchid, type) => {
    getPlayersAPI(cid, matchid, type, (response) => {
      console.log("000000000000000", response.response.data)
      if (response.response.data.status == true) {
        this.setState({
          allPlayersData: response.response.data.profile_data,
          teama_name: response.response.data.teama_name,
          teamb_name: response.response.data.teamb_name,
          time_left: response.response.data.time_left,
          captain_point: response.response.data.captain_point,
          viceC_point: response.response.data.vicecaptain_point,
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
    selectedPlayerAPI({ cookie_id: myCookie, cid: cid, match_id: matchid, player_role: type, team_count:team }, (response) => {
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
  selectCaptians(pid,is_captain,is_vicecaptain,team){
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
    const { cid, matchid } = this.props.queryString;
    selectCaptiansAPI({ cookie_id: myCookie, cid: cid, match_id: matchid, pid: pid,is_captain:is_captain,is_vicecaptain:is_vicecaptain, team_count:team }, (response) => {
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

  savePlayerData=()=>{
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
    const {matchid, cid,team} = this.props.queryString;
    savePlayerDataAPI({ cookie_id: myCookie,cid:cid, match_id: matchid, email: "",mobile:"",team_count:team }, (response) => {
      console.log("9999999999", response)
      if (response.response.data.status == true) {
        window.location="/contest/" +matchid + "/" +cid

      }
      else {
        this.setState({ errorMsg: "Unable to load Players Data" });
      }
    });
  }


  render() {
    console.log("nnnnnnnnnnnnnnnn",this.state.selectedCaptain,typeof(this.state.selectedCaptain))
    const { cid, matchid, team } = this.props.queryString;
    const { allPlayersData, wkPlayers, batPlayers, bowlPlayers, allPlayers, playerIds, playerStates, playerPoints } = this.state;

    const playerdata = []
    const wkplayerData = []
    const batplayerData = []
    const bowlplayerData = []
    const allplayerData = []

    for (let index = 0; index < allPlayersData.length; index++) {
      const { pid, short_name, credit, country, thumb_url, playing_role, points } = allPlayersData[index];
      playerdata.push(
        playerIds.includes(pid) ?
          <div className="player-box" key={pid+"1"} >
            <div className="row">
              <div className="col-md-2 col-xs-2 pd-r-0 pd-l-0 flex" onClick={()=>this.openNav(pid)} >
                {thumb_url ?
                  <img src={thumb_url} className="players" />
                  :
                  <img src={require("../../../img/teams/default-player-image.png")} className="players" />
                }
              </div>
              <div>
                <div className="col-md-4 col-xs-4 pd-r-0 pd-l-0">
                  <div className="cdn">
                    <div className="player-name"> {short_name}</div>
                    <p className="short-p"><b>{country}</b> - {playing_role}</p>
                  </div>
                </div>
         
             
              <div className="col-md-2 col-xs-2 pd-r-0 pd-l-0">
                <span className="player-cell">{points}pts</span>
              </div>

              <div className="col-md-4 col-xs-4 flex captain-arrangement pd-r-0 pd-l-0" >
                <a href="#" className={ pid == this.state.selectedCaptain ? "role-btn role-btn-active" : "role-btn"} onClick={()=>this.selectCaptians(pid,1,0, team)}>C</a>
                <a href="#" className={ pid == this.state.selectVC ? "role-btn role-btn-active" : "role-btn"} onClick={()=>this.selectCaptians(pid,0,1,team)}>VC</a>
              </div>

              </div>
            </div>
          </div>
          : ""
      )
      wkplayerData.push(
        wkPlayers.includes(pid) ?
          <div className="players-cards-1" key={pid+"2"}>
             { pid == this.state.selectedCaptain ?
            <div className="role-btn-player">
              C
            </div>
            : ""}
              { pid == this.state.selectVC ?
            <div className="role-btn-player">
              VC
            </div>
            : ""}
            {thumb_url ?
                  <img src={thumb_url} className="players-pic"  />
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
          <div className="players-cards-1" key={pid+"3"}>
          { pid==this.state.selectedCaptain ?
            <div className="role-btn-player">
              C 
            </div>
            : ""}
              { pid==this.state.selectVC ?
            <div className="role-btn-player">
              VC
            </div>
            : ""}
           {thumb_url ?
                  <img src={thumb_url} className="players-pic"  />
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
          <div className="players-cards-1" key={pid+"4"}>
              { pid == this.state.selectedCaptain ?
            <div className="role-btn-player">
              C
            </div>
            : ""}
              { pid == this.state.selectVC ?
            <div className="role-btn-player">
              VC
            </div>
            : ""}
            {thumb_url ?
                  <img src={thumb_url} className="players-pic"  />
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
          <div className="players-cards-1" key={pid+"5"}>
              { pid == this.state.selectedCaptain ?
            <div className="role-btn-player">
              C
            </div>
            : ""}
              { pid == this.state.selectVC ?
            <div className="role-btn-player">
              VC
            </div>
            : ""}
           {thumb_url ?
                  <img src={thumb_url} className="players-pic"  />
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
          <div className="logo-box">
            <div className="row">
              <div className="col-md-3 col-xs-3">
                <i className='fa fa-angle-left ch wg-6 p-14' onClick={()=>history.go(-1)}></i>
              </div>
              <div className="col-md-6 col-xs-6">
                <h5 className="heading">{this.state.time_left}</h5>
              </div>
            </div>
          </div>
          {isLoggedIn() ?
            ""
            :
            <img src={require("../../../img/2-steps.png")} style={{ padding: "10px", background: "#FFFFFF", width: "100%" }} className="img-responsive" />
          }
          <div className="titleBox_583d4">
            <div className="bold subtitleContainer_header">
              Choose your Captain & Vice Captain
            </div>
            <div className="subtitleContainer_b9ae4">
              <div className="roleSubtitle_62c2d">
                <div className="roleIcon_f75d0">C</div>
                <div className="roleMultiplierText_07275"> gets {this.state.captain_point}X Points</div>
              </div>
              <div className="roleSubtitle_62c2d">
                <div className="roleIcon_f75d0">VC</div>
                <div className="roleMultiplierText_07275"> gets {this.state.viceC_point}X Points</div>
              </div>
            </div>
          </div>
          <div className="sortingHeader_00815">
            <div className="Sort-by">
              Sort By :
            </div>
            <div className="player-types">
              Player Types <i className="fa fa-sort" />
            </div>
            <div className="player-types">
              Points <i className="fa fa-sort" />
            </div>
          </div>
          <div className="team hg-70" >
            {playerdata}
            <div className="clearfix"><br /><br /><br /><br /><br /><br /> </div>

          </div>
          <div className="footer_30a67" id="cont">
            <div className="footerButtonContainer_b9ae4">
              <button className="new-button team-preview" onClick={this.teamPreview}>Team Preview</button>
              {this.state.isSave ?
          //  <Link to={"/contest/" +this.props.queryString.matchid + "/" +this.props.queryString.cid } key={this.props.queryString.cid}>
              <button className="new-button raisedGreenButton_20c05" onClick={this.savePlayerData}>SAVE</button>
              // </Link>

              :
              <button className="new-button raisedGreenButton_20c05 disabledButton_cf79e raisedGreenButtonDisabled_e0a23" disabled>SAVE</button>
               }
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
                      <div className="player-profile-info__header-data">{playerStates ? playerStates.totalpoints : ""}</div>
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
                      {playerStates ? playerStates.player_roll : ""}
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
                 {playerPoints.map((data,idx)=>(
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
                        <div>0%</div>
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
           {wkPlayers && wkPlayers.length>0 ?   <div className="typeo">
                Wicketkeeper
           </div>
           : ""}
              <div className="flex">
                {wkplayerData}
              </div>

              {batPlayers && batPlayers.length >0 ? <div className="typeo">
                Batsmen
           </div>
           : ""}
              <div className="flex">
                {batplayerData}
              </div>

              {allPlayers && allPlayers.length > 0 ? <div className="typeo">
                All-Rounder
           </div>
           : ""}
              <div className="flex">
                {allplayerData}
              </div>
              {bowlPlayers && bowlPlayers.length >0 ? <div className="typeo">
                Bowler
           </div>
           : ""}
              <div className="flex">
                {bowlplayerData}
              </div>

            </div>

          </div>
        </div>


      </>
    );
  }
}
export default CreateTeamLeaderCard;
