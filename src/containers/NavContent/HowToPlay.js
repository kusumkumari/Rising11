import React, {Component} from 'react';
import Play  from './components/HowToPlay';
import  AppContext from '../App/AppContext';
class HowToPlay extends Component {
  render() {
    return<AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <Play showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default HowToPlay;
