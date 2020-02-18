/* eslint-disable */
import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import CreateContestCard from './components/CreateContestCard';
import  AppContext from '../App/AppContext';

class CreateContest extends Component {
  render() {
    console.log("hhhhhhhhhhh",this.props)
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <CreateContestCard showLoader={showLoader} hideLoader={hideLoader} queryString={this.props.match.params} />
    )}
  </AppContext.Consumer>
  }
}

export default CreateContest;
