
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import { RegistrationAPI, OtpVerificationAPI, ResendOtpVerificationAPI, socialAuthAPI } from '../../App/ApiIntegration';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Link
} from 'react-router-dom';

import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

class RegistrationCard extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      mobile: '',
      password: '',
      successMsg: '',
      errorMsg:'',
      errorMsgemail: '',
      errorMsgmob: '',
      errorMsgpass: '',
      customerId: '',
      otp: '',
      otpError: '',
      open: false,
      otpSuccess:'',
      referalStatus:"none",
      referalCode:'',
    };
  }

  registerHandler = () => {
    const { email, mobile, password, referalCode } = this.state;
    const { showLoader, hideLoader } = this.props;
    showLoader(() => {
      RegistrationAPI(email, mobile, password, referalCode, (response) => {
        if (response.response.data["error"]) {
          const errorMsgemail = response.response.data["error"].email;
          const errorMsgmob = response.response.data["error"].mobile;
          const errorMsgpass = response.response.data["error"].password;
          this.setState({ errorMsgemail: errorMsgemail, errorMsgmob: errorMsgmob, errorMsgpass: errorMsgpass, }, hideLoader);
        }
        if (response.response.data["success"]==false) {
          this.setState({ errorMsg: response.response.data["message"], }, hideLoader);
        }
        if (response.response.data['customer_id'] && response.response.data['success']==true) {
          this.setState({ successMsg: response.response.data.message, customerId: response.response.data['customer_id'], open: true,  errorMsgemail: "", errorMsgmob: "", errorMsgpass: "",errorMsg:"" }, hideLoader);
          hideLoader();
        }
      });
    });

  }

  otpHandler = () => {
    const { customerId, otp } = this.state;
    const { showLoader, hideLoader } = this.props;
    showLoader(() => {
      let custid=String(customerId)
      OtpVerificationAPI(otp, custid, (response) => {
        console.log("oooooooooooo",response)
        if (response.response.data["error"]) {
          const otpError = response.response.data["error"].email_OTP;
          this.setState({ otpError: otpError }, hideLoader);
        }
        if(response.response.data["success"] == true && response.response.data["customer_id"]) {
          const otpSuccess = response.response.data["message"];
          this.setState({ otpSuccess: otpSuccess }, hideLoader);
          hideLoader();
          window.location.href="/login"
        }
      });
    });

  }
  resendOtpHandler =() =>{
    const { customerId, } = this.state;
      let custid=String(customerId)
      alert(custid)
      ResendOtpVerificationAPI(custid, (response) => {
        console.log("ddddddddddd",response)
        if (response.response.data["error"]) {
          const otpError = response.response.data["error"].email_OTP;
          this.setState({ otpError: otpError });
        }
        if(response.response.data["success"] == true ) {
          const otpSuccess = response.response.data["message"];
        }
      });
  }
 responseFacebook = (response) => {
    let email=response.email
    let uid = response.userID
    let loginType ="facebook"
    alert(email)
    socialAuthAPI(email, uid, loginType, (response) => {
      console.log("sssssssssssss",response)
      if (response.response.data.success==false) {
        const errorMsg = response.response.data.message
        this.setState({ errorMsg: errorMsg });
      }
      if(response.response.data.success == true ) {
        const successMsg = response.response.data.message
        this.setState({ successMsg: successMsg });
        window.location.href="/"
      }
    });
  }

 responseGoogle = (response) => {
   console.log("gmailllllllllllllllll",response)
  let email=response.profileObj.email
  let uid = response.profileObj.googleId
  let loginType ="google"
  socialAuthAPI(email, uid, loginType, (response) => {
    console.log("lllllllllll",response)
    if (response.response.data.success==false) {
      const errorMsg = response.response.data.message
      this.setState({ errorMsg: errorMsg });
    }
    if(response.response.data.success == true ) {
      const successMsg = response.response.data.message
      this.setState({ successMsg: successMsg });
      window.location.href="/"
    
    }
  });
}

  render() {
    const { successMsg, errorMsgemail, errorMsgmob, errorMsgpass,referalStatus, errorMsg, otpError,open, otpSuccess } = this.state;
    

    return (
      <div className="bg">
        <header>
          <div className="logo-box">
          <marquee className="alert-red">
              This is a Beta Version of Rising11
            </marquee>
            <div className="row">
              <div className="col-md-4 col-xs-3">
              <Link to="/" ><i className='fa fa-chevron-left ch'></i></Link>
              </div>
              <div className="col-md-4 col-xs-6">
                <img src={require("../../../img/logo-home.png")} className="centered" />
              </div>
              <div className="col-md-4 col-xs-3">
                <Link to="/login" className="login-btn p-14 sign-in-top-space">Sign In</Link>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="login-box">
              <h3>Welcome to Rising XI</h3>
              <p>Enter your Email to Start Your Fantasy Journey with Rising XI</p>
              <p>Sign Up with Social</p>
              <div className="row">
                <div className="col-md-6">
                  <span className="social-btn right-btns">
                    <button className="FBi">
                    <i className='fa fa-facebook fb-1'></i> 
    
                    <FacebookLogin
                      appId="533770150713309" //APP ID NOT CREATED YET
                      fields="name,email,picture"
                      callback={this.responseFacebook}
                    />
                    </button>
                  </span>
                </div>
                <div className="col-md-6">
                  <span className="social-btn left-btns">
                    {/* <i className='fa fa-google g'></i> <b className="g-text">Google</b> */}
                    <button className="FBi">
                    <GoogleLogin
                      clientId="211780217643-l04selntr0o2b4c96dpk6n707bmtjkti.apps.googleusercontent.com"  //CLIENTID NOT CREATED YET
                      buttonText="LOGIN WITH GOOGLE" className="v-1"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      
                    />
                    </button>
                  </span>
                </div>
              </div>
              <p>Or</p>
              <form className="form-logup">
                <p>Please fill the form.</p>
                {errorMsg ?
                  <div align="center" className="alert alert-danger">{errorMsg}</div>
                  : "" }
                  <div>
                    <Dialog
                      open={open}
                      onClose={this.handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title" style={{textAlign:"center", fontSize:"1.65rem"}}>{"OTP Verification"}</DialogTitle>
                      <DialogContent>
                      {otpError ?
                          <div align="center" className="alert alert-danger">{otpError}</div>
                          :
                          <div align="center" className="alert alert-success">{successMsg}</div>
                        }
                        {
                          otpSuccess ?
                          <div align="center" className="alert alert-success">{otpSuccess}</div>
                          :""
                        }
                        <DialogContentText id="alert-dialog-description" style={{textAlign: "center"}}>
                        <input type="text" className="form-logup" onChange={(e) => { this.setState({ otp: e.target.value }); }} style={{width: "250px"}} />
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <button onClick={this.resendOtpHandler} className="login-otp-btn">
                          Resend
                         </button>
                        <button onClick={this.otpHandler} className="login-otp-btn">
                          Verification
                         </button>
                      </DialogActions>
                    </Dialog>
                  </div>

                  <input type="text" placeholder="Enter your Mail" onChange={(e) => { this.setState({ email: e.target.value }); }} />
                  {errorMsgemail ? <br /> : ""}
                  <span className="alert-p">{errorMsgemail}</span>
                  <br /> <br />
                  <input type="text" placeholder="Enter Mobile No" onChange={(e) => { this.setState({ mobile: e.target.value }); }} />
                  {errorMsgmob ? <br /> : ""}
                  <span className="alert-p">{errorMsgmob}</span>
                  <br /> <br />
                  <input type="password" placeholder=" Enter Password" onChange={(e) => { this.setState({ password: e.target.value }); }} />
                  {errorMsgpass ? <br /> : ""}
                  <span className="alert-p">{errorMsgpass}</span>
                  <p className="p-14" onClick={(e)=>{ this.setState({referalStatus:"block"}); }}>
                    <Link to="#" className="red">I have a referral code</Link>
                  </p>
                  <input type="text" placeholder="Referral code (optional)" style={{display:referalStatus}} onChange={(e) => { this.setState({ referalCode: e.target.value }); }} />
                  <br /><input type="button" className="change-password-btn" onClick={this.registerHandler} value="Sign Up"/>
                <p className="mg-25" style={{textAlign:"center"}}>If you have <Link to="/forgetpass" className="red"> Forget Password </Link>click here</p>
                </form>
           
            </div>
          </div>
        </header>
      </div>
        );
      }
    }
    export default RegistrationCard;
