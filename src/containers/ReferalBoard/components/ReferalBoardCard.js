
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { isLoggedIn } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';

class ReferalBoardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className="bg">
        <header>
          <div className="logo-box">
          <marquee className="alert-red">
              This is a Beta Version of Rising11
            </marquee>
            <div className="row">
              <div className="col-md-2 col-xs-2">
                <i className='fa fa-chevron-left ch' onClick={()=>history.go(-1)}></i>
              </div>
              <div className="col-md-8 col-xs-8">
                <h5 className="heading">Referral Leader Board</h5>
              </div>
              <div className="col-md-2 col-xs-2">
                {/* <a href="login.html" className="login-btn">Login</a */}
              </div>
            </div>
          </div>
          <div className="">

          </div>
          <div className="global-leaderboard-teams__header">
            <div class="global-leaderboard-teams__header__title">Referrals</div>
            <div class="global-leaderboard-teams__header__title">Rank</div>
          </div>
          <div className="container team white">
            <div className="row global-leaderboard-teams__team">
              <div className="col-md-8 col-xs-8 flex">
                <img src={require("../../../img/teams/player-1.png")} className="global-leaderboard-teams__team-details__avatar" />
                <div className="cdn-1">
                  <div className="player-name global-leaderboard-teams__team-name-color">King Ujjwal XI</div>
                  <p className="short-p global-leaderboard-teams__team-color">0 Points</p>
                </div>
              </div>
              <div className="col-md-4 col-xs-4">
                <p className="global-leaderboard-teams__team-rank">01</p>
              </div>
            </div>
            <div className="row global-leaderboard-teams__team">
              <div className="col-md-8 col-xs-8 flex">
                <img src={require("../../../img/teams/player-1.png")} className="global-leaderboard-teams__team-details__avatar" />
                <div className="cdn-1">
                  <div className="player-name global-leaderboard-teams__team-name-color">King Ujjwal XI</div>
                  <p className="short-p global-leaderboard-teams__team-color">0 Points</p>
                </div>
              </div>
              <div className="col-md-4 col-xs-4">
                <p className="global-leaderboard-teams__team-rank">01</p>
              </div>
            </div>
            <div className="row global-leaderboard-teams__team">
              <div className="col-md-8 col-xs-8 flex">
                <img src={require("../../../img/teams/player-1.png")} className="global-leaderboard-teams__team-details__avatar" />
                <div className="cdn-1">
                  <div className="player-name global-leaderboard-teams__team-name-color">King Ujjwal XI</div>
                  <p className="short-p global-leaderboard-teams__team-color">0 Points</p>
                </div>
              </div>
              <div className="col-md-4 col-xs-4">
                <p className="global-leaderboard-teams__team-rank">01</p>
              </div>
            </div>
            <div className="row global-leaderboard-teams__team">
              <div className="col-md-8 col-xs-8 flex">
                <img src={require("../../../img/teams/player-1.png")} className="global-leaderboard-teams__team-details__avatar" />
                <div className="cdn-1">
                  <div className="player-name global-leaderboard-teams__team-name-color">King Ujjwal XI</div>
                  <p className="short-p global-leaderboard-teams__team-color">0 Points</p>
                </div>
              </div>
              <div className="col-md-4 col-xs-4">
                <p className="global-leaderboard-teams__team-rank">01</p>
              </div>
            </div>
            <div className="row global-leaderboard-teams__team">
              <div className="col-md-8 col-xs-8 flex">
                <img src={require("../../../img/teams/player-1.png")} className="global-leaderboard-teams__team-details__avatar" />
                <div className="cdn-1">
                  <div className="player-name global-leaderboard-teams__team-name-color">King Ujjwal XI</div>
                  <p className="short-p global-leaderboard-teams__team-color">0 Points</p>
                </div>
              </div>
              <div className="col-md-4 col-xs-4">
                <p className="global-leaderboard-teams__team-rank">01</p>
              </div>
            </div>
            <div className="row global-leaderboard-teams__team">
              <div className="col-md-8 col-xs-8 flex">
                <img src={require("../../../img/teams/player-1.png")} className="global-leaderboard-teams__team-details__avatar" />
                <div className="cdn-1">
                  <div className="player-name global-leaderboard-teams__team-name-color">King Ujjwal XI</div>
                  <p className="short-p global-leaderboard-teams__team-color">0 Points</p>
                </div>
              </div>
              <div className="col-md-4 col-xs-4">
                <p className="global-leaderboard-teams__team-rank">01</p>
              </div>
            </div>
            <div className="row global-leaderboard-teams__team">
              <div className="col-md-8 col-xs-8 flex">
                <img src={require("../../../img/teams/player-1.png")} className="global-leaderboard-teams__team-details__avatar" />
                <div className="cdn-1">
                  <div className="player-name global-leaderboard-teams__team-name-color">King Ujjwal XI</div>
                  <p className="short-p global-leaderboard-teams__team-color">0 Points</p>
                </div>
              </div>
              <div className="col-md-4 col-xs-4">
                <p className="global-leaderboard-teams__team-rank">01</p>
              </div>
            </div>
            <div className="row global-leaderboard-teams__team">
              <div className="col-md-8 col-xs-8 flex">
                <img src={require("../../../img/teams/player-1.png")} className="global-leaderboard-teams__team-details__avatar" />
                <div className="cdn-1">
                  <div className="player-name global-leaderboard-teams__team-name-color">King Ujjwal XI</div>
                  <p className="short-p global-leaderboard-teams__team-color">0 Points</p>
                </div>
              </div>
              <div className="col-md-4 col-xs-4">
                <p className="global-leaderboard-teams__team-rank">01</p>
              </div>
            </div>
            <div className="row global-leaderboard-teams__team">
              <div className="col-md-8 col-xs-8 flex">
                <img src={require("../../../img/teams/player-1.png")} className="global-leaderboard-teams__team-details__avatar" />
                <div className="cdn-1">
                  <div className="player-name global-leaderboard-teams__team-name-color">King Ujjwal XI</div>
                  <p className="short-p global-leaderboard-teams__team-color">0 Points</p>
                </div>
              </div>
              <div className="col-md-4 col-xs-4">
                <p className="global-leaderboard-teams__team-rank">01</p>
              </div>
            </div>
            <div className="row global-leaderboard-teams__team">
              <div className="col-md-8 col-xs-8 flex">
                <img src={require("../../../img/teams/player-1.png")} className="global-leaderboard-teams__team-details__avatar" />
                <div className="cdn-1">
                  <div className="player-name global-leaderboard-teams__team-name-color">King Ujjwal XI</div>
                  <p className="short-p global-leaderboard-teams__team-color">0 Points</p>
                </div>
              </div>
              <div className="col-md-4 col-xs-4">
                <p className="global-leaderboard-teams__team-rank">01</p>
              </div>
            </div>
          
          </div>

        </header>
      </div >
    );
  }
}
export default ReferalBoardCard;
