
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { isLoggedIn, contestPrizeBreakupAPI, CreateContestUserAPI, } from '../../App/ApiIntegration'
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
      contestData: [],
    }
  }

  componentDidMount() {
    const { matchid, cid, contestName, contestSize, prize } = this.props.queryString;
    this.contestPrizeBreakup(contestName, contestSize, prize);

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

  // saveContest=()=>{

  //   if(this.state.ratio){
  //   const { matchid, cid, contestName, prize } = this.props.queryString;
  //   const cookies = new Cookies();
  //   var myCookie = cookies.get('matchCookies');
  //    CreateContestUserAPI({cookie_id:myCookie, contest_name: contestName,match_id:matchid,cid:cid, total_prize: prize, wining: this.state.winner, ratio:this.state.ratio }, (response) => {
  //       console.log("ccccccccccccccccccc", response)
  //       if (response.response.data.success == true) {
  //         alert(response.response.data.message)
  //         //joinContestAPI()
  //         window.location.href="/contestcode/"+response.response.data.id;
  //       }
  //       else {
  //         this.setState({
  //           errorMsg: "unable to load data"
  //         });
  //       }
  //     });
  //   }
  //   else{
  //     alert("Please Select Prize Brakup")
  //   }
  //   }


  saveContest = () => {
   
    if (this.state.ratio) {
      const { matchid, cid, contestName, prize } = this.props.queryString;
      const { winner, ratio, entryFee } = this.state;
      window.location.href = "/savejoincontest/" + contestName + "/" + matchid + "/" + cid + "/" + prize + "/" + winner + "/" + ratio+"/"+entryFee;
    }
    else {
      alert("Please Select Prize Brakup")
    }
  }
  choosePrizeBrakup = (id) => {
    alert()
    alert(id)
    this.setState({ ratio: id })

  }

  render() {

    const { data, winner, entryFee, data1, recommendDiv } = this.state;
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
                <Input type="radio" name="ratio" onClick={() =>this.choosePrizeBrakup(this.state.rank1)} />
                <h3 style={{ marginRight: "240px" }}>{winner + " Winners (Recommended)"} </h3>
              </div>
              <br /><br />
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
              </div><br /><br /><br />
              <div className="winnerBreakupSelectorLabel_8ee3f">Choose total no. of winners</div>
              <div className="winnerBreakupSelectBox_92ac2">
                <Input type="radio" name="ratio" onClick={() =>this.choosePrizeBrakup(this.state.rankOther)} />
                <h3 style={{ marginRight: "350px" }}>1 Winners</h3>
              </div>

              <div className="winnerBreakupTable winnerBreakupTable_b4b25">
                <div className="scroll">
                  <div>
                    <div className="winnerBreakupRowBig_d5608 partition_649b0" key={45}>
                      <div className="rankRange_ffbbc">Rank {data1 ? data1[0].rank : ""}</div>
                      <div className="winnerPercent_df867">{data1 ? data1[0].per : ""} %</div>
                      <div className="prizeAmount_e10d2">₹ {data1 ? data1[0].peruser : ""}</div>
                    </div>
                  </div>
                  <div className="clearfix">
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
 

          <div className="container_eee6d" style={{ display: recommendDiv }}>
            <div className="innerContainer_b8f9b">

              <a className="btn btn--flat btn--background--white center wd-70s">
                <div>

                  {/* <div onClick={()=>this.openNav()} >Create Contest & Invite Friends</div> */}
                  <div onClick={this.saveContest}>Create Contest & Invite Friends</div>
                </div>
              </a>

            </div>
          </div>
        </header>
      </div >
    );
  }
}
export default NewContestCard;
