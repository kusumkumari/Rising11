import React, { Component } from "react";
import Footer from "../../Layout/Footer";
import ElevatedTabs1 from "./ElevatedTabs";
class Refer extends Component {
  render() {
    return (
      <>
        <ElevatedTabs1 />
        <div className="background-inner-page">
          <div className="text-center centered-h1-sz">
            <h3 className="h1-sz text-upper">Refer and Earn</h3>
          </div>
        </div>

        <div className="container">
          <div className="Content">
            <div className="clearfix">
              <br />
              <br />
              <br />
              <br />
            </div>
            <h3 className="content-h3">How It Works</h3>
            <p>Step-1:- Verify your email &amp; mobile no.<br/>
Step-2:-Refer your Friend Rising11 by unique referral code.<br/>
Step-3:-When Your Friend Register and Verify their email &amp; mobile no. , your
friend will get ₹50 instantly and you will get 10% cash bonus of their contest
joining fess every time (up-to ₹50).<br/>
Step-4: Refer maximum friends to earn maximum cash bonus.</p>
        <p><b>***If any user will found to miss-use of cash bonus by creating multiple accounts
&amp; verify them by fake documents then it will be considered under fair-play
violation.
<br/>
*Please refer Terms &amp; Conditions (Refer &amp; Earn) and Fair-Play Violation.</b></p>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}
export default Refer;
