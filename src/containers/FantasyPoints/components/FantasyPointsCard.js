/* eslint-disable */
import React, { Component } from "react";
import "../../../css/style.css";
import "../../../css/responsive.css";
import { Link } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

export default function FantasyPointsCard(props) {
  const [value, setValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const {matchData, playerAction, getActionFields, actionData} =props

  const handleChange = (event, newValue) => {
        console.log("hehehehehhhehehh",newValue)

    setValue(newValue);
  };
  const handleChange1 = panel => (event, isExpanded) => {
    console.log("hehehehehhhehehh",panel, value)
    getActionFields(panel,value+1)
    setExpanded(isExpanded ? panel : false);
  };
  console.log("pppppppppppp",props)
  return (
    <div className="bg">
      <header>
        <div classNameName="logo-box">
          <div className="row">
            <div className="col-md-4 col-xs-3">
              <i
                className="fa fa-angle-left ch p-14"
                onClick={() => history.go(-1)}
              ></i>
            </div>
            <div className="col-md-4 col-xs-6">
              <h5 className="heading">Fantasy Points</h5>
            </div>
            <div className="col-md-4 col-xs-3">
              {/* <a href="login.html" className="login-btn">Login</a */}
            </div>
          </div>
        </div>

        <div className="team">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {matchData.map((data,idx)=>(
            <Tab label={data.match_name} {...a11yProps(data.id-1)} />
            )) }
          </Tabs>
          {matchData.map((data,idx)=>(
          <TabPanel value={value} index={data.id-1}>
            {playerAction.map((datas,idx)=>(
            <ExpansionPanel
              expanded={expanded === "panel"+datas.id}
              onChange={handleChange1("panel"+datas.id)}
            >
              <ExpansionPanelSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>
                  <img
                    src={datas.img}
                    className="img-icon"
                  />
                  {datas.player_action}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <table>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                  {actionData.map((Acdata,idx)=>(
                  <tr>
                    <td>{Acdata.point_type}</td>

                    <td>+{Acdata.finalpoints}</td>
                  </tr>
                  ))}
                 </table>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            )) }
           <div id="li">
              <ul>
                <li>
                  The cricketer you choose to be your fantasy cricket Team’s
                  Captain will receive 2 times the points.
                </li>
                <li>Vice-Captain will receive 1.5 times the points.</li>
                <li>
                  Starting points are assigned to any player on the basis of
                  announcement of his/her inclusion in the team. However,in case
                  the player is unable to start the match after being included
                  in the team sheet,player will not receive any points.
                </li>
                <li>From each side 11players play the game.</li>
                <li>
                  None of the events occurring during the super over , if any
                  ,will be considerd for points to be assigned/applied to a
                  player.
                </li>
                <li>
                  In case of run-outs involving 3 players from the fielding
                  sides,all payers involvedwill be allotted 2 points each.
                </li>
                <li>
                  Any player scoring a century will only receive points for
                  century and no points will be awarded for half-century. Any
                  score above century will be elegible for bonus points only for
                  the century.
                </li>
                <li>
                  Substitute players on the field will not be awarded points for
                  any contributions.
                </li>
                <li>
                  Data is provided by reliable sources and once the points have
                  been marked as completed,i.e. winners have been declared,no
                  further adjustment will be made.
                </li>
                <li>
                  Points awarded live in-game are subject to change as long as
                  the status is ‘waiting for review’or ‘in progress’.
                </li>
              </ul>
            </div>
          </TabPanel>
            )) }
        </div>
      </header>
    </div>
  );
}
