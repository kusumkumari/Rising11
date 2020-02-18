/* eslint-disable */
import React, {Component} from 'react';
import ReferalBoardCard from './components/ReferalBoardCard';
import  AppContext from '../App/AppContext';

class ReferalBoard extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <ReferalBoardCard showLoader={showLoader} hideLoader={hideLoader} />
    )}
  </AppContext.Consumer>
  }
}

export default ReferalBoard;
