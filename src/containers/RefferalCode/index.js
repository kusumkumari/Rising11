/* eslint-disable */
import React, {Component} from 'react';
import RefferalCodeCard from './components/RefferalCodeCard';
import  AppContext from '../App/AppContext';

class RefferalCode extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <RefferalCodeCard showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default RefferalCode;
