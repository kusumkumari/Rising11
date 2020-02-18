
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import { ForgetPasswordAPI } from '../../App/ApiIntegration';
import {
  Link
} from 'react-router-dom';

class ForgetPasswordCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      errorMsg:'',
      successMsg:'',
      errorMsgemail:'',
      btnStatus:false,
    }
  }
 
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }
  forgetPassHandler = () => {
    const {email, errorMsg } = this.state;
      ForgetPasswordAPI({email:email},(response) => {
        console.log("eeeeeeeeeeeee",response)
        if(response.response.data['error']) {
          this.setState({ errorMsg: response.response.data['message'], errorMsgemail:response.response.data['error'].email, btnStatus:false});
        }
        if(response.response.data['status'] == false  ) {
          this.setState({ errorMsg: response.response.data['message'],errorMsgemail:"", btnStatus:false });
        }
        if(response.response.data['status'] == true){
          this.setState({ successMsg: response.response.data['message'], errorMsgemail:"", errorMsg:"", btnStatus:true});
        }
      });
  }
  render() {
    const { email, errorMsg,successMsg, errorMsgemail, btnStatus } = this.state;
    return (
      <div className="bg">
        <header>
          <div className="logo-box">
            <div className="row row-0">
              <div className="col-md-2 col-xs-2 col-r-0 col-l-0">
                <Link to="/login"><i className='fa fa-chevron-left ch'></i></Link>
              </div>
              <div className="col-md-8 col-xs-8 col-r-0 col-l-0">
                <h5 className="heading">Forget Password </h5>
              </div>
              <div className="col-md-2 col-xs-2 col-r-0 col-l-0">
                <Link to="/login" className="login-btn p-14 edit-profile-top-space"> Login</Link>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="login-box p-14 ">
            <div className="forgetpass">Forgot <br/> Password ?</div>
            <br/><br/>
              Email <br />
              { errorMsg ?
              <div align="center" className="alert alert-danger">{errorMsg}</div>
              : ""
            }
            { successMsg ?
              <div align="center" className="alert alert-success">{successMsg}</div>
              : ""
            }
              <input type="Email" className="input-box" onChange={this.handleChange('email')} />
              {errorMsgemail ? <br /> : ""}
                <div className="alert-p" style={{textAlign:"center"}}>{errorMsgemail}</div><br /><br />
              <input type="submit" value="Submit" disabled={btnStatus} className="change-password-btn" style={{textAlign:"center"}} onClick={this.forgetPassHandler} />
              <br /><br />
            </div>
          </div>
        </header>
      </div >
    );
  }
}
export default ForgetPasswordCard;
