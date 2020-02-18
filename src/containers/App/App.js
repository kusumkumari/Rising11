/* eslint-disable */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import Router from './Router';
import AppContext from './AppContext';
import Cookies from 'universal-cookie';
import { getConfigurationAPI } from './ApiIntegration';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      sessionKey:"",
    };
  }


  componentDidMount() {
    window.addEventListener('load', () => {
      setTimeout(() => this.setState({ loaded: true }), 500);
    });
  }

  showLoader = (callback) => {
    this.setState({ loaded: false }, callback);
  }

  hideLoader = (callback) => {
    this.setState({ loaded: true }, callback);
  }
  componentWillMount(){
    const cookies = new Cookies();
    var myCookie = cookies.get('matchCookies');    
    console.log(cookies.get('matchCookies')); // Pacman

    if (myCookie == null) {
      getConfigurationAPI((response) => {
        if(response.response.data['status'] == true){
          this.setState({
            sessionKey:response.response.data.session_key,
          });
          cookies.set('matchCookies',response.response.data.session_key, { path: '/' });
      }
    }); 
    }
    else {
        console.log("Cookie not expired!!")
    }
  
  }
  render() {
    const { loaded } = this.state;
    const contextData = {
      showLoader: this.showLoader,
      hideLoader: this.hideLoader,
    }

    return (
      <AppContext.Provider value={contextData}>
        <BrowserRouter>
          {/* {!loaded
            && (
            <div className="load">
              <div className="load__icon-wrap">
                <svg className="load__icon">
                  <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                </svg>
              </div>
            </div>
            )
          } */}
          <Router />
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}

export default hot(module)(App);
