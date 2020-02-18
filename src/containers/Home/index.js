/* eslint-disable */
import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import HomeCard from './components/HomeCard';
import  AppContext from '../App/AppContext';

class Home extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <HomeCard showLoader={showLoader} hideLoader={hideLoader} />
    )}
  </AppContext.Consumer>
  }
}

export default Home;
