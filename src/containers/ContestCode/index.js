/* eslint-disable */
import React, {Component} from 'react';
import ContestCodeCard from './components/ContestCodeCard';
import  AppContext from '../App/AppContext';

class ContestCode extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <ContestCodeCard showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default ContestCode;
