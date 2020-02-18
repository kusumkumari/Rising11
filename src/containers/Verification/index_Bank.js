/* eslint-disable */
import React, {Component} from 'react';
import VerificationBankDetail from './components/VerificationBankDetail';
import  AppContext from '../App/AppContext';

class VerificationBank extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <VerificationBankDetail showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default VerificationBank;
