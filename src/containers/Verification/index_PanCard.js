/* eslint-disable */
import React, {Component} from 'react';
import VerificationPanCardDetail from './components/VerificationPanCardDetail';
import  AppContext from '../App/AppContext';

class VerificationPanCard extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <VerificationPanCardDetail showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default VerificationPanCard;
