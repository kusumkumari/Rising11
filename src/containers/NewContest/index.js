/* eslint-disable */
import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import NewContestCard from './components/NewContestCard';
import  AppContext from '../App/AppContext';

class NewContest extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <NewContestCard showLoader={showLoader} hideLoader={hideLoader} queryString={this.props.match.params} />
    )}
  </AppContext.Consumer>
  }
}

export default NewContest;
