
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import {transactionListAPI } from '../../App/ApiIntegration'

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
    }
  }

  componentDidMount() {
    transactionListAPI((response) => {
      console.log("jjjjjjjjjjjjj",response)
      if (response.response.data.success == true) {
        this.setState({
          data: response.response.data.data,
        });
      }
    });

  }


  render() {
    const {data}=this.state;
    return (
      <div className="bg">
          
        <header>
          <div className="logo-box">
            <div className="row">
              <div className="col-md-4 col-xs-3">
              <i className='fa fa-chevron-left ch' onClick={()=>history.go(-1)}></i>
              </div>
              <div className="col-md-4 col-xs-6">
                <h5 className="heading">My Transaction</h5>
              </div>
              <div className="col-md-4 col-xs-3">
                {/* <a href="login.html" className="login-btn">Login</a */}
              </div>
            </div>
          </div>
        
          <div className="team white">
          <div className="rankContainer_a598a">
             <div>
               <span className="pit">Wallet Type</span>
               <br/>
             </div>
             <div>
             <span className="pit">Dr.</span>
               <br/>
             </div>
             <div>
               <br/>
               <span className="pit">Cr.</span>
             </div>
           </div>
          {data.map((datas,idx)=>(
            
              <div className="rankContainer_a598a">
                <div>
                  <span className="rankText_6681c ft-18">{datas.wallet_type}</span>
                  <br/>
                  <span className="pit">{datas.trans_date}</span>
                </div>
                <div>
                  <span class="rankText_6681c ft-18">₹{datas.debit_wallet} </span>
                  <br/>
                </div>
                <div>
                  <br/>
                  <span className="rankText_6681c ft-18">₹{datas.credit_wallet}</span>
                </div>
              </div>
             ))}
             </div>
      </header>
    
      </div >
        );
      }
    }
    export default Transaction;
