/* eslint-disable */
import React, {Component} from 'react';
import Transaction from './components/Transaction';
import  AppContext from '../App/AppContext';

class MyTransaction extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <Transaction showLoader={showLoader} hideLoader={hideLoader} />
    )}
  </AppContext.Consumer>
  }
}

export default MyTransaction;
