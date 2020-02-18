
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { isLoggedIn, getProfileAPI, PenDetailAPI, getPenDetailAPI } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";


class VerificationPanCardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanVerify: "0",
      panNumber: "",
      panName: "",
      successMsg: "",
      errorPanName: "",
      errorPanNumber: "",
      errorDob: "",
      penData: [],
      dob:new Date(),
    }
  }

  componentWillMount() {
    getProfileAPI((response) => {
      if (response.response.data['status'] == true) {
        this.setState({
          isPanVerify: response.response.data.isPanVerify,

        });
      }
    });

    getPenDetailAPI((response) => {
      console.log("kkkkkkkkkkkkk",response)
      if (response.response.data['status'] == true) {
        this.setState({
          penData: response.response.data.pancarddata,

        });
      }
    });
  }

  sendPenDetail = () => {
    const { panName, panNumber, dob } = this.state;
    let dobFormat = ""
    console.log(typeof(dob), dob)
    if (dob) {
      dobFormat = dob
    }
    PenDetailAPI({ name: panName, pannumber: panNumber, dateofbirth: dobFormat }, (response) => {
      console.log("aaaaaaaaaaaaa",response)
      if (response.response.data.status == true) {
        this.setState({
          successMsg: response.response.data.message,
        });
        window.location.href = "/varification_panCard";
      }
      if (response.response.data.error) {
        let errorPanName = response.response.data.error.name;
        let errorPanNumber = response.response.data.error.pannumber;
        let errorDob = response.response.data.error.dateofbirth;
        this.setState({
          errorPanName: errorPanName,
          errorPanNumber: errorPanNumber, errorDob: errorDob
        });
      }
    });
  }

  render() {
    const { isPanVerify, errorMsg, errorPanName, errorPanNumber, errorDob, successMsg, penData } = this.state;
    console.log("pppppppppppppppppppppppp",isPanVerify)
    return (
      <div className="bg">
        <header>

          <div className="logo-box">
            <div className="row">
              <div className="col-md-4 col-xs-3">
                <i className='fa fa-chevron-left ch' onClick={()=>history.go(-1)}></i>
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
            {isPanVerify == "1" ?
             <Paper style={{margin: "28px 24px 11px 25px"}}>
             <Grid container direction="row" spacing={2} className="mail-id" 
             >
               <Grid item xs={8}>
                 <Typography gutterBottom variant="subtitle1" className="flex" style={{color:"#4ca607",lineHeight:"41.5px"}}>
                 <Avatar style={{backgroundColor: "#eae7e7"}} ><i className='fa fa-check-circle'  style={{color:"#4ca607", fontSize:"22px"}}></i></Avatar> &nbsp; Verified
                 </Typography><br/>

                 <Typography gutterBottom variant="p" style={{fontSize:"14px"}} >
                 Name  : <b>{penData.name}</b>
                  </Typography><br/>
                 <Typography gutterBottom variant="p" style={{fontSize:"14px"}}  >
                 PAN Number : <b>{penData.pannumber}</b><br/>
                 </Typography>
                 <Typography gutterBottom variant="p" style={{fontSize:"14px"}}  >
                 Date Of Birth : <b>{penData.dateofbirth}</b>
                 </Typography>

               </Grid>
               <Grid item xs={4}>
               <img src={require("../../../img/pan-card.jpg")} />
                 </Grid>
             </Grid>
           </Paper>
              // <div className="mail-id">
              //   <div className="row">
              //     <div className="col-md-6 col-xs-6">
              //       <span className="flex">
              //         <h3 className="green ft-24 mg-bt"><i className='fa fa-check-circle'></i>&nbsp;Verified</h3>
              //       </span>
              //       <p className="p1s">Name : <b>{penData.name}</b></p>
              //       <p className="p1s">PAN Number : <b>{penData.pannumber}</b></p>
              //       <p className="p1s">Date Of Birth : <b>{penData.dateofbirth}</b></p>
              //     </div>
              //     <div className="col-md-6 col-xs-6">
              //       <img src={require("../../../img/pan-card.jpg")} />
              //     </div>
              //   </div>
              // </div>
              : ""}
            {isPanVerify == "0" ?
             <Paper style={{margin: "28px 24px 11px 25px"}}>
             <Grid container direction="row" spacing={2} className="mail-id" 
           >
             
             <Typography gutterBottom variant="subtitle1" className="flex" style={{color:"rgb(3, 5, 14)",lineHeight:"41.5px"}}>
              <Avatar style={{backgroundColor: "#eae7e7"}} ><i className='fa fa-address-card'  style={{color: "#00163f", fontSize:"22px"}}></i></Avatar> &nbsp; Verfiy your Pan Details
              </Typography><br/>
              </Grid>
           <Grid container direction="row" spacing={2} className="mail-id" >
             {/* <Grid item sm={2}></Grid> */}
             <Grid item sm={12}>
             

               <Typography gutterBottom variant="p" style={{fontSize:"14px",display:"block"}} >
                <TextField id="outlined-basic" label="Name*" variant="outlined" onChange={(e) => { this.setState({ panName: e.target.value }); }}/>
                </Typography>
                <span style={{ color: "red" }}>{errorPanName}</span><br /><br />

               <Typography gutterBottom variant="p" style={{fontSize:"14px", display:"block"}}  >
               <TextField id="outlined-basic" label="PAN Number*" variant="outlined"  onChange={(e) => { this.setState({ panNumber: e.target.value }); }} />
               </Typography>
               <span style={{ color: "red" }}>{errorPanNumber}</span><br /><br />
               
               <Typography gutterBottom variant="p" style={{fontSize:"14px", display:"block"}}  >
               <DatePicker
               label="Date picker dialog"
               id="outlined-basic"
               variant="outlined"
               format="dd/MM/yyyy"
        selected={this.state.dob}
        onChange={(e) => { this.setState({ dob: e }); }}
        style={{borderBottom:"0px"}}
      />
             
               {/* <TextField id="outlined-basic" label="Date Of Birth*" variant="outlined" onChange={(e) => { this.setState({ dob: e.target.value }); }} /> */}

               </Typography>
               <span style={{ color: "red" }}>{errorDob}</span><br />

             </Grid>
           
           </Grid>
           <Grid container direction="row" spacing={2} className="mail-id" 
           >
           <button className="otp-btn" onClick={this.sendPenDetail}>Submit for Verification</button>
           <br/><br/><br/>
              </Grid>
         </Paper>

              // <div className="mail-id">scs
              //   <span className="flex">
              //     <h5><i className='fa fa-address-card equal-align-ic'></i>&nbsp;Verfiy your Pan Details</h5>
              //   </span><br />
              //   <span style={{ color: "red" }}>{errorMsg}</span><br />
              //   <p className="p1s">Name*</p>
              //   <input type="text" name="name" onChange={(e) => { this.setState({ panName: e.target.value }); }} /><br />
              //   <span style={{ color: "red" }}>{errorPanName}</span><br />
              //   <p className="p1s">PAN Number*</p>
              //   <input type="text" onChange={(e) => { this.setState({ panNumber: e.target.value }); }} /><br />
              //   <span style={{ color: "red" }}>{errorPanNumber}</span><br />
              //   <p className="p1s">Date Of Birth*</p>
              //   <input type="date" name="name" onChange={(e) => { this.setState({ dob: e.target.value }); }} />
              //   <span style={{ color: "red" }}>{errorDob}</span><br /><br />
              //   <button className="otp-btn" onClick={this.sendPenDetail}>Submit for Verification</button>
              // </div>
              : ""
            }
            {isPanVerify == "2" ?
            <Paper style={{margin: "28px 24px 11px 25px"}}>
            <Grid container direction="row" spacing={2} className="mail-id" 
            >
              <Grid item xs={8}>
              <Typography gutterBottom variant="subtitle1">Pan Card verification is under process</Typography>
            </Grid>
            </Grid>
            </Paper>
            
              : ""
            }
          </div>
        </header>
      </div >
    );
  }
}
export default VerificationPanCardDetail;
