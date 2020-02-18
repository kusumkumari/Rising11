/* eslint-disable */
import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import CreateTeamCard from './components/CreateTeamCard';
import  AppContext from '../App/AppContext';

class CreateTeam extends Component {
  render() {
    console.log("thhhhhhhhhhhhhh",this.props.match.params)
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <CreateTeamCard showLoader={showLoader} hideLoader={hideLoader} queryString={this.props.match.params} />
    )}
  </AppContext.Consumer>
  }
}

export default CreateTeam;
