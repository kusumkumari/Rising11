
/* eslint-disable */
import React, { Component } from 'react';
import $ from 'jquery';
import {
  Link
} from 'react-router-dom';
import { getMatchesAPI } from '../App/ApiIntegration';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slide1: true,
      slide2: false,
      slide3: false,
      slide4: false,
      errorMsg: '',
      successMsg: '',
      Matchdata: [],
    }
  }

  componentWillMount() {
    getMatchesAPI({match_status:1},(response) => {
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

  render() {
    const { slide1, slide2, slide3, slide4 } = this.state;
    const { Matchdata } = this.state;
    const matchEntry = []
    for (let index = 0; index < Matchdata.length; index++) {
      if (index == 6) {
        break;
      }
      else {
        let type = "wk"
        const { id, match_id, logo_urla, logo_urlb,time_left, mformat_str, mtitle, short_namea, short_nameb, short_title, cid } = Matchdata[index]
        matchEntry.push(
          <Link to={"/createteam/" + match_id + "/" + cid + "/0/" + type} key={id}>
            <div className="col-md-4">
              <div className="team-box">
                <div className="row">
                <div class="matchCardHeaderTitleDesktop_a2024 mg-b-10">{mtitle + ' ' + mformat_str}</div>
                  <div className="col-md-3 col-xs-3">
                    <div className="teams">
                      <img src={logo_urla} className="img-responsive img-max" />
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-6">
                    <p className="p-s">{short_title}</p>
                    <h3 className="upcoming-h3">{time_left} Left</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    <div className="teams">
                      <img src={logo_urlb} className="img-responsive img-max" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </Link>

        )
      }
    }
    return (
      <div className="main-container">

        <section id="about">
          <div className="container">
            <div className="row">
              <h1 className="about-h1 process-h1">Upcoming Matches</h1>
              <div className="clearfix"><br /><br /></div>
              {matchEntry}
            </div>
          </div>
        </section>

        <section id="process">
          <div className="container">
            <h3 className="about-h3" style={{ textAlign: "center" }}>Did you know ?</h3>
            <h1 className="about-h1 process-h1">How To Play this Game</h1>
            <p className="process-p c-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque <br /> volutpat mattis eros. Nullam malesuada erat ut turpis.</p>
            <div className="row">
              <div className="clearfix">
                <br /><br />
              </div>
              <div className="col-md-6">
                <div className="core-features">
                  <div className={slide1 ? "core-feat-single dot active" : "core-feat-single dot"} onClick={(e) => { this.setState({ slide1: true, slide2: false, slide3: false, slide4: false }); }}>
                    <div className="icon">
                      <div className="process-icon">
                        <p style={{ fontSize: "24px", fontWeight: "bolder" }}>1</p>
                      </div>
                    </div>
                    <div className="content">
                      <h5>PICK YOUR GAME</h5>
                      <p className="p-p c-2">
                        User Friendly Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.attis eros.</p>
                    </div>
                  </div>
                  <div className={slide2 ? "core-feat-single dot active" : "core-feat-single dot"} onClick={(e) => { this.setState({ slide2: true, slide1: false, slide3: false, slide4: false }); }}>
                    <div className="icon">
                      <div className="process-icon">
                        <p style={{ fontSize: "24px", fontWeight: "bolder" }}>2</p>
                      </div>
                    </div>
                    <div className="content">
                      <h5>CREATE YOUR TEAM</h5>
                      <p className="p-p c-2">
                        User Friendly Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.attis eros.</p>
                    </div>
                  </div>
                  <div className={slide3 ? "core-feat-single dot active" : "core-feat-single dot"} onClick={(e) => { this.setState({ slide3: true, slide1: false, slide2: false, slide4: false }); }}>
                    <div className="icon">
                      <div className="process-icon">
                        <p style={{ fontSize: "24px", fontWeight: "bolder" }}>3</p>
                      </div>
                    </div>
                    <div className="content">
                      <h5>CHOOSE YOUR CONTEST</h5>
                      <p className="p-p c-2">
                        User Friendly Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.attis eros.</p>
                    </div>
                  </div>
                  <div className={slide4 ? "core-feat-single dot active" : "core-feat-single dot"} onClick={(e) => { this.setState({ slide4: true, slide2: false, slide3: false, slide1: false }); }}>
                    <div className="icon">
                      <div className="process-icon">
                        <p style={{ fontSize: "24px", fontWeight: "bolder" }}>4</p>
                      </div>
                    </div>
                    <div className="content">
                      <h5>WATCH YOURSELF WINNING</h5>
                      <p className="p-p c-2">
                        User Friendly Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.attis eros.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="slideshow-container">
                  <div className="mySlides" style={slide1 ? { display: "block" } : { display: "none" }}>
                    <img src={require("../../img/app-2.png")} className="centered" />
                  </div>
                  <div className="mySlides" style={slide2 ? { display: "block" } : { display: "none" }}>
                    <img src={require("../../img/app-1.png")} className="centered" />
                  </div>
                  <div className="mySlides" style={slide3 ? { display: "block" } : { display: "none" }}>
                    <img src={require("../../img/app-2.png")} className="centered" />
                  </div>
                  <div className="mySlides" style={slide4 ? { display: "block" } : { display: "none" }}>
                    <img src={require("../../img/app-1.png")} className="centered" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="bg-2">
          <div className="container">
            <div className="clearfix">
               <br /><br /><br /><br /><br /><br /><br /><br />v
            </div>
            <h3 className="about-h3" style={{ textAlign: "center" }}>Download App</h3>
            <h1 className="about-h1 process-h1">₹100 Sign-Up Bonus</h1>
            <p className="process-p c-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque <br /> volutpat mattis eros. Nullam malesuada erat ut turpis.</p>
            <div className="clearfix">
              <br />
            </div>
            <div className="row download-bg">
              <div className="col-md-2">
              </div>
              <div className="col-md-5">
                <input type="name" className="leftinput" placeholder="Enter Mobile Number" />
                <input type="submit" className="rightinput c-2" />
              </div>
              <div className="col-md-3">
                <a href="#">
                  <img className="android-btn" src={require("../../img/download-btn.png")} />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="process">
          <div className="container">
            <h3 className="about-h3" style={{ textAlign: "center" }}>Great Offers</h3>
            <h1 className="about-h1 process-h1">Great Offers On Money Deposit</h1>
            <p className="process-p c-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque <br /> volutpat mattis eros. Nullam malesuada erat ut turpis.</p>
            <img src={require("../../img/app-3.png")} style={{ margin: "0 auto", display: "block" }} />
          </div>
        </section>
      </div >

    );
  }
}

export default Content;
