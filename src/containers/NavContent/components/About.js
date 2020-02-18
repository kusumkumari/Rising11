
import React, { Component } from 'react';
import Footer from '../../Layout/Footer';
import ElevatedTabs1 from './ElevatedTabs'
class AboutUs extends Component {


  render() {

    return (
      <>
      <ElevatedTabs1/>
      <div className="background-inner-page">
      <div className="text-center centered-h1-sz">
        <h3 className="h1-sz text-upper">About Us</h3>
      </div>
    </div>

      <div className="container">
          <div className="Content">
            <div className="clearfix">
              <br/><br/><br/><br/>
            </div>
            <p>
              Rising11 is a most promising &amp; fastest growing Fantasy
              Platform in India, where Sports are not only sports- it’s more
              than a religion for peoples. Where the peoples are come to stadium
              &amp; also watch the matches In-Front-Of TV for entertainment and
              support Their Teams and favourite players as only spectators. But
              in this modern Era where peoples are watching matches only as a
              spectator on the other side Rising 11 offers a very exciting &amp;
              promising game to peoples from all across the India to make their
              dreams come true to play on Rising11 by creating their Teams and
              win real money by join the contests on fantasy platform from real
              time live matches in cricket.
            </p>
            <h5 className="special-att">
            “So now stop to watch only, it’s time to playing on Rising11 and become a<b> Rising Hero</b>
of your own life &amp; world”.
            </h5>
            <h3 className="content-h3">Our Vision</h3>
            <p>Our vision to establish the Rising11 is to give a most promising, superior and Trustable
fantasy platform to user for showing his/her skills &amp; knowledge and live him/her
dreams in real life. And we also want that the every sports lover will enable their
control on their own team &amp; show their skills.
Rising11 wants to make a new world of Fantasy Sports Gaming where every user think
that they are not less than a real life player and they have got the skills that make them
to a <b>RISING HERO</b> of the world.
We want to make a different level of Fantasy gaming to offer the Best Fantasy Services.
To reach the Heights we planned to achieve, we working extraordinary and walking to a
path of <b>“Truth-Trust-Transparency.”</b></p>
          </div>
        </div>
      
      <Footer/>
      
      </>
    );
  }
}
export default AboutUs;
