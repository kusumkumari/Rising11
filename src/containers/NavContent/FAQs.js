import React, {Component} from 'react';
import FAQ  from './components/FAQs';
import  AppContext from '../App/AppContext';
class FAQs extends Component {
  render() {
    return<AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <FAQ showLoader={showLoader} hideLoader={hideLoader}  />
    )}
  </AppContext.Consumer>
  }
}

export default FAQs;
