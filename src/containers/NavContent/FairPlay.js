import React, {Component} from 'react';
import Fair  from './components/FairPlay';
import  AppContext from '../App/AppContext';
class FairPlay extends Component {
  render() {
    return<AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <Fair showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default FairPlay;
