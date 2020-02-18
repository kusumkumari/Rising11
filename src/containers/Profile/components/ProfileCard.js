
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import { getProfileAPI, getConfigurationAPI, API_BASE_URL_IMG } from '../../App/ApiIntegration';
import {
  Link
} from 'react-router-dom';
import $ from 'jquery';
class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      email:'',
      address:'',
      states:'',
      name:'',
      lname:'',
      dob:'',
      stateList:[],
      gender:'',
      errorMsg:'',
      successMsg:'',
      profile_pic:'',
    }
  }
 

  componentDidMount(){
    
      getProfileAPI((response) => {
        console.log("gggggggggggggg",response)
        if(response.response.data['status'] == true){
          this.setState({
            username:response.response.data.customer_profile.username,
            name:response.response.data.customer_profile.name,
            states:response.response.data.customer_profile.state,
            dob:response.response.data.customer_profile.date_of_birth,
            email:response.response.data.customer_profile.email,
            gender:response.response.data.customer_profile.gender,
            profile_pic:response.response.data.customer_profile.profile_picture,
           });
        }
        else{
          this.setState({errorMsg:"Unable to load profile"});
        }
      });
      getConfigurationAPI((response) => {
        console.log("llllllllllllll",response)
      if(response.response.data['status'] == true){
        this.setState({
          stateList:response.response.data.configuration_updated_records.state_data,
        });
      }
      else{
        this.setState({errorMsg:"Unable to load State data"});
      }
    }); 
  }
 
  render() {
    const {username, email, name, states, dob, gender, stateList, profile_pic} = this.state;
    let stateArray=[]
    if(stateList.length > 0){
      for(let index=0; index < stateList.length; index++){
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
            <div className="row row-0">
              <div className="col-md-3 col-xs-4 pd-l-0 pd-r-0">
                <i className='fa fa-chevron-left ch' onClick={()=>history.go(-1)}></i>
              </div>
              <div className="col-md-6 col-xs-4 pd-l-0 pd-r-0">
                <h5 className="heading ">PROFILE</h5>
              </div>
              <div className="col-md-3 col-xs-4 pd-l-0 pd-r-0">
                <Link to="/editprofile" className="login-btn p-14 edit-profile-top-space">Edit Profile</Link>
              </div>
            </div>
          
          </div>
          <div className="team">
            <div className="login-box ">
              
              <div className="row">
                <div className="col-md-5">
                <p className="user-edit-profile-name">{username ? username : ""}</p>

                <br />

               
                
                </div>
                <div className="col-md-7">
                <div className="circle" style={{textAlign: "center"}}>
                {profile_pic ?
                  <img className="profile-pic" src={API_BASE_URL_IMG + profile_pic}/>
                  : <i className="fa fa-user fa-5x"></i>
                }
                </div>
                </div>
              </div>
                <form className="account">
                  <div className="flex">
                    <p>Name :</p>
                    <input type="text" value={name ? name : "No Name"} disabled={true} />
                  </div>
                  <div className="flex">
                    <p>Email :</p>
                    <input type="Email" value={email ? email : ""} disabled={true}  />
                  </div>
                  <div className="flex">
                    <p>State :</p>
                    <select name="state" value={states} disabled={true} >
                      <option value="">Select State</option>
                      {stateArray}
                    </select>
                  </div>
                  <div className="flex">
                    <p>Date of Birth :</p>
                    <input type="date" name="dob" value={dob ? dob.slice(0,10) : ""} disabled={true}  />
                  </div>
                  <div className="flex">
                    <p>Gender : </p>
                    <select name="Gender" disabled={true} value={gender}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                
                </form>
                

              
              
                <br />
                
              
           
            <p style={{textAlign:"center"}}>If you want to <Link to="/changepass"> Change Password </Link> click here</p>
            </div>
            </div>
        
        </header>
      </div >
    );
  }
}

export default ProfileCard;
