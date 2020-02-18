/* eslint-disable */
import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import JoinedContestCard from './components/JoinedContestCard';
import  AppContext from '../App/AppContext';

class JoinedContest extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <JoinedContestCard showLoader={showLoader} hideLoader={hideLoader} queryString={this.props.match.params} />
    )}
  </AppContext.Consumer>
  }
}

export default JoinedContest;
