
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import { getProfileAPI, getConfigurationAPI, updateProfileAPI, updateProfileImageAPI, API_BASE_URL_IMG } from '../../App/ApiIntegration';
import {
  Link
} from 'react-router-dom';
import $ from 'jquery';

class EditProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      address: '',
      states: '',
      name: '',
      lname: '',
      dob: '',
      stateList: [],
      file: null,
      gender: '',
      errorMsg: '',
      successMsg: '',
      btnStatus: true,
      profile_pic: '',
      errorMsgFname:'',
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }
  handleChangeImage = e => {
    this.readURL(e);
    let file = e.target.files[0]
    updateProfileImageAPI(file,(response) => {
      console.log("image upateeeeeeee", response)
      if (response.response.data['credential'] == false) {
        const errorMsg = response.response.data["message"];
        this.setState({ errorMsg: errorMsg });
      }
      if (response.response.data['error']) {
        const errorMsgemail = response.response.data["error"].username;
        const errorMsgpass = response.response.data["error"].password;
        this.setState({ errorMsgemail: errorMsgemail, errorMsgpass: errorMsgpass });
      }
      if (response.response.data['status'] == true) {
        alert("your profile has been updated");
        window.location.href = "/profile"
      }
    });
  }
  componentWillMount() {
    getProfileAPI((response) => {
      console.log("profileeeee", response.response.data)
      if (response.response.data['status'] == true) {
        if (response.response.data.customer_profile.username == "") {
          this.setState({ btnStatus: false })
        }
        this.setState({
          username: response.response.data.customer_profile.username,
          name: response.response.data.customer_profile.name,
          states: response.response.data.customer_profile.state,
          dob: response.response.data.customer_profile.date_of_birth,
          email: response.response.data.customer_profile.email,
          gender: response.response.data.customer_profile.gender,
          profile_pic: response.response.data.customer_profile.profile_picture,
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load profile" });
      }
    });
    getConfigurationAPI((response) => {
      if (response.response.data['status'] == true) {
        this.setState({
          stateList: response.response.data.configuration_updated_records.state_data,
        });
      }
      else {
        this.setState({ errorMsg: "Unable to load State data" });
      }
    });
  }

  UpdateHandler = () => {
    const { username, name, states, dob, gender, address, lname, errorMsg } = this.state;
    let dobFormat=""
    if(dob){
    dobFormat = dob.slice(0, 10)
    }
    else{
     dobFormat = dob
    }
    updateProfileAPI({
      username: username, address: address, state: states, fname: name, lname: lname, date_of_birth: dobFormat, gender: gender,
    }, (response) => {
      console.log("upateeeeeeee", response)
      if (response.response.data['credential'] == false) {
        const errorMsg = response.response.data["message"];
        this.setState({ errorMsg: errorMsg });
      }
      if (response.response.data['error']) {
        let errorMsg = response.response.data["error"].username;
        let errorMsgFname = response.response.data["error"].fname;
        this.setState({ errorMsg: errorMsg, errorMsgFname:errorMsgFname });
      }
      if (response.response.data['status'] == true) {
        console.log("...................",response)
        localStorage.setItem("is_profile",response.response.data.is_profile)
        alert("your profile has been updated");
        window.location.href = "/profile"
      }
    });
  }

   readURL = function (e) {
    console.log("rrrrrrrrrr",e.target.files[0])
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        console.log("eeeeeeeeeeee",e.target.result)

        $('.profile-pic').attr('src', e.target.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  imgClick=()=>{
    $(".file-upload").click();
  }

  render() {
    
    const { username, email, name, states, dob, gender, stateList, btnStatus, profile_pic, errorMsg, errorMsgFname } = this.state;
    console.log("errormsg",errorMsg)
    let stateArray = []
    if (stateList.length > 0) {
      for (let index = 0; index < stateList.length; index++) {
        stateArray.push(<option value={stateList[index].id} key={stateList[index].id}>{stateList[index].state}</option>)
      }
    }
 
    return (
      <div className="bg">
        <header>
          <div className="logo-box">
          <marquee className="alert-red">
              This is a Beta Version of Rising11
            </marquee>
            <div className="row">
              <div className="col-md-3 col-xs-4">
                <i className='fa fa-chevron-left ch' onClick={()=>history.go(-1)}></i>
              </div>
              <div className="col-md-6 col-xs-4">
                <h5 className="heading">EDIT PROFILE</h5>
              </div>
              <div className="col-md-3 col-xs-4">
                <Link to="/profile" className="login-btn p-14 edit-profile-top-space"> Profile</Link>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="login-box p-14 ">
              <div className="centered-1">
              <div className="circle" style={{ textAlign: "center" }}>
                {/* <img class="profile-pic" src="http://cdn.cutestpaw.com/wp-content/uploads/2012/07/l-Wittle-puppy-yawning.jpg"/> */}
                {profile_pic ?
                  <img className="profile-pic" src={API_BASE_URL_IMG + profile_pic} />
                  : <i className="fa fa-user fa-5x"></i>
                }
              </div>
              <div className="p-image">
                <i className="fa fa-camera upload-button camera-icon" onClick={this.imgClick}></i>
                <input className="file-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={this.handleChangeImage} />
              </div>
              </div>
               <br />

               <div className="account">
               <div className="flex">
              <p>Username  :</p>
              <input type="text" value={username ? username : ""} onChange={this.handleChange('username')} disabled={btnStatus} />
              <span  style={{ color: "red" }}>{errorMsg}</span>
              </div>
              <div className="flex">
              <p>Name : </p>
              <input type="text" value={name ? name : ""} onChange={this.handleChange('name')} />
              <span  style={{ color: "red" }}>{errorMsgFname}</span> 
              </div>
              <div className="flex">
                <p>Email  :</p>
                <input type="Email" value={email ? email : ""} disabled={true} />
              </div>
              <div className="flex">
                <p>State :</p>
                <select name="state" className="enabled"  value={states ? states : ""} onChange={this.handleChange('states')} >
                  <option value="">Select State</option>
                  {stateArray}
                </select>
              </div>
              <div className="flex">
             <p> Date of Birth : </p>
              <input type="date" className="enabled" name="dob" value={dob ? dob.slice(0, 10) : ""} onChange={this.handleChange('dob')} />
              </div>
              <div className="flex">
              <p>Gender : </p>
              <select name="Gender" className="enabled" value={gender} onChange={this.handleChange('gender')}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              </div>
              </div>
              <br /><br />
              <input type="submit" value="Update" className="change-password-btn" style={{ textAlign: "center" }} onClick={this.UpdateHandler} />
              <br />
              <p className="mg-25" style={{ textAlign: "center" }}>If you want to <Link to="/changepass"> Change Password </Link>click here</p>
            </div>
          </div>
        </header>
      </div >
    );
  }
}


export default EditProfileCard;
