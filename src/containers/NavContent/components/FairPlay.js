import React, { Component } from "react";
import Footer from "../../Layout/Footer";
import ElevatedTabs1 from "./ElevatedTabs";
class Fair extends Component {
  render() {
    return (
      <>
        <ElevatedTabs1 />
        <div className="background-inner-page">
          <div className="text-center centered-h1-sz">
            <h3 className="h1-sz text-upper">FAIR PLAY VIOLATION</h3>
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
            <p>
              <b>
                Rising11 considers Fair Play to be a priority at its platform
                and any user violating the Fair Play Terms of Rising11 shall be
                entitled to bear various consequences including Blocking of the
                user Account.
              </b>
            </p>
            
            <h3 className="content-h3">Fair Play Violation</h3>
            <p>
              The people you are referring should all be genuine accounts and
              the user should not use any fake accounts to gain the “Refer &amp;
              Earn” cash bonus amount.
              <br />
              The PAN card of all your referred friends should be verified. In
              an event, the PAN card of more than 5 of your referred friends are
              not verified the user will be considered as violating the Fair
              Play Terms of Rising11.
              <br />
              A user creating more than one account on Rising11 platform will be
              considered as violating the Fair Play Terms of Rising11 as
              Rising11 neither allows nor encourages any user to create more
              than one user account on Rising11.
              <br />
              Withdrawing money by using any unlawful or illegal means or trying
              to withdraw money by illegal manners is considered as Fair Play
              violation at Rising11. <br />
              If a user is found submitting fake copies or someone else’s
              documents while registering with Rising11, the act will be
              considered as violating the Fair Play Terms of Rising11.
              <br />
              In case a user is found to be creating and using multiple accounts
              on a single device amid regular platform audits, then, the case
              shall be considered to violate Fair Play Terms of Rising11 and
              shall attract needed actions. As part of the action, the
              withdrawal request of the user shall be put on hold.
            </p>
            <br />
              
            <h3 className="content-h3">
              Consequences of Violating Fair Play Terms of Rising11
            </h3>
            <p>
              As a part of consequences for violating the terms of Fair Play at
              Rising11, the account of the user found to be violating the Fair
              Play terms will be blocked.
              <br />
              Further, in other scenario the total amount present in the
              Rising11 wallet of the user violating the Fair Play terms of
              Rising11 will be reduced to zero.
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}
export default Fair;
