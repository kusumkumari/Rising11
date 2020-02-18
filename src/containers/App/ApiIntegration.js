/* eslint-disable */
import axios from 'axios';

let API_BASE_URL


API_BASE_URL = 'http://rising11-admin.com:1111/api';
// // API_BASE_URL = 'http://192.168.0.112:1234/api';
// export let API_BASE_URL_IMG = 'http://192.168.0.103:1234';
export let API_BASE_URL_IMG = 'http://rising11-admin.com:1111';
export const isLoggedIn = () => localStorage.getItem("token");
// export const playerCount = () => localStorage.getItem("playerCount")
function handlerError(error, callback) {
  if (error.response.status == 401) {
    localStorage.removeItem("token");
    location.href = "/";
  } else {
    callback({
      status: 'error',
      response: error,
    });
  }
}
// localStorage.setItem("credits",100);
// localStorage.setItem("playerCount",0);

export const loginAPI = (username, password, callback) => {
  let url = `${API_BASE_URL}/customer/signin/apiview/`;
  axios.post(url, {
    username: username, password: password
  }).then(response => {
    if(response.data["success"]==true){
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("is_profile", response.data.is_profile);
      localStorage.setItem("is_verified", response.data.is_verified);
      localStorage.setItem("referalCode", response.data.referCode);
    }
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const logoutAPI = (callback) => {
  let url = `${API_BASE_URL}/customer/signout/apiview/`;
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    console.log("ggggggggggggg",response)
    localStorage.removeItem("token");
    localStorage.removeItem("is_profile");
    localStorage.removeItem("is_verified");


    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const RegistrationAPI =  (email, mobile, password, referalCode, callback) => {
  let url = `${API_BASE_URL}/customer/signup/apiview/`;
  axios.post(url, {
    email: email, mobile: mobile, password: password, refercode:referalCode
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const OtpVerificationAPI =  (otp, custid, callback) => {
  let url = `${API_BASE_URL}/customer/OtpVerification/apiview/`;
  axios.post(url, {
    customer_id: custid, email_OTP: otp
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const OtpVerificationMobAPI =  (otp, custid, callback) => {
  let url = `${API_BASE_URL}/customer/OtpVerificationmobile/apiview/`;
  axios.post(url, {
    customer_id: custid, mobile_OTP: otp
  },{
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getProfileAPI = (callback) => {
  let url = `${API_BASE_URL}/customer/profileupdate/apiview/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const updateProfileAPI = (data, callback) => {
  let url = `${API_BASE_URL}/customer/profileupdate/apiview/`;
  axios.post(url, data, {
    headers: { Authorization: "Token " + localStorage.getItem("token"),
    // 'content-type': 'multipart/form-data' 
  }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getConfigurationAPI = (callback) => {
  let url = `${API_BASE_URL}/configuration/updated/records/`;
  axios.post(url, {
    last_sync_datetime : "2018-04-25T10:06:50.120917" },
    ).then(response => {
      localStorage.setItem("sessionKey", response.data.session_key);
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const ChangePasswordAPI = (data,callback) => {
  let url = `${API_BASE_URL}/customer/change/password/`;
  axios.post(url, data, {
      headers: { Authorization: "Token " + localStorage.getItem("token") }
    }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const ForgetPasswordAPI = (email,callback) => {
  let url = `${API_BASE_URL}/customer/forgot/password/`;
  axios.post(url, email).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const ResetPasswordAPI = (data,callback) => {
  let url = `${API_BASE_URL}/customer/forgot/password/change/`;
  axios.post(url, data).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const updateProfileImageAPI = (img, callback) => {
  let url = `${API_BASE_URL}/customer/imageupdate/apiview/`;
  const formData = new FormData();
  formData.append('profile_picture',img);
  axios.post(url, formData, {
    headers: { Authorization: "Token " + localStorage.getItem("token"),
    'Content-Type': 'multipart/form-data' 
  }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const ResendOtpVerificationAPI =  (custid, callback) => {
  let url = `${API_BASE_URL}/customer/resend/otp/`;
  axios.post(url, {
    customer_id: custid
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const socialAuthAPI = (email, uid, loginType, callback) => {
  let url = `${API_BASE_URL}/customer/signup/social/apiview/`;
  axios.post(url, {
  social_media_id: uid,
  email: email,
  login_type: loginType,
}).then(response => {
      if(response.data.success==true){
        localStorage.setItem("token", response.data.token);
      }
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getMatchesAPI = (payload,callback) => {
  let url = `${API_BASE_URL}/player/matchdetail/`;
  axios.post(url, payload,).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getPlayersAPI = (cId, matchId, roleType, callback) => {
  let url = `${API_BASE_URL}/player/matchprofiles/`;
  axios.post(url, 
    {
    match_id:matchId,
    cid:cId,
    type:roleType
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const sendOtpAPI = (mobile, id, callback) => {
  let url = `${API_BASE_URL}/customer/Otpmobile/apiview/`;
  axios.post(url, 
    {
      customer_id:id,
      mobile:mobile
  },{
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const PenDetailAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/customer/pan/apiview/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const getPenDetailAPI = (callback) => {
  let url = `${API_BASE_URL}/customer/pancard/verify/`;
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const BankDetailAPI = (payload,callback) => {
  let url = `${API_BASE_URL}/customer/bank/apiview/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getBankDetailAPI = (callback) => {
  let url = `${API_BASE_URL}/customer/bank/verify/`;
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const PayerSelectionAPI = (payload,callback) => {
  let url = `${API_BASE_URL}/player/match/config/`;
  axios.post(url, payload).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const selectedPlayerAPI = (payload,callback) => {
  let url = `${API_BASE_URL}/player/retrieve/config/`;
  axios.post(url, payload).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const playerStatesAPI = (payload,callback) => {
  let url = `${API_BASE_URL}/player/point/config/`;
  axios.post(url, payload).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const selectCaptiansAPI =(payload,callback)=>{
  let url = `${API_BASE_URL}/player/captain/config/`;
  axios.post(url, payload).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const retriveCaptiansAPI =(payload,callback)=>{
  let url = `${API_BASE_URL}/player/retrieve/captain/config/`;
  axios.post(url, payload).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const savePlayerDataAPI =(payload,callback)=>{
  let url = `${API_BASE_URL}/player/save/playerdata/`;
  axios.post(url, payload).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listContestAPI =(payload,callback)=>{
  let url = `${API_BASE_URL}/context/list/contextdata/`;
  axios.post(url, payload).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const createContestAPI=(myCookie,matchid,cid,contestSize,prize,contestName,callback)=>{
  let url = `${API_BASE_URL}/context/customer/createcontext/`;
    axios.post(url, {cookie_id:myCookie,match_id:matchid,cid:cid,contest_size:contestSize,total_prize:prize,contest_name:contestName}, {
      headers: { Authorization: "Token " + localStorage.getItem("token") }
    }).then(response => {
       callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const contestPrizeBreakupAPI=(payload,callback)=>{
  let url = `${API_BASE_URL}/context/customer/breakup/`;
  axios.post(url,payload).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const prizebreakupsAPI=(payload,callback)=>{
  let url = `${API_BASE_URL}/context/customer/subbreakup/`;
  axios.post(url,payload).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const listMyTeamAPI=(payload,callback)=>{
  let url = `${API_BASE_URL}/context/list/myteam/`;
  axios.post(url,payload).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listwalletAPI=(callback)=>{
  let url = `${API_BASE_URL}/wallet/customer/apiview/`;
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const checkAmountValidityAPI=(payload,callback)=>{
  let url = `${API_BASE_URL}/wallet/entryfee/apiview/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const joinContestAPI=(payload,callback)=>{
  let url = `${API_BASE_URL}/wallet/apiview/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const listJoinedContestAPI=(callback)=>{
  let url = `${API_BASE_URL}/context/customer/joincontest/`;
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const paymentConfigAPI=(callback)=>{
  let url = `${API_BASE_URL}/payment/config/`;
  axios.get(url,{
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const createPaymentAPI=(payload,callback)=>{
  let url = `${API_BASE_URL}/payment/ordercreate/`;
  axios.post(url, payload,{
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const walletProcessAPI=(payload,callback)=>{
  let url = `${API_BASE_URL}/payment/walletProcess/`;
  axios.post(url, payload,{
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getMymatchesAPI=(payload,callback)=>{
  let url = `${API_BASE_URL}/player/mymatch/`;
  axios.post(url, payload,{
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getContestDetailAPI=(payload,callback)=>{
  let url = `${API_BASE_URL}/context/list/contextdetail/`;
  axios.post(url, payload,{
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getMatchFormatAPI=(callback)=>{
  let url = `${API_BASE_URL}/point/config/`;
  axios.post(url,{},{
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getActionFieldsAPI=(payload,callback)=>{
  let url = `${API_BASE_URL}/point/detail/`;
  axios.post(url,payload,{
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const transactionListAPI=(callback)=>{
  let url = `${API_BASE_URL}/customer/history/transaction/`;
  axios.get(url,{
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const CreateContestUserAPI=(payload,callback)=>{
  let url = `${API_BASE_URL}/context/customer/savecontest/`;
  axios.post(url,payload,{
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

