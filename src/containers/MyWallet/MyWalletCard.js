/* eslint-disable */
import React, {Component} from 'react';
import MyWalletCard from './components/MyWalletCard';
import  AppContext from '../App/AppContext';

class MyWallet extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <MyWalletCard showLoader={showLoader} hideLoader={hideLoader} />
    )}
  </AppContext.Consumer>
  }
}

export default MyWallet;
