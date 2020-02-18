
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
// import { dashboradAnalytics, } from '../../App/ApiIntegration';
import { isLoggedIn } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';

class MoreCard extends Component {
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
            <div className="row row-0">
              <div className="col-md-4 col-xs-3 col-r-0 col-l-0">
                <Link to="/">
                <i className='fa fa-angle-left ch'></i>
                </Link>
              </div>
              <div className="col-md-4 col-xs-6 col-r-0 col-l-0">
                <h5 className="heading">More</h5>
              </div>
              <div className="col-md-4 col-xs-3 col-r-0 col-l-0">
                {/* <a href="login.html" className="login-btn">Login</a */}
                </div>
            </div>
          </div>

          <div className="team">
          <Link to="/">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">Home</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                      <div className="go-btn">
                        <i className='fa fa-angle-right'></i>
                      </div>
                  </div>
                </div>
              </div>
              </Link>

              <Link to="/about">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">About Us</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                    
                  </div>
                </div>
              </div>
              </Link>

      
              <Link to="/FAQ">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">FAQs</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                    
                  </div>
                </div>
              </div>
              </Link>

              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">Help Desk</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/fantasy_points">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">Fantasy Points System</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                  
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                    
                  </div>
                </div>
              </div>
              </Link>
              <Link to="/HowToPlays">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">How To Play</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                  
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                    
                  </div>
                </div>
              </div>
              </Link>

              <Link to="/Terms">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">Terms & Condition</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                    
                  </div>
                </div>
              </div>
              </Link>
              <Link to="/PrivacyPolicy">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">Privacy & Policy</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                    
                  </div>
                </div>
              </div>
              </Link>
              <Link to="/Legally">
              <div className="more-box">
                <div className="row">

                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">Legality</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                    
                  </div>
                </div>
              </div>
              </Link>
              <div className="clearfix">
                <br/> <br/><br/>
                <br/> <br/><br/>
                <br/> <br/><br/>
              </div>
          </div>
  
        </header>

      </div >
    );
  }
}
export default MoreCard;
