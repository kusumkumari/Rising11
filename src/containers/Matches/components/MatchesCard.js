
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { isLoggedIn, } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';
import { getMatchesAPI } from '../../App/ApiIntegration';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';


class MatchesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      successMsg: '',
      Matchdata: [],
    }
  }
  componentWillMount() {
    this.getMatches()
    // this.interval = setInterval(this.getMatches, 10000);
  }
  getMatches() {
    getMatchesAPI({ match_status: 1 }, (response) => {
      if (response.response.data['status'] == true) {
        this.setState({
          Matchdata: response.response.data.player_records.player_data,
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load Upcomming matches" });
      }
    });
  }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  render() {
    const { Matchdata } = this.state;
    console.log("hhhhhhhhh", typeof (isLoggedIn()), isLoggedIn())
    const matchEntry = []
    for (let index = 0; index < Matchdata.length; index++) {
      let type = "wk"
      const { id, match_id, logo_urla, logo_urlb, mformat_str, mtitle, short_namea, short_nameb, time_left, short_title, cid } = Matchdata[index]
      matchEntry.push(
        <Link to={isLoggedIn() ? "/contest/" + match_id + "/" + cid : "/createteam/" + match_id + "/" + cid + "/0/" + type} key={id}>
          <div className="team-box">
            <div className="matchCardHeaderTitleDesktop_a2024">{mtitle + ' ' + mformat_str}</div>
            <div className="row">
              <div className="col-md-3 col-xs-3">
                <div className="teams teams-left">
                  <img src={logo_urla} className="img-responsive img-sm" />
                </div>
              </div>
              <div className="col-md-6 col-xs-6">
                <p>{short_title}</p>
                <h3>{time_left} Left</h3>
              </div>
              <div className="col-md-3 col-xs-3">
                <div className="teams teams-right">
                  <img src={logo_urlb} className="img-responsive img-sm" />
                </div>
              </div>
            </div>
          </div>
        </Link>

      )
    }
    return (
      <div className="bg">
        <header >
          <div className="logo-box">
            <marquee className="alert-red">
              This is a Beta Version of Rising11
            </marquee>
            <div className="row row-0 p-14">
              <div className="col-md-4 col-xs-3 col-r-0 col-l-0">
                {isLoggedIn() ?
                  // <Link to="/logout" style={{color:"white"}}><img src={require("../../../img/1-3.jpg")} className="img-rounded-1" /></Link>  
                  <Link to="/account" style={{ color: "white" }}>
                    <div className="img-rounded-1 mg-l"><i className="fa fa-user fa-x"></i></div>
                  </Link>
                  : ""
                }
              </div>

              <div className="col-md-4 col-xs-6 col-r-0 col-l-0">
                <img src={require("../../../img/logo-home.png")} className="centered" />
              </div>
              <div className="col-md-4 col-xs-3 col-r-0 col-l-0 ">
                {isLoggedIn() ?
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {popupState => (
                      <React.Fragment>
                        <Badge badgeContent={4} className="bell-btn mg-r" color="error" {...bindTrigger(popupState)}>
                          {/* <a href="#" className="bell-btn mg-r"  > */}

                          <i className="fa fa-bell" aria-hidden="true" ></i>  </Badge>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={popupState.close}>1st Notification</MenuItem>
                          <Divider light />
                          <MenuItem onClick={popupState.close}>2nd Notification</MenuItem>
                          <Divider light />
                          <Button color="primary" onClick={popupState.close}>See All</Button>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                  :
                  <Link to="/login" className="login-btn sign-in-top-space">Sign In</Link>
                }
              </div>
            </div>
            {isLoggedIn() ?
              ""
              :
              <img src={require("../../../img/3-steps.png")} style={{ padding: "10px", background: "#FFFFFF", width: "100%" }} className="img-responsive" />
            }
            <div className="highlight-box">
              <h1>Upcoming Matches</h1>
            </div>

            <div className={isLoggedIn() ? "team  hg-71" : "team hg-80"}>
              {matchEntry}
              <div className="clearfix">
                <br /><br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /><br /> <br /><br /><br />
              </div>
            </div>
            <span className="extraspace"></span>
          </div>
          {isLoggedIn() ?
            <div className="fixed-bottom">
              <ul>
                <li><Link to="/" className="p-14 fb-14"><i className="fa fa-home"></i> &nbsp; Home</Link></li>
                <li><Link to="/my_matches" className="p-14 fb-14"><i className="fa fa-trophy"></i> &nbsp; My Matches</Link></li>
                <li><Link to="/more" className="p-14 fb-14"><i className="fa fa-info" aria-hidden="true"></i> &nbsp; More</Link></li>
              </ul>
            </div>
            : ""}
        </header>
      </div>
    );
  }
}
export default MatchesCard;
