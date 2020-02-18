import React from 'react';
import '../../../css/style.css';
import '../../../css/responsive.css';
import {
  Link
} from 'react-router-dom';

class ElevatedTabs1 extends React.Component {
    render() {
    return (
        <>
    

<nav className="navbar">
  <div className="container">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar icon-bar-customization"></span>
        <span className="icon-bar icon-bar-customization"></span>
        <span className="icon-bar icon-bar-customization"></span>
      </button>
    
        <Link to="/" className="navbar-brand">
          <Link to="/more">
          <i className='fa fa-angle-left p-17'></i>
          </Link>
          <img src={require("../../../img/logo-home.png")} className="logo-set" style={{ maxWidth: "180px", marginTop: "6px" }} />
      </Link>
      
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav navbar-right links0">
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/fantasy_points">Point System</Link></li>
        <li><Link to="/Refer_Earn">Refer & Earn</Link></li>
        <li><Link to="/Fair_Play_Violation">Fair Play</Link></li>
        <li><Link to="/Legally">Legalities</Link></li>
        <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
       
        <li><Link to="/FAQ">FAQs</Link></li>

     
      </ul>
    </div>
  </div>
</nav> 


</>

    );
    }
}

export default ElevatedTabs1;