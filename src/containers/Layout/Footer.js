
/* eslint-disable */
import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <footer>
        <div className="container">
          <div className="row pd-t" style={{paddingTop:"130px"}}>
            <div className="col-md-4">
              <h3>Rising XI</h3>
              <p className="c-2" style={{color:"#FFFFFF",margin:"15px 0 30px"}}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit.</p>
              <Link to="/matches" className="login-btn c-1">
              {/* <a href="#" className="login-btn" style={{padding:"10px 24px !important"}}> */}
                <i className="fa fa-play"></i> &nbsp; Play Now
             </Link>
            </div>
            <div className="col-md-3">
              <h4>Useful Links</h4>
              <ul>
              <li><Link to="/Legally" className="useful-links c-2">Legalities</Link></li>
              <li><Link to="/Fair_Play_Violation" className="useful-links c-2">Fair Play</Link></li>
              <li><Link to="/FAQ" className="useful-links c-2">FAQs</Link></li>
              <li><Link to="/Terms"  className="useful-links c-2">T&C</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4>Follow Us </h4>
              <ul>
                <li><a href="#" className="useful-links c-2">Facebook</a></li>
                <li><a href="#" className="useful-links c-2">Instagram</a></li>
                <li><a href="#" className="useful-links c-2">Youtube</a></li>

              </ul>
            </div>
          </div>
          <div className="row bottom-footer">
            <div className="col-md-6">
              <p className="c-2 p-14" id="copyright">Copyright © <span className="year">2019</span> <a href="https://www.rising11.com/" className="rising">Rising11</a> All Rights Reserved</p>
            </div>
            <div className="col-md-6">
              <p className="c-2 p-14">Designed and Developed By <a href="http://ebetainnovations.com/" className="rising">e-BetaInnovations.com</a></p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
