
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { isLoggedIn, createContestAPI } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Cookies from 'universal-cookie';

class CreateContestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestSize:"",
      prize:"",
      contestName:"",
      entry_per_team:0,
      errorContestName:"",
      errorPrize:"",
      errorContestSize:"",
      winnigBreakup:"none",
      inviteButton: "",
    }
  }
  openNav() {
    document.getElementById("myNav").style.height = "60%";
  }

  closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }
  handleChange = (e) => {
    
    this.setState({
      [e.target.name]: e.target.value,
    });
  
  };
  createContest(matchid,cid){
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');
    createContestAPI(myCookie, matchid, cid,this.state.contestSize, this.state.prize, this.state.contestName, (response) => {
      console.log("cccccccccccc", response)
      if (response.response.data.success == true) {
        this.setState({
          entry_per_team:response.response.data.entry_per_team,
          winnigBreakup:"",
          inviteButton:"none"
        })
      }
      else {
        this.setState({ 
          errorContestName: response.response.data.error.contest_name,
          errorPrize: response.response.data.error.total_prize,
          errorContestSize: response.response.data.error.contest_size,
         });
      }
    });
  }
  render() {
    const {matchid, cid} = this.props.queryString;
    const {winnigBreakup,inviteButton, contestName, contestSize, prize} = this.state;

    return (
      <div className="bg">
        <header>
          <div className="logo-box">
            <div className="row">
              <div className="col-md-4 col-xs-3">
                <Link to={"/contest/" + this.props.queryString.matchid + "/" + this.props.queryString.cid} key={this.props.queryString.cid}>
                  <i className='fa fa-chevron-left ch'></i></Link>
              </div>
              <div className="col-md-6 col-xs-8">
                <h5 className="heading">Create Contests</h5>
              </div>
              <div className="col-md-2 col-xs-1">
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
                <p className="p1-1">{localStorage.getItem("matchs_title")}</p>
              </div>
              <div className="col-md-6 col-xs-6">
                <p className="p1-1 text-red"><i className="far fa-clock"></i>{localStorage.getItem("time_left")}
                </p>
              </div>
            </div>
         
          </div>


          <div className="team hg-80 pd-15">
            <div className="form-label">
              Give your contest a name
            </div>
            <input type="text" name="contestName" onChange={this.handleChange} className="input-field" placeholder="(optional)"  />
            <span style={{color:"red"}}>{this.state.errorContestName}</span>

            <div className="form-label">
              Total Prize Pool
            
            </div>
            <input type="number" name="prize" min="100" max="10000" onChange={this.handleChange} className="input-field" placeholder="(optional)" required={true} />
            <span style={{color:"red"}}>{this.state.errorPrize }</span>

            <div className="form-label">
              Contest Size
            </div>
            <input type="number" name="contestSize" onChange={this.handleChange} className="input-field" placeholder="(optional)" required={true}  />
            <span style={{color:"red"}}>{this.state.errorContestSize}</span>
            <div className="clearfix"><br /></div>
            {/* <FormControlLabel
              control={
                <Checkbox
                  // checked={state.checkedB}
                  // onChange={handleChange('checkedB')}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Allow friends to join multiple teams"
            /> */}
            <div className="privateLeagueFeePerTeam_715df">
            
              <div className="privateLeagueFeeAmountContainer_c504f">Entry Per Team:<span className="privateLeagueFeeAmount_bc831">{this.state.entry_per_team}</span></div>
              
              <div className="privateLeagueFeeMessage_75f02">Entry is calculated based on total prize amount &amp; contest size</div>
            </div>
          </div>

          <div className="container_eee6d">
            <div className="innerContainer_b8f9b">

              <a className="btn btn--flat btn--background--white center wd-70s">
                <div>
                  <div style={{display:inviteButton}} onClick={()=>this.createContest(matchid,cid)}>Create Contest & Invite Friends</div>
                  <Link to={"/newcontest/" + this.props.queryString.matchid + "/" + this.props.queryString.cid+ "/"+contestName+"/"+contestSize+"/"+prize}>
                  <div style={{display:winnigBreakup}} >Choose Winning Breakup</div>
                  </Link>
                </div>
              </a>

            </div>
          </div>
        </header>
      </div >
    );
  }
}
export default CreateContestCard;
