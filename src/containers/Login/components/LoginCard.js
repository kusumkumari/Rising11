
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import { loginAPI, socialAuthAPI } from '../../App/ApiIntegration';
import {
  Link
} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';


class LoginCard extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMsg: '',
      errorMsgemail: '',
      errorMsgpass: '',
    };
  }

  loginHandler = () => {
    const { email, password, errorMsg, errorMsgemail,errorMsgpass } = this.state;
    const { showLoader, hideLoader } = this.props;
    showLoader(() => {
      loginAPI(email, password, (response) => {
        console.log("sdfsdfsdsfsd",response)
        if (response.response.data['credential'] == false) {
          const errorMsg = response.response.data["message"];
          this.setState({ errorMsg: errorMsg }, hideLoader);
        }
        if (response.response.data['success'] == false) {
          const errorMsg = response.response.data["message"];
          this.setState({ errorMsg: errorMsg }, hideLoader);
        }
        if(response.response.data['error']) {
          const errorMsgemail = response.response.data["error"].username;
          const errorMsgpass = response.response.data["error"].password;
          this.setState({ errorMsgemail: errorMsgemail, errorMsgpass:errorMsgpass }, hideLoader);
        }
        if(response.response.data['success'] == true){
          this.setState({ hideLoader});
          hideLoader();
          window.location.href="/"
        }
      });
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
    const { errorMsg,errorMsgpass, errorMsgemail } = this.state;
    return (
      <div className="bg">
        <header>
          <div className="logo-box">
          <marquee className="alert-red">
              This is a Beta Version of Rising11
            </marquee>
            <div className="row row-0">
              <div className="col-md-4 col-xs-3 col-r-0 col-l-0">
              <i className='fa fa-chevron-left ch' onClick={()=>history.go(-1)}></i>
              </div>
              <div className="col-md-4 col-xs-6 col-r-0 col-l-0">
                <img src={require("../../../img/logo-home.png")} className="centered" />
              </div>
              <div className="col-md-4 col-xs-3 col-r-0 col-l-0">
              <Link to="/registration" className="login-btn p-14 sign-up-top-space">Sign Up</Link>
              </div>
            </div>
          </div>

          <div className="team">
            <div className="login-box">
              <h3>Welcome to Rising XI</h3>
              <p>Enter your Email to Start Your Fantasy Journey with Rising XI</p>
              <p>Login with Social</p>
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
                      clientId="52061619987-8v6p9h3g27m0q4so54jcj3jpa32ulqcr.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                      buttonText="LOGIN WITH GOOGLE" className="v-1"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      
                    />
                    </button>
                  </span>
                </div>
              </div>
              <p>Or</p>
              { errorMsg ?
                <div align="center" className="alert alert-danger">{errorMsg}</div>
                : ""
              }
              <form className="form-logup">
                <input required={true} type="text" placeholder="Enter your email" onChange={(e) => { this.setState({ email: e.target.value }); }} />
                {errorMsgemail ? <br /> : ""}
                <span  className="alert-p">{errorMsgemail}</span><br /> <br />
                <input required={true} type="password" placeholder="Enter your password" onChange={(e) => { this.setState({ password: e.target.value }); }} />
                {errorMsgpass ? <br /> : ""}
                <span  className="alert-p">{errorMsgpass}</span><br /> <br />
                <input value="Sign In" type="button" className="change-password-btn" onClick={this.loginHandler} />
                <p className="mg-25" style={{textAlign:"center"}}>If you have <Link to="/forgetpass"  className="red"> Forget Password </Link> click here</p>
              </form>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
export default LoginCard;
