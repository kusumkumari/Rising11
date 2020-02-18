import React, {Component} from 'react';
import TC from './components/TC';
import  AppContext from '../App/AppContext';
class Terms extends Component {
  render() {
    return<AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <TC showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default Terms;
