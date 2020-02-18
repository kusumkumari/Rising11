import React, {Component} from 'react';
import AboutUs  from './components/About';
import  AppContext from '../App/AppContext';
class About extends Component {
  render() {
    return<AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <AboutUs showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default About;
