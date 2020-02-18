
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { isLoggedIn, listJoinedContestAPI } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

class JoinedContestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestData:[],
    }
  }

  componentDidMount(){
    this.listJoinedContest();
  }

  listJoinedContest(){
    listJoinedContestAPI((response) => {
      console.log("yyyyyyyyyyy", response)
      if (response.response.data.status == true) {
        this.setState({
          contestData: response.response.data.data,
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load wallet Data" });
      }
    });
  }
  render() {
    const {contestData}=this.state;
    return (
      <div class="bg">
        <header>
          <div class="logo-box">
            <div class="row">
              <div class="col-md-2 col-xs-3">
                <i class='fa fa-chevron-left ch p-14' onClick={()=>history.go(-2)}></i>
              </div>
              <div class="col-md-8 col-xs-6">
                <h5 class="heading">Joined Contests</h5>
              </div>
             
            </div>
          </div>
          <div class="row row-s-2-3">
            <div class="timer">
              <div class="col-md-6 col-xs-6">
                <p class="p1-1">{localStorage.getItem("match_title")}</p>
              </div>
              <div class="col-md-6 col-xs-6">
                <p class="p1-1 text-red"><i class="far fa-clock"></i> {localStorage.getItem("time_left")}
                </p>
              </div>
            </div>
          </div>
         

         
          <div class="team">
            {/* loop */}
            {contestData.map((data, idx) => (
             <div className="teams-1">

             <div className="row">
               <div className="col-md-6 col-xs-6">
                 <p className="contest-p"></p>
                 <h3 className="contest-h3">{data.total_prize}</h3>
               </div>
              
             </div>
             <div className="contestProgressBarContainer_0efc1">
             <LinearProgress variant="determinate" 
             value={parseInt(((data.totalcontext-data.leftcontext)/data.totalcontext*100))} />

             </div>
             <div className="contestSpecRow_01429">
               <div className="spotLefts_8d583 contestFilling_14509">{data.leftcontext} spots left</div>
               <div className="totalSpots_b62ba">Total {data.totalcontext}  spots</div>
             </div>
             <div className="contestSpec_a3ebb">
               <div className="iconLabelGroup_f55e1">
                 <div className="iconLabelWrapper_43690">
                   <i className="fa fa-trophy" style={{marginRight: "5px"}}></i>
                   <span>{data.winning_percentage}%</span>
                 </div>
               </div>
               <div className="iconLabelGroup_f55e1" style={{justifyContent: "flex-end"}}>
                 {/* <div className="squareWithTwoRoundCorner_1291a">C</div>
                   <div style={{paddingeft: "12px"}}><div className="squareWithTwoRoundCorner_1291a">M</div></div>
                 */}
                 </div>
             </div>
            
             </div>
            
            ))}
          </div>
      
        </header>
       
      </div >
    );
  }
}
export default JoinedContestCard;
