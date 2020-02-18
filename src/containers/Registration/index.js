/* eslint-disable */
import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import RegistrationCard from './components/RegistrationCard';
import  AppContext from '../App/AppContext';

class Registration extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <RegistrationCard showLoader={showLoader} hideLoader={hideLoader} />
    )}
  </AppContext.Consumer>
  }
}

export default Registration;
