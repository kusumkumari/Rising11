/* eslint-disable */
import React, {Component} from 'react';
import CreateTeamLeaderCard from './components/CreateTeamLeaderCard';
import  AppContext from '../App/AppContext';

class CreateTeamLeader extends Component {
  render() {
    return <AppContext.Consumer>
    {({ showLoader, hideLoader }) => (
          <CreateTeamLeaderCard showLoader={showLoader} hideLoader={hideLoader} queryString={this.props.match.params}/>
    )}
  </AppContext.Consumer>
  }
}

export default CreateTeamLeader;
