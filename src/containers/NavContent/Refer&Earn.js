import React, {Component} from 'react';
import Refer  from './components/Refer&Earn';
import  AppContext from '../App/AppContext';
class ReferEarn extends Component {
  render() {
    return<AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <Refer showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default ReferEarn;
