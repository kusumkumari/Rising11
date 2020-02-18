
/* eslint-disable */
import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class Nvabar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div>
      <nav>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <ul>
                <li>
                  <div className="logo">
                    <img src={require("../../img/logo-home.png")} style={{ maxWidth: "180px", marginTop: "6px" }} />
                  </div>
                </li>
              </ul>
            </div>
            <div class="col-md-2">
            </div>
            <div class="col-md-7" style={{fontSize: "1.5rem"}}>
              <ul style={{ marginTop: "15px" }}>
                <li className="">
                  <a href="#">Home</a>
                </li>
                <li className="">
                  <a href="#">About</a>
                </li>
                <li className="">
                  <a href="#">Contest</a>
                </li>
                <li className="">
                  <a href="#">Contact</a>
                </li>
                <li className="right block-response" style={{marginTop: "15px", marginLeft: "20px"}}>

                  <Link to="/registration" className="login-btn">
                    &nbsp;  <i className="fa fa-user-o"></i> &nbsp; Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
       
       <div className="container">
       <div className="col-md-6">
         <img src={require("../../img/app-1.png")} className="app-setting" />
       </div>
       <div className="col-md-6">
         <h1 className="caption-h1">Welcome to Rising 11<br />  The Fantasy Game</h1>
         <p className="banner-p banner-contentp">Lorem Ipsum minima voluptatibus eveniet, quisquam deserunt temporibus molestias nesciunt, quia amet nostrum cumque quaerat vitae aut laudantium, autem aspernatur recusandae.</p>
       </div>
       <span>
       <Link to="/matches" className="login-btn c-1">
           <i className="fa fa-play">
           </i> &nbsp; Play Now
           </Link>
         <a href="#" className="login-btn btn-1home c-1" >
           <i className="fa fa-download">
           </i> &nbsp; Download App
         </a>
       </span>
     </div>
     </div>

    );
  }
}
export default Nvabar;
