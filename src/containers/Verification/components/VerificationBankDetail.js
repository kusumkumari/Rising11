
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { API_BASE_URL_IMG, getProfileAPI, getConfigurationAPI, BankDetailAPI, getBankDetailAPI } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

class VerificationBankDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBankVerify: "0",
      bankData: [],
      stateList: [],
      accountHolder: "",
      accountNumber: "",
      ifscCode: "",
      branch: "",
      bankName: "",
      state: "",
      errorAccName: "",
      errorAccNo: "",
      errorbank: "",
      errorbranch: "",
      errorIfscCode: "",
      errorstate: "",
      successMsg: "",
      bankListData:[],
      bankPartialData:[],

    }
  }

  componentWillMount() {
    getProfileAPI((response) => {
      console.log("gggggggggggggg", response)
      if (response.response.data['status'] == true) {
        this.setState({
          isBankVerify: response.response.data.isBankVerify,

        });
      }
    });
    getConfigurationAPI((response) => {
      console.log("0000000", response)
      if (response.response.data['status'] == true) {
        this.setState({
          bankData: response.response.data.configuration_updated_records.bank_data,
          stateList: response.response.data.configuration_updated_records.state_data,

        });
      }
    });
    getBankDetailAPI((response) => {
      console.log("22222222222", response)
      if (response.response.data['status'] == true) {
        this.setState({
          bankListData: response.response.data.bankcarddata[0],
          bankPartialData: response.response.data,

        });
      }
    });
  }

  sendBankDetail = () => {
    const { accountHolder, accountNumber, ifscCode, branch, bankName, state,  } = this.state;
    BankDetailAPI({
      accountholder: accountHolder,
      accountnumber: accountNumber,
      ifsccode: ifscCode,
      bankname: bankName,
      branch: branch,
      state: state
    }, (response) => {
      console.log("bbbbbbbbbbbbb............",response)
      if (response.response.data.status == true) {
        this.setState({
          successMsg: response.response.data.message,
        });
        window.location.href = "/varification_Bank"
      }
      else {
        let errorAccName = response.response.data.error.accountholder;
        let errorAccNo = response.response.data.error.accountnumber;
        let errorIfscCode = response.response.data.error.ifsccode;
        let errorbank = response.response.data.error.bankname;
        let errorbranch = response.response.data.error.branch;
        let errorstate = response.response.data.error.state;
        this.setState({
          errorAccName: errorAccName,
          errorAccNo: errorAccNo, errorIfscCode: errorIfscCode, errorbank: errorbank,
          errorbranch: errorbranch, errorstate: errorstate
        });
      }
    });
  }

  render() {
    const { isBankVerify, bankData, stateList, errorAccName, errorAccNo, errorIfscCode, errorbank, errorbranch, errorstate, bankListData, bankPartialData } = this.state;
    let bankEntry = []
    let stateArray = []
    if (stateList.length > 0) {
      for (let index = 0; index < stateList.length; index++) {
        stateArray.push(<option value={stateList[index].id} key={stateList[index].id}>{stateList[index].state}</option>)
      }
    }
    for (let index = 0; index < bankData.length; index++) {
      const { id, bankname } = bankData[index];
      bankEntry.push(
        <option value={id} key={id}>{bankname}</option>
      )
    }
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
            {isBankVerify == "1" ?
              <Paper style={{margin: "28px 24px 11px 25px"}}>
              <Grid container direction="row" spacing={2} className="mail-id" 
              >
                <Grid item xs={8}>
                <Typography gutterBottom variant="subtitle1" className="flex" style={{color:"#4ca607",lineHeight:"41.5px"}}>
                 <Avatar style={{backgroundColor: "#eae7e7"}} ><i className='fa fa-check-circle'  style={{color:"#4ca607", fontSize:"22px"}}></i></Avatar> &nbsp; Verified
                 </Typography><br/>
 
                  <Typography gutterBottom variant="p" style={{fontSize:"14px"}} >
                  Account Holder  : <b>{bankListData.accountholder}</b>
                   </Typography><br/>
                  <Typography gutterBottom variant="p" style={{fontSize:"14px"}}  >
                  Account No. : <b>{bankListData.accountnumber}</b><br/>
                  </Typography>
                  <Typography gutterBottom variant="p" style={{fontSize:"14px"}}  >
                  IFSC Code : <b>{bankListData.ifsccode}</b>
                  </Typography><br/>
                  <Typography gutterBottom variant="p" style={{fontSize:"14px"}}  >
                  Bank Name : <b>{bankPartialData.name}</b>
                  </Typography><br/>
                  <Typography gutterBottom variant="p" style={{fontSize:"14px"}}  >
                  Branch : <b>{bankListData.branch}</b>
                  </Typography><br/>
                  <Typography gutterBottom variant="p" style={{fontSize:"14px"}}  >
                  State : <b>{bankPartialData.state}</b>
                  </Typography>
 
                </Grid>
                <Grid item xs={4}>
                <img className="img-center" src={API_BASE_URL_IMG +"/media/"+ bankPartialData.image} />
                  </Grid>
              </Grid>
            </Paper>
              // <div className="mail-id">
              //   <div className="row">
              //     <div className="col-md-6 col-sm-6">
              //       <span className="flex">
              //         <h5 className="ft-24 mg-bt greens"><i className='fa fa-check-circle equal-align-ic'></i>&nbsp;Verified</h5>
              //       </span>
              //       <p className="p1s">Account Holder : <b>{bankListData.accountholder}</b></p>
              //       <p className="p1s">Account No. : <b>{bankListData.accountnumber}</b></p>
              //       <p className="p1s">IFSC Code : <b>{bankListData.ifsccode}</b></p>
              //       <p className="p1s">Bank Name : <b>{bankPartialData.name}</b></p>
              //       <p className="p1s">Branch : <b>{bankListData.branch}</b></p>
              //       <p className="p1s">State : <b>{bankPartialData.state}</b></p>
              //     </div>
              //     <div className="col-md-6 col-sm-6">
              //       <img className="img-center" src={API_BASE_URL_IMG +"/media/"+ bankPartialData.image} />
              //     </div>
              //   </div>
              // </div>
              : ""}
            {isBankVerify == "0" ?
              // <div className="mail-id">
              //   <span className="flex">
              //     <h5 className="equal-align-ic ft-24 mg-bt"><i className='fa fa-address-card'></i>&nbsp;Verfiy your Bank Details</h5>
              //   </span>
              //   <p className="p1s verify-bank-p"> Account Holder *</p>
              //   <input type="text" name="name" onChange={(e) => { this.setState({ accountHolder: e.target.value }); }} /><br />
              //   <span style={{ color: "red" }}>{errorAccName}</span><br /><br />
              //   <p className="p1s verify-bank-p">Account No. *</p>
              //   <input type="text" onChange={(e) => { this.setState({ accountNumber: e.target.value }); }} /><br />
              //   <span style={{ color: "red" }}>{errorAccNo}</span><br /><br />
              //   <p className="p1s verify-bank-p">IFSC Code *</p>
              //   <input type="text" onChange={(e) => { this.setState({ ifscCode: e.target.value }); }} /><br />
              //   <span style={{ color: "red" }}>{errorIfscCode}</span><br /><br />
              //   <p className="p1s verify-bank-p">Bank Name *</p>
              //   <select name="bank" onChange={(e) => { this.setState({ bankName: e.target.value }); }} className="enabled select-y" >
              //     <option value="">Select Bank Name</option>
              //     {bankEntry}
              //   </select>
              //   <br /><span style={{ color: "red" }}>{errorbank}</span><br /><br />
              //   <p className="p1s verify-bank-p">Branch *</p>
              //   <input type="text" onChange={(e) => { this.setState({ branch: e.target.value }); }} /><br />
              //   
              //   <p className="p1s verify-bank-p">State *</p>
              //   <select name="state" onChange={(e) => { this.setState({ state: e.target.value }); }} className="enabled select-y" >
              //     <option value="">Select State</option>
              //     {stateArray}
              //   </select>
              //   <span style={{ color: "red" }}>{errorstate}</span><br /><br />
              //   <button className="otp-btn" onClick={this.sendBankDetail}>Submit for Verification</button>
              //   <div className="clearfix">
              //     <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>


              //   </div>
              // </div>
              <Paper style={{margin: "28px 24px 11px 25px"}}>
                <Grid container direction="row" spacing={2} className="mail-id" 
              >
                
                <Typography gutterBottom variant="subtitle1" className="flex" style={{color:"rgb(3, 5, 14)",lineHeight:"41.5px"}}>
                 <Avatar style={{backgroundColor: "#eae7e7"}} ><i className='fa fa-address-card'  style={{color: "#00163f", fontSize:"22px"}}></i></Avatar> &nbsp; Verify Your Bank Details
                 </Typography><br/>
                 </Grid>
              <Grid container direction="row" spacing={2} className="mail-id" 
              >
                
                <Grid item sm={6}>
                
 
                  <Typography gutterBottom variant="p" style={{fontSize:"14px",display:"block"}} >
                   <TextField id="outlined-basic" label="Account Holder" variant="outlined" onChange={(e) => { this.setState({ accountHolder: e.target.value }); }}/>
                   </Typography>
                   <span style={{ color: "red" }}>{errorAccName}</span><br />

                  <Typography gutterBottom variant="p" style={{fontSize:"14px", display:"block"}}  >
                  <TextField id="outlined-basic" label="IFSC Code"  variant="outlined" onChange={(e) => { this.setState({ ifscCode: e.target.value }); }}/>
                  </Typography>
                  <span style={{ color: "red" }}>{errorIfscCode}</span><br />
                  
                  <Typography gutterBottom variant="p" style={{fontSize:"14px", display:"block"}}  >
                  
                  <select name="bank"  onChange={(e) => { this.setState({ bankName: e.target.value }); }} className="th-1 MuiOutlinedInput-input enabled select-y" >
                   <option value="">Select Bank Name</option>
                    {bankEntry}
                   </select>
                  </Typography>
                  <span style={{ color: "red" }}>{errorbank}</span><br />
 
                </Grid>
                <Grid item sm={6}>
                <Typography gutterBottom variant="p" style={{fontSize:"14px", display:"block"}}  >
                  <TextField id="outlined-basic" label="Account No." name="name" variant="outlined" onChange={(e) => { this.setState({ accountNumber: e.target.value }); }}/>
                  </Typography>
                  <span style={{ color: "red" }}>{errorAccNo}</span><br />
                  <Typography gutterBottom variant="p" style={{fontSize:"14px", display:"block"}}  >
                  <select name="state"  onChange={(e) => { this.setState({ state: e.target.value }); }} className="MuiOutlinedInput-input th-1 enabled select-y" >
                 <option value="">Select State</option>
                   {stateArray}
                </select>
              
                </Typography>
                <span style={{ color: "red" }}>{errorstate}</span><br />
                <Typography gutterBottom variant="p" style={{fontSize:"14px", display:"block"}} >
                  <TextField id="outlined-basic" label="Branch Name"  variant="outlined" onChange={(e) => { this.setState({ branch: e.target.value }); }}/>
                  </Typography>
                   <span style={{ color: "red" }}>{errorbranch}</span><br />
                </Grid>
               
              </Grid>
              <Grid container direction="row" spacing={2} className="mail-id" 
              >
              <button className="otp-btn" onClick={this.sendBankDetail}>Submit for Verification</button>
              <br/><br/><br/>
                 </Grid>
            </Paper>

              : ""
            }
            {isBankVerify == "2" ?
              <Paper style={{margin: "28px 24px 11px 25px"}}>
              <Grid container direction="row" spacing={2} className="mail-id" 
              >
                <Grid item xs={8}>
                <Typography gutterBottom variant="subtitle1">Bank verification is under process</Typography>
              </Grid>
              </Grid>
              </Paper>
              : ""
            }
          </div>
          <div className="clearfix">
                 <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>
        </header>
      </div >
    );
  }
}
export default VerificationBankDetail;
