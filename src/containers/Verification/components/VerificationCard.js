
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { isLoggedIn, getProfileAPI, sendOtpAPI, OtpVerificationMobAPI } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

class VerificationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      mobile: '',
      isEmailVerify: false,
      isMobileVerify: false,
      successMsg: "",
      open: false,
      otp: '',
      otpError: '',
      otpSuccess: '',

    }
  }

  componentWillMount() {
    getProfileAPI((response) => {
      console.log("jjjjjjjjjjjjj", response)
      if (response.response.data['status'] == true) {
        this.setState({
          id: response.response.data.customer_profile.id,
          email: response.response.data.customer_profile.email,
          mobile: response.response.data.customer_profile.mobile,
          isEmailVerify: response.response.data.isEmailVerify,
          isMobileVerify: response.response.data.isMobileVerify,
        });
      }
    });
  }

  sendOtp = () => {
    const { mobile, id } = this.state;
    sendOtpAPI(mobile, id, (response) => {
      console.log("rrrrrrrrrrrrrr", response)
      if (response.response.data['status'] == true) {
        this.setState({
          successMsg: response.response.data.message,
          open: true,
        });
      }
      else {
        let errorMsg = ''
        if (response.response.data.error) {
          errorMsg = response.response.data.error.mobile;
        }
        else {
          errorMsg = response.response.data.message;
        }
        this.setState({ errorMsg: errorMsg });
      }
    });
  }

  otpHandler = () => {
    const { id, otp } = this.state;
    const { showLoader, hideLoader } = this.props;
    showLoader(() => {
      let custid = String(id)
      OtpVerificationMobAPI(otp, custid, (response) => {
        console.log("uuuuuuuuuuuuuuuu", response)
        if (response.response.data.status == false) {
          const otpError = response.response.data.message;
          this.setState({ otpError: otpError, successMsg: "" });
        }
        if (response.response.data.status == true) {
          const otpSuccess = response.response.data["message"];
          this.setState({ otpSuccess: otpSuccess, otpError: "", successMsg: "" });
          window.location.href = '/varification';
        }
      });
    });

  }

  render() {
    const { email, mobile, isEmailVerify, isMobileVerify, successMsg, open, errorMsg, otpError, otpSuccess } = this.state;
    return (
      <div className="bg">
        <header>

          <div className="logo-box">
            <div className="row">
              <div className="col-md-4 col-xs-3">
                <i className='fa fa-chevron-left ch' onClick={() => history.go(-1)}></i>
              </div>
              <div className="col-md-4 col-xs-6">
                <h5 className="heading">Verify Account</h5>
              </div>
            </div>
          </div>

          <div className="verification-box">

            <div className="verify">
              <Link to="/varification">Mobile & Email</Link>
            </div>

            <div className="verify">
              <Link to="/varification_panCard">PAN Card</Link>
            </div>

            <div className="verify">
              <Link to="/varification_Bank">Bank</Link>
            </div>

          </div>

          <div className="team">
            {isEmailVerify ?
              <Paper style={{margin: "28px 24px 11px 25px"}}>
                <Grid item xs={12}  container direction="column" spacing={2} className="mail-id" 
                >
                  <Grid item xs={10}>
                    <Typography gutterBottom variant="subtitle1" className="flex" style={{color:"#4ca607",lineHeight:"41.5px"}}>
                      <Avatar style={{backgroundColor: "#eae7e7"}}><i class="material-icons equal-align-ic" style={{color:"#4ca607"}}  >mail</i></Avatar> &nbsp; Verfied your Email
                    </Typography><br />

                    <Typography gutterBottom variant="p" style={{fontSize:"14px",paddingLeft:"16px"}} >
                      <i className="fa fa-check-circle" style={{ color: "#4ca607", }}></i>  Your Email is verified
                     </Typography><br/>
                    <Typography gutterBottom variant="p" style={{fontSize:"14px",paddingLeft:"16px"}}  >
                      Email -  {email}
                    </Typography>

                  </Grid>
                </Grid>
              </Paper>

              :
              <div className="mail-id">
                <span className="flex">
                  <i class="material-icons equal-align-ic">phone_android</i>
                  <h6>Verfiy your Mobile No.</h6>
                </span>
                <br/>
                <p className="p1s">Email Id </p>
                <input type="text" name="mobile" style={{borderBottom:"1px solid #cc"}} />
                <p className="notify">We will send you a 4 digit OTP for verification.</p>
                <button className="otp-btn">Send OTP</button>
              </div>
            }
            {isMobileVerify ?
             <Paper style={{margin: "28px 24px 11px 25px"}}>
             <Grid  item xs={12}  container direction="column" spacing={2} className="mail-id" 
             >
               <Grid item xs={10}>
                 <Typography gutterBottom variant="subtitle1" className="flex" style={{color:"#4ca607",lineHeight:"41.5px"}}>
                 <Avatar style={{backgroundColor: "#eae7e7"}} ><i class="material-icons equal-align-ic" style={{color:"#4ca607"}} >phone_android</i></Avatar> &nbsp; Verfied your Mobile No.
                 </Typography><br/>

                 <Typography gutterBottom variant="p" style={{fontSize:"14px",paddingLeft:"16px"}} >
                   <i className="fa fa-check-circle" style={{ color: "#4ca607", }}></i>  Your Mobile Number is verified.
                  </Typography><br/>
                 <Typography gutterBottom variant="p" style={{fontSize:"14px",paddingLeft:"16px"}}  >
                 Mobile No. -  {mobile}
                 </Typography>

               </Grid>
             </Grid>
           </Paper>
             
              :
              <div className="mail-id">
                <span className="flex">
                  <i class="material-icons equal-align-ic">phone_android</i>
                  <h6>Verfiy your Mobile No.</h6>
                </span><br />

                <div>
                  <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title" style={{ textAlign: "center", fontSize: "1.65rem" }}>{"OTP Verification"}</DialogTitle>
                    <DialogContent>
                      {otpError ?
                        <div align="center" className="alert alert-danger">{otpError}</div>
                        :
                        <div align="center" className="alert alert-success">{successMsg}</div>
                      }
                      {
                        otpSuccess ?
                          <div align="center" className="alert alert-success">{otpSuccess}</div>
                          : ""
                      }
                      <DialogContentText id="alert-dialog-description" style={{ textAlign: "center" }}>
                        <input type="text" className="form-logup" onChange={(e) => { this.setState({ otp: e.target.value }); }} style={{ width: "250px" }} />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      {/* <button onClick={this.resendOtpHandler} className="login-btn">
                          Resend
                         </button> */}
                      <button onClick={this.otpHandler} className="login-btn">
                        Verification
                         </button>
                    </DialogActions>
                  </Dialog>
                </div>

                <TextField id="outlined-basic"  value={mobile} label="MObile No*" variant="outlined" onChange={(e) => { this.setState({ mobile: e.target.value }); }} name="mobile" />
                <br /><span style={{ color: 'red' }}>{errorMsg}</span>
                <p className="notify">We will send you a 4 digit OTP for verification.</p>
                <button className="otp-btn" onClick={this.sendOtp}>Send OTP</button>
              </div>
            }
          </div>
        </header>
      </div >
    );
  }
}
export default VerificationCard;
