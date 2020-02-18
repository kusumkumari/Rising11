/* eslint-disable */
import React, {Component} from 'react';
import ForgetPasswordCard from './components/ForgetPasswordCard';
import  AppContext from '../App/AppContext';

class ForgetPassword extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <ForgetPasswordCard showLoader={showLoader} hideLoader={hideLoader} />
    )}
  </AppContext.Consumer>
  }
}

export default ForgetPassword;
