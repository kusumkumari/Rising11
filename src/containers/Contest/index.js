/* eslint-disable */
import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import ContestCard from './components/ContestCard';
import  AppContext from '../App/AppContext';

class Contest extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <ContestCard showLoader={showLoader} hideLoader={hideLoader} queryString={this.props.match.params} />
    )}
  </AppContext.Consumer>
  }
}

export default Contest;
