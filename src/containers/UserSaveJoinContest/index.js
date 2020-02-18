/* eslint-disable */
import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import UserJoinContestCard from './components/UserJoinContestCard';
import  AppContext from '../App/AppContext';

class UserJoinContest extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <UserJoinContestCard showLoader={showLoader} hideLoader={hideLoader} queryString={this.props.match.params} />
    )}
  </AppContext.Consumer>
  }
}

export default UserJoinContest;
