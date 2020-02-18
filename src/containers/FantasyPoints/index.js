/* eslint-disable */
import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import FantasyPointsCard from './components/FantasyPointsCard';
import  AppContext from '../App/AppContext';
import {getMatchFormatAPI,getActionFieldsAPI} from '../App/ApiIntegration';
class FantasyPoints extends Component {
  state={
    matchData:[],
    playerType:[],
    playerAction:[],
    actionData:[],
  }
  componentDidMount(){
    getMatchFormatAPI((response) => {
        console.log("ffffffffffffffaaaaaaaaaa", response)
        if (response.response.data.success == true) {
          this.setState({
            matchData: response.response.data.TypesOfMatch,
            playerType: response.response.data.player_type,
            playerAction: response.response.data.player_action,
          });
        }
        else {
          this.setState({ errorMsg: "Unable to load wallet Data" });
        }
      });
    }
    getActionFields=(player_action,match_id)=>{
      getActionFieldsAPI({player_action:player_action,match_id:match_id},(response) => {
        console.log("nnnnnnnnnnnnnnnnnnnnn", response)
        if (response.response.data.status == true) {
          this.setState({
            actionData: response.response.data.data,
          });
        }
        else {
          this.setState({ errorMsg: "Unable to load wallet Data" });
        }
      });
    }
  
  render() {

    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <FantasyPointsCard showLoader={showLoader} hideLoader={hideLoader} getActionFields={this.getActionFields} {...this.state} />
    )}
  </AppContext.Consumer>
  }
}

export default FantasyPoints;
