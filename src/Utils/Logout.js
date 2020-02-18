
/* eslint-disable */
import React, { Component } from 'react';
import { logoutAPI, } from '../containers/App/ApiIntegration'

const Logout =() => {
    logoutAPI((response) => {
      window.location.href="/"
    });

  }

export default Logout;
