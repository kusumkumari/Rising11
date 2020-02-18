
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import { ResetPasswordAPI } from '../../App/ApiIntegration';
import {
  Link
} from 'react-router-dom';

class ForgetPassCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      newpass:'',
      confirmpass:'',
      errorMsg:'',
      successMsg:'',
      errorMsgpass:'',
    }
  }
 
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }
  ResetPassHandler = () => {
    const{confirmpass,newpass} =this.state;
    let id=atob(this.props.match.params.id)
    if(confirmpass==newpass){
    ResetPasswordAPI({customerid:id,password:this.state.newpass},(response) => {
      if(response.response.data['error']) {
        this.setState({ errorMsg: response.response.data['message'], errorMsgpass:response.response.data['error'].password});
      }
      if(response.response.data['status'] == false  ) {
        this.setState({ errorMsg: response.response.data['message'],errorMsgpass:""  });
      }
      if(response.response.data['status'] == true){
        this.setState({ successMsg: response.response.data['message'], errorMsgpass:"", errorMsg:""});
        window.location.href="/login"
      }
    });
  }
  else{
    this.setState({ errorMsg:"Password and confirm password does not same",errorMsgpass:""}) 
  }
  }
  render() {
    const { errorMsg,successMsg, errorMsgpass } = this.state;
    return (
      <div className="bg">
        <header>
          <div className="logo-box">
            <div className="row row-0">
              <div className="col-md-3 col-xs-3 col-r-0 col-l-0">
                {/* <Link to="/profile"><i className='fa fa-chevron-left ch'></i></Link> */}
              </div>
              <div className="col-md-5 col-xs-6 col-r-0 col-l-0">
                <h5 className="heading">Change Password</h5>
              </div>
              <div className="col-md-4 col-xs-3 col-r-0 col-l-0">
                <Link to="/login" className="login-btn p-14 sign-up-top-space"> Login</Link>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="login-box p-14 ">
            <div className="forgetpass">Change <br/> Password ?</div>
            <br/><br/>
            { errorMsg ?
              <div align="center" className="alert alert-danger">{errorMsg}</div>
              : ""
            }
            { successMsg ?
              <div align="center" className="alert alert-success">{successMsg}</div>
              : ""
            }
             New Password <br />
              <input type="Password" className="input-box" onChange={this.handleChange('newpass')} />
              {errorMsgpass ? <br /> : ""}
                <span style={{ color: "red",textAlign:"center"}}>{errorMsgpass}</span><br /><br />
              Confirm Password <br />
              <input type="Password" className="input-box" onChange={this.handleChange('confirmpass')} />
              <br /><br />
              <input type="submit" value="Reset password" className="change-password-btn" style={{textAlign:"center"}} onClick={this.ResetPassHandler} />
              <br /><br />
            </div>
          </div>
        </header>
      </div >
    );
  }
}
export default ForgetPassCard;
