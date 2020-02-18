/* eslint-disable */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import Layout from '../Layout/index';
import Home from '../Home/index.js';
import Matches from '../Matches/index.js';
import CreateTeam from '../CreateTeam/index.js';
import CreateTeamLeader from '../CreateTeamLeader/index.js';
import JoinedContest from '../JoinedContest/index.js';
import Contest from '../Contest/index.js';
import CreateContest from '../CreateContest/index.js';
import About from '../NavContent/About.js';
import Pointsystem from '../NavContent/Point';
import ReferEarn from '../NavContent/Refer&Earn';
import Fair from '../NavContent/FairPlay';
import Legally from '../NavContent/Legalities';
import FAQ from '../NavContent/FAQs';
import Terms from '../NavContent/TC';
import PrivacyPolicy from '../NavContent/PrivacyPolicy'


import ContestDetail from '../ContestDetail/index.js';
import More from '../More/index.js';
import Account from '../Account/index.js';
import Profile from '../Profile/index.js';
import EditProfile from '../Profile/indexEdit.js';
import MyWallet from '../MyWallet/MyWalletCard.js';
import MyTransaction from '../MyWallet/Transaction.js';
import ReferalBoard from '../ReferalBoard/index.js';
import ChangePassword from '../ChangePassword/index.js';
import ForgetPassword from '../ForgetPassword/index.js';
import ForgetPassCard from '../ForgetPassword/components/ForgetPassCard';
import Registration from '../Registration/index.js';
import Login from '../Login/index.js';
import Logout from '../../Utils/Logout';
import Verification from '../Verification/index.js';
import VerificationPanCard from '../Verification/index_PanCard.js';
import VerificationBank from '../Verification/index_Bank.js';
import MyMatches from '../MyMatches/index.js';
import FantasyPoints from '../FantasyPoints/index.js';
import MyTeam from '../MyTeam/index.js';
import HowToPlay from '../NavContent/HowToPlay';
import NewContest from '../NewContest/index.js';
import RefferalCode from '../RefferalCode/index.js';
import ContestCode from '../ContestCode/index.js';
import UserJoinContest from '../UserSaveJoinContest';
import { isLoggedIn } from '../App/ApiIntegration';

const WrappedRoutes = () => (
  <div>
    <Route exact path="/contest/:matchid/:cid" component={Contest} />
    <Route exact path="/joinedcontest/:matchid/:cid" component={JoinedContest} />
    <Route exact path="/createcontest/:matchid/:cid" component={CreateContest} />
    <Route exact path="/newcontest/:matchid/:cid/:contestName/:contestSize/:prize" component={NewContest} />
    
    <Route exact path="/savejoincontest/:contestName/:matchid/:cid/:prize/:winner/:ratio/:entryfee" component={UserJoinContest} />

    <Route exact path="/myteam/:matchid/:cid/:c" component={MyTeam} />
    <Route exact path="/contestdetail/:matchid/:cid/:id" component={ContestDetail} />
    <Route exact path="/createteam/:matchid/:cid/:team/:type" component={CreateTeam} />
    <Route exact path="/createteamleader/:matchid/:cid/:team" component={CreateTeamLeader} />
    <Route exact path="/account" component={Account} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/mywallet" component={MyWallet} />
   
    <Route exact path="/referalboard" component={ReferalBoard} />
    <Route exact path="/editprofile" component={EditProfile} />
    <Route exact path="/changepass" component={ChangePassword} />
    <Route exact path="/" component={Matches} />
    <Route exact path="/my_matches" component={MyMatches} />
    <Route exact path="/more" component={More} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/varification" component={Verification} />
    <Route exact path="/varification_panCard" component={VerificationPanCard} />
    <Route exact path="/varification_Bank" component={VerificationBank} />
    <Route exact path="/fantasy_points" component={FantasyPoints} />
    <Route exact path="/referalcode" component={RefferalCode}/>
    <Route exact path="/contestcode/:id" component={ContestCode}/>

    <Route exact path="/about" component={About} />
    <Route exact path="/about_pointsystem" component={Pointsystem} />
    <Route exact path="/Refer_Earn" component={ReferEarn} />
    <Route exact path="/Fair_Play_Violation" component={Fair} />
    <Route exact path="/Legally" component={Legally} />
    <Route exact path="/FAQ" component={FAQ} />
    <Route exact path="/Terms" component={Terms} />
    <Route exact path ="/PrivacyPolicy" component={PrivacyPolicy}/>
    <Route exact path="/wallet/Transaction" component={MyTransaction}/>
    <Route exact path="/HowToPlays" component={HowToPlay}/>

    
  </div>
);
const WrappedRoutesLogin = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/forgetpass" component={ForgetPassword} />
    <Route exact path="/forgetpassword/:id" component={ForgetPassCard} />
    <Route exact path="/contest/:matchid/:cid" component={Contest} />
    <Route exact path="/joinedcontest/:matchid/:cid" component={JoinedContest} />
    <Route exact path="/createteam/:matchid/:cid/:team/:type" component={CreateTeam} />
    <Route exact path="/matches" component={Matches} />
    <Route exact path="/createteamleader/:matchid/:cid/:team" component={CreateTeamLeader} />
    <Route exact path="/registration" component={Registration} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/about" component={About} />
    <Route exact path="/about_pointsystem" component={Pointsystem} />
    <Route exact path="/Fair_Play_Violation" component={Fair} />
    <Route exact path="/Legally" component={Legally} />
    <Route exact path="/FAQ" component={FAQ} />
    <Route exact path="/Terms" component={Terms} />
    <Route exact path="/fantasy_points" component={FantasyPoints} />
    <Route exact path ="/PrivacyPolicy" component={PrivacyPolicy}/>
    <Route exact path="/HowToPlays" component={HowToPlay}/>
  
  </div>
);
const Router = () => (

  <Switch>
    <Route
      path="/"
      render={() => {
        const loggedIn = isLoggedIn();
        if (!loggedIn) {
          return <WrappedRoutesLogin />;
        } else {
          return <WrappedRoutes />;
        }
      }
      } />
  </Switch>
);

export default Router;
