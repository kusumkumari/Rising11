/* eslint-disable */
import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import EditProfileCard from './components/EditProfileCard';
import  AppContext from '../App/AppContext';

class EditProfile extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <EditProfileCard showLoader={showLoader} hideLoader={hideLoader} />
    )}
  </AppContext.Consumer>
  }
}

export default EditProfile;
