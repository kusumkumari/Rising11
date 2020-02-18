
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { isLoggedIn } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';

class AccountCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className="bg">
        <div className="modal fade" id="myModal2" role="dialog">
          <div className="modal-dialog modal-center">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title title">FOLLOW US</h4>
              </div>
              <div className="modal-body">
                <Link className="social-button facebook"><i className="fa fa-facebook"></i> Facebook
                </Link>
                <Link className="social-button youtube"><i className="fa fa-youtube"></i> Youtube
                </Link>
                <Link className="social-button instagram"><i className="fa fa-instagram"></i> instagram
                </Link>
              </div>
            </div>

          </div>
        </div>


        <header>
          <div classNameName="logo-box">
            <div className="row row-0">
              <div className="col-md-4 col-xs-3 col-r-0 col-l-0">
                <Link to="/">
                  <i className='fa fa-chevron-left ch'></i>
                </Link>
              </div>
              <div className="col-md-4 col-xs-6 col-r-0 col-l-0">
                <h5 className="heading">Account</h5>
              </div>
              <div className="col-md-4 col-xs-3 col-r-0 col-l-0">
                {/* <a href="login.html" className="login-btn">Login</a */}
              </div>
            </div>
          </div>

          <div className="team">
            <Link to="/profile">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">My profile</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/mywallet">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">My wallet</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/referalcode">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">My Refferal Code</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            <Link to="/Refer_Earn">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">Refer & Earn</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            <Link to="/referalboard">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">Referral Leader board</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/logout">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">Sign-out</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="more-box" data-toggle="modal" data-target="#myModal2">
              <div className="row">
                <div className="col-md-9 col-xs-9">
                  <h3 className="more-h3">Follow Us</h3>
                </div>
                <div className="col-md-3 col-xs-3">
                  <div className="go-btn">
                    <i className='fa fa-angle-right'></i>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/varification">
              <div className="more-box">
                <div className="row">
                  <div className="col-md-9 col-xs-9">
                    <h3 className="more-h3">Verification</h3>
                  </div>
                  <div className="col-md-3 col-xs-3">
                    <div className="go-btn">
                      <i className='fa fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </header>
      </div >
    );
  }
}
export default AccountCard;
