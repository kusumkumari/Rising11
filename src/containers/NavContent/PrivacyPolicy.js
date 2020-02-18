import React, {Component} from 'react';
import PrivacyPolicy  from './components/PrivacyPolicy';
import  AppContext from '../App/AppContext';
class Privacy extends Component {
  render() {
    return<AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <PrivacyPolicy showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default Privacy;
