
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/home.css';
import Navbar from './../../Layout/Navbar'
import Content from '../../Layout/Content'
import Footer from '../../Layout/Footer';
import {
  Link
} from 'react-router-dom';

class HomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newOrders: '',
    }
  }

  render() {

    return (
      <div>
        <div className="bg1">
        <marquee className="alert-red">
              This is a Beta Version of Rising11
            </marquee>
          <nav>
            <div className="container">
              <div className="row">
                <div className="col-md-3 col-xs-7">
                  <ul>
                    <li>
                      <div className="logo">
                        <img src={require("../../../img/logo-home.png")} />                  
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-md-2 col-xs-0">
                </div>
                <div className="col-md-7 col-xs-5">
                      <Link to="/registration" className="login-btn login-btn-s-2" >
                      <i className="fa fa-user-o"></i> Sign Up
                      </Link>
                </div>
              </div>
            </div>
          </nav>
          <div className="container">
            <div className="col-md-6">
              <img src={require("../../../img/rising.gif")} className="app-setting" />            </div>
            <div className="col-md-6">
              <h1 className="caption-h1">Welcome to Rising 11<br />  The Fantasy Game</h1>
              <p className="banner-p p-14">Lorem Ipsum minima voluptatibus eveniet, quisquam deserunt temporibus molestias nesciunt, quia amet nostrum cumque quaerat vitae aut laudantium, autem aspernatur recusandae.</p>
            </div>
            <span>
              <Link to="/matches" className="login-btn" >
                <i className="fa fa-play">
                </i> &nbsp; Play Now
              </Link>
              <a href="#" className="login-btn btn1-s-t">
                <i className="fa fa-download">
                </i> &nbsp; Download App
              </a>
            </span>
          </div>
        </div>
        <Content />
        <Footer />
      </div>
    );
  }
}
export default HomeCard;
