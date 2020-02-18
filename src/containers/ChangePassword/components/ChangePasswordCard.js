
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import { getProfileAPI, ChangePasswordAPI } from '../../App/ApiIntegration';
import {
  Link
} from 'react-router-dom';

class ChangePasswordCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      currentPass: '',
      errorMsgcurrntpass: '',
      errorMsgpass: '',
      errorMsg: '',
      successMsg: '',
      btnStatus: false,
    }
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }
  componentWillMount() {
    getProfileAPI((response) => {
      console.log("profileeeee", response.response.data)
      if (response.response.data['status'] == true) {
        this.setState({
          email: response.response.data.customer_profile.email,
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load profile" });
      }
    });
  }

  ChangePassHandler = () => {
    const { password, currentPass, errorMsgcurrntpass, errorMsgpass } = this.state;
    ChangePasswordAPI({
      current_password: currentPass, new_password: password,
    }, (response) => {
      console.log("updateeeee", response)
      if (response.response.data['error']) {
        this.setState({ errorMsgcurrntpass: response.response.data['error'].current_password, errorMsgpass: response.response.data['error'].new_password, errorMsg: response.response.data['message'] });
      }
      if (response.response.data['status'] == false) {
        this.setState({ errorMsg: response.response.data['message'], errorMsgcurrntpass: "", errorMsgpass: "" });
      }
      if (response.response.data['status'] == true) {
        this.setState({ successMsg: response.response.data['message'], errorMsgcurrntpass: "", errorMsgpass: "", errorMsg: "", btnStatus: true });
      }
    });
  }


  render() {
    const { email, errorMsg, successMsg, errorMsgcurrntpass, errorMsgpass, btnStatus } = this.state;
    return (
      <div className="bg">
        <header>
          <div className="logo-box">
            <div className="row row-0">
              <div className="col-md-4 col-xs-3 col-l-0 col-r-0">
                <i className='fa fa-chevron-left ch' onClick={() => history.go(-1)}></i>
              </div>
              <div className="col-md-4 col-xs-6 col-l-0 col-r-0">
                <h5 className="heading">Change Password</h5>
              </div>
              <div className="col-md-4 col-xs-3 col-l-0 col-r-0">
                <Link to="/profile" className="login-btn p-14 edit-profile-top-space"> Profile</Link>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="login-box p-14 ">
              {errorMsg ?
                <div align="center" className="alert alert-danger">{errorMsg}</div>
                : ""
              }
              {successMsg ?
                <div align="center" className="alert alert-success">{successMsg}</div>
                : ""
              }
              <input type="Email" value={email} disabled={true} />
              <br />
              <input type="Password" placeholder="Enter Current Password" onChange={this.handleChange('currentPass')} />
              <span style={{ color: "red", display: "flow-root", textAlign: "center", fontSize: "12px" }}>{errorMsgcurrntpass}</span><br />
              <input type="Password" placeholder="Enter New Password" onChange={this.handleChange('password')} />
              <span style={{ color: "red", display: "flow-root", textAlign: "center", fontSize: "12px" }}>{errorMsgpass}</span><br />
              <input type="submit" value="Change password" disabled={btnStatus} className="change-password-btn" style={{ textAlign: "center" }} onClick={this.ChangePassHandler} />
              <br /><br />
            </div>
          </div>
        </header>
      </div >
    );
  }
}
export default ChangePasswordCard;
