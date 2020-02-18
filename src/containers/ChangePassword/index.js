/* eslint-disable */
import React, {Component} from 'react';
import ChangePasswordCard from './components/ChangePasswordCard';
import  AppContext from '../App/AppContext';

class ChangePassword extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <ChangePasswordCard showLoader={showLoader} hideLoader={hideLoader} />
    )}
  </AppContext.Consumer>
  }
}

export default ChangePassword;
