/* eslint-disable */
import React, {Component} from 'react';
import AccountCard from './components/AccountCard';
import  AppContext from '../App/AppContext';

class Account extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <AccountCard showLoader={showLoader} hideLoader={hideLoader} />
    )}
  </AppContext.Consumer>
  }
}

export default Account;
