/* eslint-disable */
import React, {Component} from 'react';
import VerificationCard from './components/VerificationCard';
import  AppContext from '../App/AppContext';

class Verification extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <VerificationCard showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default Verification;
