
import React, { Component } from 'react';
import Footer from '../../Layout/Footer';
import ElevatedTabs1 from './ElevatedTabs';
import $ from 'jquery';
import {
  Link
} from 'react-router-dom';
class Play extends Component {


  render() {
    const { slide1, slide2, slide3, slide4 } = this.props;
    return (
      <>
      <ElevatedTabs1/>
      <div className="background-inner-page">
      <div className="text-center centered-h1-sz">
        <h3 className="h1-sz text-upper">How To Play</h3>
      </div>
    </div>
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
                    <img src={require("../../../img/app-1.png")} className="centered" />
                  </div>
                  <div className="mySlides" style={slide2 ? { display: "block" } : { display: "none" }}>
                    <img src={require("../../../img/app-1.png")} className="centered" />
                  </div>
                  <div className="mySlides" style={slide3 ? { display: "block" } : { display: "none" }}>
                    <img src={require("../../../img/app-1.png")} className="centered" />
                  </div>
                  <div className="mySlides" style={slide4 ? { display: "block" } : { display: "none" }}>
                    <img src={require("../../../img/app-1.png")} className="centered" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
      <Footer/>
      
      </>
    );
  }
}
export default Play;
