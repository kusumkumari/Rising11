
/* eslint-disable */
import React, { Component } from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import { isLoggedIn, getProfileAPI, sendOtpAPI, OtpVerificationMobAPI } from '../../App/ApiIntegration'
import {
  Link
} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {InlineShareButtons} from 'sharethis-reactjs';


class ContestCodeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <div className="bg">
        <header>

          <div className="logo-box">
            <div className="row">
              <div className="col-md-4 col-xs-3">
              <Link to={"/"}><i className='fa fa-home fa-home1 ch'></i></Link>
              </div>
              <div className="col-md-4 col-xs-6">
                <h5 className="heading">Contest Code</h5>
              </div>
            </div>
          </div>

         
          <div className="team">
         
              <Paper style={{margin: "76px 24px 11px 25px"}}>
                <Grid item xs={12}  container direction="row" spacing={2} className="mail-id" 
                >
                   <Grid item xs={2}></Grid>
                  <Grid item xs={8}>
                  
                    <Typography gutterBottom variant="h2" style={{fontSize:"16px",paddingLeft:"105px"}} >
                      {localStorage.getItem("referalCode")}
                     </Typography>
                    <Typography gutterBottom variant="p" style={{fontSize:"14px",paddingLeft:"16px"}}  >
                    <InlineShareButtons

          config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            color: 'social',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            labels: 'cta',        // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'whatsapp',
              // 'linkedin',
              // 'messenger',
              // 'facebook',
              // 'twitter'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            show_total: true,
            size: 40,             // the size of each button (INTEGER)

            // OPTIONAL PARAMETERS
            url: 'Hey This is my Contest Code Please Use this code and Join with http://rising11.com contest and win prize money '+localStorage.getItem("referalCode"), // (defaults to current url)
            image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
            description: 'Hey Invitation of contest create code enter this code and join contest',       // (defaults to og:description or twitter:description)
            title: ' Hey Invitation of contest create code enter this code and join contest Refferal Code',            // (defaults to og:title or twitter:title)
            message: 'Hey Invitation of contest create code enter this code and join contest',     // (only for email sharing)
            // subject: 'custom email subject',  // (only for email sharing)
            // username: 'custom twitter handle' // (only for twitter sharing)
          }}
        />
                    </Typography>

                  </Grid>
                </Grid>
              </Paper>

                {/* <button className="otp-btn" onClick={this.sendOtp}>Send OTP</button> */}
          </div>
           
        
        </header>
      </div >
    );
  }
}
export default ContestCodeCard;
