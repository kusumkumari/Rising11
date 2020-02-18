import React, {Component} from 'react';
import Legal  from './components/Legalities';
import  AppContext from '../App/AppContext';
class Legally extends Component {
  render() {
    return<AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <Legal showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default Legally;
