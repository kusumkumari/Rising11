/* eslint-disable */
import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import ContestDetailCard from './components/ContestDetailCard';
import  AppContext from '../App/AppContext';

class ContestDetail extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <ContestDetailCard showLoader={showLoader} hideLoader={hideLoader} queryString={this.props.match.params} />
    )}
  </AppContext.Consumer>
  }
}

export default ContestDetail;
