import React, {Component} from 'react';
import Point  from './components/Point';
import  AppContext from '../App/AppContext';
class Pointsystem extends Component {
  render() {
    return<AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <Point showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default Pointsystem;
